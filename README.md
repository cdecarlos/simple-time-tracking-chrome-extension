# Simple Time Tracking - Chrome Extension

A simple and effective Chrome extension to track time spent on different tasks.

## Features

- ⏱️ Timer with start and stop functions
- 📊 Daily activity history
- 💾 Data persistence between sessions
- 🎨 Clean and easy-to-use interface

### Usage

1. Click on the extension icon in the toolbar
2. Type the task you're working on and click "Start" to begin the timer
3. Use "Stop" to finish and save to history
4. Type the new task you're working on and click "Start" to begin the timer for the new task without having to stop the previous one

## Functionality

### Timer
- Displays time in HH:MM:SS format
- Maintains state between browser sessions
- Start and stop functions

### Task Tracking
- Text field to describe the current task
- Display of the active task
- Automatic state saving

### History
- Shows all sessions from the current day
- Each history record includes start time, end time, duration, and task description

### Permissions

- `storage`: To save timer and history data
- `activeTab`: For basic access to the current tab

## Installation

### For development:

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click on "Load unpacked extension"
4. Select the `simple-time-tracking-chrome-extension` folder

### For distribution:

TODO: Add instructions for publishing on Chrome Web Store

## Development

### File Structure

```
simple-time-tracking/
├── background.js         # Service worker
├── content.js            # Content script
├── LICENSE               # License file
├── manifest.json         # Extension configuration
├── popup.css             # Popup styles
├── popup.html            # Popup interface
├── popup.js              # Popup logic
├── README.md
├── icons/                # Extension icons
  ├── icon16.png
  ├── icon32.png
  ├── icon48.png
  └── icon128.png
```

### Main files:

- **manifest.json**: Extension configuration and permissions
- **popup.html/css/js**: Popup user interface
- **background.js**: Service worker for background functions
- **content.js**: Script that runs on web pages

### Customization:

1. Modify `popup.css` to change the appearance
2. Adjust `popup.js` to add new functionalities
3. Update `manifest.json` for new permissions or configurations

## TODO

- [ ] Add instructions for publishing on Chrome Web Store
- [ ] Add custom icons
- [ ] Implement data export
- [ ] Add task categories
- [ ] Create weekly/monthly statistics
- [ ] Implement notifications
- [ ] Add keyboard shortcuts

## Contribution

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is under the GNU GPLv3 License - see the [LICENSE](LICENSE) file for more details.
