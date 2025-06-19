// Popup script for YouTube 2x Speed extension

document.addEventListener('DOMContentLoaded', function() {
    const enableToggle = document.getElementById('enableToggle');
    const speedInput = document.getElementById('speedInput');
    const speedButtons = document.querySelectorAll('.speed-btn');
    const status = document.getElementById('status');
    
    // Load current settings
    chrome.storage.sync.get(['enabled', 'speed'], function(result) {
        enableToggle.checked = result.enabled !== false;
        const speed = result.speed || 2.0;
        speedInput.value = speed;
        updateSpeedButtons(speed);
    });
    
    // Handle enable/disable toggle
    enableToggle.addEventListener('change', function() {
        const enabled = enableToggle.checked;
        chrome.storage.sync.set({ enabled: enabled }, function() {
            showStatus(enabled ? 'Extension enabled' : 'Extension disabled', 'success');
        });
    });
    
    // Handle speed input changes
    speedInput.addEventListener('input', function() {
        let speed = parseFloat(speedInput.value);
        
        // Validate speed
        if (isNaN(speed) || speed < 0.25) {
            speed = 0.25;
            speedInput.value = speed;
        } else if (speed > 4) {
            speed = 4;
            speedInput.value = speed;
        }
        
        // Save to storage
        chrome.storage.sync.set({ speed: speed }, function() {
            updateSpeedButtons(speed);
            showStatus(`Speed set to ${speed}x`, 'success');
        });
    });
    
    // Handle speed button clicks
    speedButtons.forEach(button => {
        button.addEventListener('click', function() {
            const speed = parseFloat(button.dataset.speed);
            speedInput.value = speed;
            
            chrome.storage.sync.set({ speed: speed }, function() {
                updateSpeedButtons(speed);
                showStatus(`Speed set to ${speed}x`, 'success');
            });
        });
    });
    
    // Update active speed button
    function updateSpeedButtons(currentSpeed) {
        speedButtons.forEach(button => {
            const buttonSpeed = parseFloat(button.dataset.speed);
            if (Math.abs(buttonSpeed - currentSpeed) < 0.01) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    // Show status message
    function showStatus(message, type) {
        status.textContent = message;
        status.className = `status ${type}`;
        status.style.display = 'block';
        
        // Hide after 3 seconds
        setTimeout(() => {
            status.style.display = 'none';
        }, 3000);
    }
    
    // Handle keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target === speedInput) {
            speedInput.blur(); // Trigger input event
        }
    });
});
