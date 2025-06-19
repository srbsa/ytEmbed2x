<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# YouTube 2x Speed Chrome Extension - Copilot Instructions

This is a Chrome extension project that automatically sets YouTube video playback speeds to 2x (or custom speeds) for all YouTube videos including embedded content.

## Project Context

- **Technology**: Chrome Extension (Manifest V3)
- **Target**: YouTube videos on youtube.com and embedded YouTube content on other websites
- **Core Feature**: Automatic playback speed control
- **Architecture**: Content scripts + Background service worker + Popup interface

## Key Technical Details

- Use Manifest V3 format for Chrome extensions
- Content scripts run on all frames (`all_frames: true`) to catch embedded videos
- MutationObserver pattern for detecting dynamically loaded videos
- Chrome storage API for persisting user preferences
- Cross-origin considerations for embedded iframes

## Code Style Guidelines

- Use modern JavaScript (ES6+)
- Prefer `const`/`let` over `var`
- Use arrow functions where appropriate
- Include error handling with try-catch blocks
- Add console logging for debugging
- Use meaningful variable and function names

## Extension Best Practices

- Minimize permissions requested
- Handle YouTube's single-page app navigation
- Support both direct YouTube visits and embedded videos
- Provide user controls via popup interface
- Store settings in chrome.storage.sync
- Use event-driven architecture

## Common Patterns

- Video detection: `document.querySelectorAll('video')`
- Speed setting: `video.playbackRate = speed`
- YouTube player API: `player.setPlaybackRate(speed)`
- Storage operations: `chrome.storage.sync.get/set`
- Message passing: `chrome.runtime.sendMessage/onMessage`

When suggesting code changes, consider:
- Browser compatibility (Chrome/Chromium)
- YouTube's dynamic content loading
- Performance impact of observers and intervals
- User experience in popup interface
- Error handling for cross-origin restrictions
