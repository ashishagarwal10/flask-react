from flask import Flask
from flask_cors import CORS
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    CORS(app, resources={
        r"/*": {
            "origins": ["http://localhost:3000"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })
    
    # Register blueprints
    from app.api import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api')
    
    @app.route('/')
    def index():
        return {
            'message': 'Task Management API',
            'version': '1.0',
            'endpoints': {
                'tasks': '/api/tasks',
                'task_detail': '/api/tasks/<id>',
                'task_comments': '/api/tasks/<task_id>/comments',
                'comments': '/api/comments/<id>',
                'health': '/health'
            }
        }

    @app.route('/health')
    def health_check():
        return {'status': 'healthy'}
    
    return app