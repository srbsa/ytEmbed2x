# YouTube 2x Speed Chrome Extension

A Chrome extension that automatically sets YouTube video playback speed to 2x (or any custom speed) for all YouTube videos, including embedded content on other websites.

## Features

- 🚀 **Automatic Speed Control**: Automatically sets video speed when videos load
- 🎯 **Works Everywhere**: Supports YouTube.com and embedded YouTube videos on any website
- ⚙️ **Customizable Speed**: Choose any speed from 0.25x to 4x
- 🔄 **Real-time Updates**: Changes apply immediately to existing videos
- 💾 **Persistent Settings**: Your preferences are saved across browser sessions
- 🎮 **Easy Toggle**: Quick enable/disable via popup interface

## Installation

### Install from Chrome Web Store (Recommended)
*Coming soon - extension will be published to Chrome Web Store*

### Manual Installation (Developer Mode)

1. **Download or Clone** this repository to your local machine
2. **Open Chrome Extensions**:
   - Go to `chrome://extensions/`
   - Or click Chrome menu → More Tools → Extensions
3. **Enable Developer Mode**:
   - Toggle the "Developer mode" switch in the top right
4. **Load the Extension**:
   - Click "Load unpacked"
   - Select the folder containing the extension files
5. **Pin the Extension** (Optional):
   - Click the puzzle piece icon in Chrome toolbar
   - Click the pin icon next to "YouTube 2x Speed"

## Usage

### Basic Usage
- The extension works automatically once installed
- All YouTube videos will play at 2x speed by default
- Works on YouTube.com and embedded videos on other sites

### Customization
1. **Open Extension Popup**:
   - Click the extension icon in your Chrome toolbar
2. **Adjust Settings**:
   - Toggle the extension on/off
   - Change playback speed (0.25x to 4x)
   - Use preset buttons or enter custom values
3. **Apply Changes**:
   - Settings are saved automatically
   - Changes apply to current and future videos

### Keyboard Shortcuts
- Settings changes take effect immediately
- Reload YouTube pages for best results with embedded content

## How It Works

The extension uses several techniques to ensure reliable speed control:

1. **Content Script Injection**: Runs on all pages to detect YouTube videos
2. **MutationObserver**: Monitors page changes to catch dynamically loaded videos
3. **Event Listeners**: Responds to video loading events
4. **Periodic Checks**: Regularly scans for new videos on YouTube's single-page app
5. **Cross-Frame Support**: Works with embedded iframes using `all_frames: true`

## Technical Details

### Files Structure
- `manifest.json` - Extension configuration and permissions
- `content.js` - Main script that controls video playback speed
- `background.js` - Service worker for extension management
- `popup.html` - Extension popup interface
- `popup.js` - Popup functionality and settings management

### Permissions Required
- `activeTab` - Access current tab for video control
- `storage` - Save user preferences
- `host_permissions` - Access YouTube and YouTube NoCache domains

### Browser Compatibility
- Chrome (Manifest V3)
- Chromium-based browsers (Edge, Brave, etc.)

## Troubleshooting

### Videos Not Speeding Up
1. **Refresh the page** - Some embedded videos need a page reload
2. **Check extension is enabled** - Look for the icon in your toolbar
3. **Verify permissions** - Make sure the extension has access to the site
4. **Try different speed** - Some videos have speed limitations

### Extension Not Working
1. **Reload the extension**:
   - Go to `chrome://extensions/`
   - Click the reload icon on the YouTube 2x Speed extension
2. **Check for errors**:
   - Right-click extension icon → Inspect popup
   - Look for console errors
3. **Reinstall if needed**:
   - Remove and reinstall the extension

### Embedded Videos
- The extension works with most embedded YouTube videos
- Some sites may block the extension due to security policies
- Try refreshing the page if embedded videos don't speed up initially

## Development

### Setup Development Environment
```bash
# Clone the repository
git clone <repository-url>
cd youtube-2x-speed

# Load in Chrome
# 1. Go to chrome://extensions/
# 2. Enable Developer mode
# 3. Click "Load unpacked"
# 4. Select this folder
```

### Making Changes
1. Edit the source files
2. Go to `chrome://extensions/`
3. Click the reload button on the extension
4. Test your changes

### File Descriptions
- **manifest.json**: Extension metadata and permissions
- **content.js**: Main logic for detecting and controlling videos
- **background.js**: Background service worker
- **popup.html/js**: User interface for settings

## Privacy

This extension:
- ✅ Only accesses YouTube domains and pages you visit
- ✅ Stores settings locally in your browser
- ✅ Does not collect or transmit personal data
- ✅ Does not track your browsing habits
- ✅ Open source - you can review all code

## Contributing

Contributions are welcome! Please feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter issues or have questions:
1. Check the troubleshooting section above
2. Look for existing issues in the project repository
3. Create a new issue with detailed information about the problem

## Changelog

### Version 1.0
- Initial release
- Automatic 2x speed for YouTube videos
- Customizable playback speed
- Support for embedded videos
- Popup interface for settings
- Persistent storage of preferences
