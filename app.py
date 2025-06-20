import os
from flask import Flask, render_template, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from datetime import datetime
import json

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
app.config['ALLOWED_EXTENSIONS'] = {'gcode', 'gco', 'g'}

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# In-memory storage for demonstration (replace with a database in production)
device_config = {
    'bluetooth': {},
    'wifi': {}
}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/bluetooth')
def bluetooth_page():
    return render_template('bluetooth.html')

@app.route('/wifi')
def wifi_page():
    return render_template('wifi.html')

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # In a real app, you'd store this in a database
        file_info = {
            'filename': filename,
            'uploaded_at': datetime.now().isoformat(),
            'size': os.path.getsize(filepath)
        }
        
        return jsonify(file_info), 200
    
    return jsonify({'error': 'File type not allowed'}), 400

@app.route('/api/history', methods=['GET'])
def get_history():
    # In a real app, fetch from database
    files = []
    try:
        for filename in os.listdir(app.config['UPLOAD_FOLDER']):
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            if os.path.isfile(filepath):
                files.append({
                    'filename': filename,
                    'uploaded_at': datetime.fromtimestamp(os.path.getmtime(filepath)).isoformat(),
                    'size': os.path.getsize(filepath)
                })
    except Exception as e:
        print(f"Error reading uploads: {e}")
    
    return jsonify(files)

@app.route('/api/device/config', methods=['GET', 'POST'])
def device_configuration():
    if request.method == 'POST':
        config_type = request.json.get('type')
        config_data = request.json.get('data', {})
        
        if config_type in ['bluetooth', 'wifi']:
            device_config[config_type] = config_data
            return jsonify({'status': 'success'})
        return jsonify({'error': 'Invalid config type'}), 400
    
    return jsonify(device_config)

if __name__ == '__main__':
    app.run(debug=True)
