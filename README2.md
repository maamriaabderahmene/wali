# Eco-Fab V.1 - 3D Printer Control Interface

## Project Overview
Eco-Fab V.1 is a web-based control interface for 3D printers, providing a user-friendly dashboard for managing print jobs, device configurations, and network settings. The application offers a modern, responsive interface for both desktop and mobile devices.

## Project Structure

```
walic/
│
├── .gitignore
├── README.md
├── app.py                 # Main Flask application
├── package.json           # Node.js dependencies (if using Node server)
├── requirements.txt       # Python dependencies
├── server.js              # Node.js server (alternative to app.py)
├── simple_server.py       # Simple Python server
│
├── public/                # Frontend static files
│   ├── base.html           # Base template
│   ├── bluetooth.html      # Bluetooth configuration page
│   ├── index.html          # Main dashboard
│   ├── wifi.html           # WiFi configuration page
│   └── static/
│       ├── css/
│       │   └── style.css   # Main stylesheet
│       └── js/
│           └── main.js    # Frontend JavaScript
│
├── templates/            # Flask templates
│   └── index.html         # Main template
│
└── uploads/              # Directory for uploaded G-code files
```

## Technologies Used

### Backend
- **Python 3.12** - Core programming language
- **Flask 2.3.3** - Web framework
- **Werkzeug** - WSGI utility library
- **python-dotenv** - Environment variable management

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with custom responsive design
- **JavaScript (ES6+)** - Frontend interactivity
- **Font Awesome 6** - Icons
- **Google Fonts** - Typography

### Development Tools
- **Git** - Version control
- **pip** - Python package management
- **npm** - Node package management (if using Node server)

## Key Features

### 1. File Management
- **G-code File Upload**: Supports drag-and-drop and file browser uploads
- **File Validation**: Validates file types (.gcode, .gco, .g)
- **Upload History**: Tracks previously uploaded files with metadata
- **Progress Tracking**: Real-time upload progress indication

### 2. Device Configuration
- **WiFi Settings**: Configure and manage WiFi connections
- **Bluetooth Pairing**: Interface for Bluetooth device management
- **In-memory Configuration**: Temporary storage for device settings

### 3. User Interface
- **Responsive Design**: Works on desktop and mobile devices
- **Modern Dashboard**: Clean, intuitive interface
- **Real-time Feedback**: Status updates and notifications
- **Drag-and-Drop**: Intuitive file handling

## API Endpoints

### File Operations
- `POST /api/upload` - Upload a new G-code file
- `GET /api/history` - Get upload history

### Device Configuration
- `GET|POST /api/device/config` - Get or update device configuration

### Web Pages
- `GET /` - Main dashboard
- `GET /bluetooth` - Bluetooth configuration
- `GET /wifi` - WiFi configuration

## Setup and Installation

### Prerequisites
- Python 3.8+
- pip (Python package manager)
- Node.js and npm (if using Node server)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wali
   ```

2. **Set up Python environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python app.py
   ```
   The application will be available at `http://localhost:5000`

## Configuration

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
FLASK_APP=app.py
FLASK_ENV=development
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216  # 16MB
```

### File Uploads
- Maximum file size: 16MB
- Allowed extensions: .gcode, .gco, .g
- Uploads are stored in the `uploads/` directory

## Security Considerations
- **File Uploads**: Always validate file types
- **Sensitive Data**: Store credentials in environment variables
- **Production Use**: Consider adding authentication and using a production WSGI server

## Future Enhancements
1. User authentication and authorization
2. Database integration for persistent storage
3. Real-time print job monitoring
4. Mobile app integration
5. Advanced printer controls and telemetry

## License
[Specify your license here]

## Contact
[Your contact information]
