// Background script for YouTube 2x Speed extension

chrome.runtime.onInstalled.addListener(() => {
    console.log('YouTube 2x Speed extension installed');
    
    // Set default settings
    chrome.storage.sync.set({
        enabled: true,
        speed: 2.0
    });
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
    // This will open the popup, handled by manifest.json
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getSettings') {
        chrome.storage.sync.get(['enabled', 'speed'], (result) => {
            sendResponse({
                enabled: result.enabled !== false,
                speed: result.speed || 2.0
            });
        });
        return true; // Keep message channel open for async response
    }
    
    if (request.action === 'updateSettings') {
        chrome.storage.sync.set(request.settings, () => {
            sendResponse({ success: true });
        });
        return true;
    }
});

// Handle tab updates to inject content script if needed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        const isYouTube = tab.url.includes('youtube.com') || tab.url.includes('youtube-nocookie.com');
        if (isYouTube) {
            // Content script should already be injected via manifest
            // This is just for logging
            console.log('YouTube page loaded:', tab.url);
        }
    }
});
