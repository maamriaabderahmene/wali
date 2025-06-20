# 3D Printer Control Panel

A web-based control panel for managing 3D printer connections and G-code file uploads.

## Features

- **File Management**: Upload and manage G-code files
- **Bluetooth Configuration**: Connect to 3D printers via Bluetooth
- **WiFi Configuration**: Connect to 3D printers via WiFi
- **Responsive Design**: Works on both desktop and mobile devices
- **Modern UI**: Clean and intuitive user interface

## Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

## Installation

1. Clone the repository or download the source code
2. Navigate to the project directory
3. Install the required Python packages:

```bash
pip install -r requirements.txt
```

## Running the Application

1. Start the Flask development server:

```bash
python app.py
```

2. Open your web browser and navigate to:

```
http://localhost:5000
```

## Project Structure

```
3d-printer-control/
├── app.py                # Main Flask application
├── requirements.txt       # Python dependencies
├── uploads/              # Directory for uploaded G-code files
├── static/               # Static files (CSS, JS, images)
│   ├── css/
│   │   └── style.css    # Main stylesheet
│   └── js/
│       └── main.js     # Main JavaScript file
└── templates/            # HTML templates
    ├── base.html         # Base template
    ├── index.html        # Home page
    ├── bluetooth.html    # Bluetooth configuration page
    └── wifi.html         # WiFi configuration page
```

## Usage

### Uploading G-code Files

1. On the home page, click "Select File" or drag and drop a G-code file into the upload area
2. The file will be uploaded and appear in the upload history

### Connecting via Bluetooth

1. Click on "Bluetooth Connecting" in the sidebar
2. Click "Scan for Devices" to find nearby Bluetooth devices
3. Select your 3D printer from the list
4. Click "Save Configuration" to save the connection settings

### Connecting via WiFi

1. Click on "WiFi Connecting" in the sidebar
2. Click "Scan Networks" to find available WiFi networks
3. Select your network and enter the password if required
4. Click "Save Configuration" to save the connection settings

## Customization

You can customize the application by modifying the following files:

- `static/css/style.css` - For styling changes
- `templates/*.html` - For HTML structure changes
- `static/js/main.js` - For JavaScript behavior changes

## License

This project is open source and available under the [MIT License](LICENSE).
