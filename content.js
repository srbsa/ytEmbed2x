// YouTube 2x Speed Content Script
// This script runs on all pages to detect and speed up YouTube videos

(function() {
    'use strict';
    
    let isEnabled = true;
    let targetSpeed = 2.0;
    
    // Load settings from storage
    chrome.storage.sync.get(['enabled', 'speed'], function(result) {
        isEnabled = result.enabled !== false; // Default to true
        targetSpeed = result.speed || 2.0;
    });
    
    // Listen for storage changes
    chrome.storage.onChanged.addListener(function(changes) {
        if (changes.enabled) {
            isEnabled = changes.enabled.newValue;
        }
        if (changes.speed) {
            targetSpeed = changes.speed.newValue;
        }
        
        // Apply new settings to existing videos
        if (isEnabled) {
            setSpeedForAllVideos();
        }
    });
    
    function setVideoSpeed(video) {
        if (!isEnabled || !video) return;
        
        try {
            // Set playback rate
            video.playbackRate = targetSpeed;
            
            // For YouTube specifically, also try to set the speed through their internal API
            if (window.location.hostname.includes('youtube.com')) {
                // Wait for YouTube player to be ready
                setTimeout(() => {
                    try {
                        // Try to access YouTube's internal player
                        const player = document.querySelector('#movie_player');
                        if (player && player.setPlaybackRate) {
                            player.setPlaybackRate(targetSpeed);
                        }
                    } catch (e) {
                        // Silently fail if YouTube's internal API is not accessible
                    }
                }, 100);
            }
            
            console.log(`YouTube 2x Speed: Set video speed to ${targetSpeed}x`);
        } catch (error) {
            console.error('YouTube 2x Speed: Error setting video speed:', error);
        }
    }
    
    function setSpeedForAllVideos() {
        const videos = document.querySelectorAll('video');
        videos.forEach(setVideoSpeed);
    }
    
    // Observer to detect new videos being added to the page
    const observer = new MutationObserver(function(mutations) {
        if (!isEnabled) return;
        
        try {
            mutations.forEach(function(mutation) {
                // Handle added nodes
                if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node && node.nodeType === Node.ELEMENT_NODE) {
                            // Check if the added node is a video or contains videos
                            if (node.tagName === 'VIDEO') {
                                setVideoSpeed(node);
                            } else if (node.querySelectorAll) {
                                try {
                                    const videos = node.querySelectorAll('video');
                                    if (videos.length > 0) {
                                        videos.forEach(setVideoSpeed);
                                    }
                                } catch (e) {
                                    // Silently handle querySelectorAll errors
                                }
                            }
                        }
                    });
                }
                
                // Handle attribute changes that might indicate video loading
                if (mutation.type === 'attributes' && 
                    mutation.target && 
                    mutation.target.nodeType === Node.ELEMENT_NODE && 
                    mutation.target.tagName === 'VIDEO') {
                    setVideoSpeed(mutation.target);
                }
            });
        } catch (error) {
            console.error('YouTube 2x Speed: Error in mutation observer:', error);
        }
    });
    
    // Start observing (wait for body to be available)
    function startObserver() {
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['src', 'data-src']
            });
        } else {
            // If body is not ready, wait and try again
            setTimeout(startObserver, 100);
        }
    }
    
    startObserver();
    
    // Handle videos that are already on the page
    function initializeExistingVideos() {
        if (isEnabled && document.body) {
            setSpeedForAllVideos();
        }
    }
    
    // Initialize when DOM is ready
    function initialize() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeExistingVideos);
        } else {
            initializeExistingVideos();
        }
    }
    
    // Start initialization
    initialize();
    
    // Also check periodically for YouTube's dynamic loading
    setInterval(() => {
        if (isEnabled && window.location.hostname.includes('youtube.com')) {
            setSpeedForAllVideos();
        }
    }, 2000);
    
    // Handle YouTube's single-page app navigation
    function setupNavigationHandler() {
        if (!document.body) return;
        
        let lastUrl = location.href;
        const navigationObserver = new MutationObserver(() => {
            const url = location.href;
            if (url !== lastUrl) {
                lastUrl = url;
                // YouTube navigation detected, re-initialize after a short delay
                setTimeout(() => {
                    if (isEnabled) {
                        initializeExistingVideos();
                    }
                }, 1000);
            }
        });
        
        navigationObserver.observe(document.body, { 
            subtree: true, 
            childList: true 
        });
    }
    
    // Setup navigation handler when body is ready
    if (document.body) {
        setupNavigationHandler();
    } else {
        document.addEventListener('DOMContentLoaded', setupNavigationHandler);
    }
    
    // Handle video events
    document.addEventListener('loadstart', function(e) {
        if (e.target.tagName === 'VIDEO' && isEnabled) {
            setTimeout(() => setVideoSpeed(e.target), 100);
        }
    }, true);
    
    document.addEventListener('canplay', function(e) {
        if (e.target.tagName === 'VIDEO' && isEnabled) {
            setVideoSpeed(e.target);
        }
    }, true);
    
    // Handle embedded iframes (like embedded YouTube videos)
    function handleIframes() {
        const iframes = document.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="youtube-nocookie.com"]');
        iframes.forEach(iframe => {
            try {
                // For embedded YouTube videos, we'll rely on the content script running in the iframe
                // The manifest includes all_frames: true to ensure this happens
            } catch (e) {
                // Cross-origin restrictions prevent direct access
            }
        });
    }
    
    // Check for iframes periodically
    setInterval(handleIframes, 3000);
    
})();
