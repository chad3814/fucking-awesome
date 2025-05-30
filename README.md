# Browser Extension Template

This project is a template for creating browser extensions compatible with both Chrome and Firefox. It includes the necessary files and structure to get started quickly.

## Project Structure

```text
browser-extension-template
├── src
│   ├── background.js       # Background script for managing events and tasks
│   ├── content.js          # Content script for interacting with web pages
│   └── popup
│       ├── popup.html      # HTML structure for the popup interface
│       └── popup.js        # JavaScript for handling popup interactions
├── manifest.json           # Configuration file for the browser extension
├── package.json            # npm configuration file for dependencies and scripts
└── README.md               # Documentation for the project
```

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/chad3814/fucking-awesome.git
   cd fucking-awesome
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Load the extension in your browser:**
   - For Chrome:
     - Open Chrome and navigate to `chrome://extensions/`
     - Enable "Developer mode"
     - Click "Load unpacked" and select the `fucking-awesome` directory
   - For Firefox:
     - Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
     - Click "Load Temporary Add-on" and select the `manifest.json` file

## Usage

- The background script (`src/background.js`) manages events and long-running tasks.
- The content script (`src/content.js`) interacts with web pages and can manipulate the DOM.
- The popup interface is defined in `src/popup/popup.html` and its behavior is controlled by `src/popup/popup.js`.

## Contributing

Feel free to submit issues or pull requests to improve this template. 

## License

This project is licensed under the MIT License.