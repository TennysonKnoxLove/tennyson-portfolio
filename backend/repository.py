from prisma import Prisma
from fastapi import UploadFile
import os
import uuid
from pathlib import Path

prisma = Prisma()

class UserRepository:
    @staticmethod
    async def get_user_by_id(user_id: str):
        user = await prisma.user.find_unique(where={"id": user_id})
        return user

    @staticmethod
    async def find_or_create_user_by_username(username: str):
        user = await prisma.user.find_unique(where={"username": username})
        if not user:
            print(f"User '{username}' not found, creating new user.")
            user_data = {
                "username": username
            }
            try:
                user = await prisma.user.create(data=user_data)
                print(f"Successfully created user: {user.id if user else None} (username: {user.username if user else None})")
            except Exception as e:
                print(f"Error creating user '{username}': {e}")
                return None
        return user

class ResourceRepository:
    @staticmethod
    async def get_all_resources():
        resources = await prisma.resource.find_many()
        return resources

    @staticmethod
    async def create_resource(resource_data: dict):
        resource = await prisma.resource.create(data=resource_data)
        return resource

    @staticmethod
    async def get_resources_by_user_id(user_id: str):
        resources = await prisma.resource.find_many(where={"resourceOwnerId": user_id})
        return resources

    @staticmethod
    async def delete_resource(resource_id: str):
        try:
            await prisma.resource.delete(where={"id": resource_id})
            return True
        except:
            return False

    @staticmethod
    async def upload_image(file: UploadFile):
        # Create uploaded-images directory if it doesn't exist
        upload_dir = Path("backend/uploaded-images")
        upload_dir.mkdir(exist_ok=True)
        
        # Generate unique filename
        file_extension = os.path.splitext(file.filename)[1] if file.filename else ".jpg"
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = upload_dir / unique_filename
        
        # Save the file
        with open(file_path, "wb") as buffer:
            contents = await file.read()
            buffer.write(contents)
        
        # Return the URL path (relative to backend)
        return {
            "url": f"/uploaded-images/{unique_filename}",
            "filename": unique_filename
        }

class PortfolioRepository:
    @staticmethod
    async def get_portfolio_data():
        return {"projects": []}

class DockerRepository:
    @staticmethod
    async def start_containers():
        return {"message": "Containers started successfully"}

    @staticmethod
    async def stop_containers():
        return {"message": "Containers stopped successfully"}

    @staticmethod
    async def get_container_status():
        return {"status": "All containers are running"}

    # California Project methods
    @staticmethod
    async def california_start_containers():
        return {
            "success": True,
            "message": "California containers started successfully",
            "output": "Creating california-web...\nCreating california-api...\nCreating california-db...\nStarting containers...\nProject California is ready!",
            "containers": [
                {"name": "california-web", "status": "running", "ports": ["3000:3000"], "uptime": "2 minutes"},
                {"name": "california-api", "status": "running", "ports": ["8000:8000"], "uptime": "2 minutes"},
                {"name": "california-db", "status": "running", "ports": ["5432:5432"], "uptime": "2 minutes"}
            ]
        }

    @staticmethod
    async def california_stop_containers():
        return {
            "success": True,
            "message": "California containers stopped successfully",
            "output": "Stopping california-web...\nStopping california-api...\nStopping california-db...\nRemoving containers...",
            "containers": [
                {"name": "california-web", "status": "stopped", "ports": ["3000:3000"]},
                {"name": "california-api", "status": "stopped", "ports": ["8000:8000"]},
                {"name": "california-db", "status": "stopped", "ports": ["5432:5432"]}
            ]
        }

    @staticmethod
    async def california_health_check():
        return {
            "success": True,
            "message": "California application is healthy",
            "output": "Web UI: ✓ Responsive\nAPI: ✓ Connected\nDatabase: ✓ Connected\nApplication: ✓ Ready",
            "containers": []
        }

    @staticmethod
    async def california_get_app_url():
        return {
            "success": True,
            "url": "http://localhost:3000",
            "message": "California application is available",
            "status": "ready",
            "html": """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Montana - Event Management System</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0f172a;
            color: #f1f5f9;
            min-height: 100vh;
        }
        
        .navbar {
            background: #1e293b;
            border-bottom: 1px solid #334155;
            padding: 16px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .nav-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .nav-logo {
            font-size: 20px;
            font-weight: 700;
            color: #3b82f6;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .nav-right {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        
        .nav-icon {
            width: 20px;
            height: 20px;
            cursor: pointer;
            opacity: 0.7;
            transition: all 0.2s;
        }
        
        .nav-icon:hover {
            opacity: 1;
            transform: scale(1.1);
        }
        
        .user-menu {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            padding: 8px 12px;
            border-radius: 8px;
            transition: background 0.2s;
        }
        
        .user-menu:hover {
            background: #334155;
        }
        
        .user-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 32px 24px;
        }
        
        .tabs {
            display: flex;
            background: #1e293b;
            border-radius: 12px;
            padding: 6px;
            margin-bottom: 32px;
            gap: 4px;
        }
        
        .tab {
            flex: 1;
            padding: 12px 20px;
            text-align: center;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            font-weight: 500;
            color: #94a3b8;
        }
        
        .tab.active {
            background: #3b82f6;
            color: white;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }
        
        .tab:hover:not(.active) {
            background: #334155;
            color: #f1f5f9;
        }
        
        .tab-content {
            display: none;
        }
        
        .tab-content.active {
            display: block;
            animation: fadeIn 0.3s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 24px;
            margin-bottom: 32px;
        }
        
        .stat-card {
            background: linear-gradient(135deg, #1e293b, #334155);
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 24px;
            transition: all 0.3s;
        }
        
        .stat-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }
        
        .stat-value {
            font-size: 36px;
            font-weight: bold;
            color: #3b82f6;
            margin-bottom: 8px;
        }
        
        .stat-label {
            color: #94a3b8;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .events-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
            gap: 24px;
        }
        
        .event-card {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 12px;
            overflow: hidden;
            transition: all 0.3s;
        }
        
        .event-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            border-color: #3b82f6;
        }
        
        .event-header {
            padding: 20px;
            border-bottom: 1px solid #334155;
        }
        
        .event-title {
            font-size: 18px;
            font-weight: 600;
            color: #f1f5f9;
            margin-bottom: 8px;
        }
        
        .event-date {
            color: #3b82f6;
            font-size: 14px;
            font-weight: 500;
        }
        
        .event-body {
            padding: 20px;
        }
        
        .event-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 16px;
        }
        
        .event-detail {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        
        .event-detail-label {
            color: #94a3b8;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .event-detail-value {
            color: #f1f5f9;
            font-weight: 500;
        }
        
        .event-revenue {
            color: #22c55e;
            font-weight: 600;
            font-size: 18px;
        }
        
        .event-status {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
        }
        
        .status-confirmed {
            background: rgba(34, 197, 94, 0.2);
            color: #22c55e;
        }
        
        .status-pending {
            background: rgba(245, 158, 11, 0.2);
            color: #f59e0b;
        }
        
        .chart-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 32px;
            margin-bottom: 32px;
        }
        
        .chart-card {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 24px;
        }
        
        .chart-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #f1f5f9;
        }
        
        .settings-section {
            display: grid;
            gap: 24px;
        }
        
        .settings-card {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 24px;
        }
        
        .settings-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 16px;
            color: #f1f5f9;
        }
        
        .settings-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #334155;
        }
        
        .settings-item:last-child {
            border-bottom: none;
        }
        
        .settings-label {
            color: #f1f5f9;
            font-weight: 500;
        }
        
        .settings-description {
            color: #94a3b8;
            font-size: 14px;
        }
        
        .toggle {
            width: 48px;
            height: 24px;
            background: #334155;
            border-radius: 12px;
            position: relative;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .toggle.active {
            background: #3b82f6;
        }
        
        .toggle::after {
            content: '';
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50%;
            position: absolute;
            top: 2px;
            left: 2px;
            transition: transform 0.3s;
        }
        
        .toggle.active::after {
            transform: translateX(24px);
        }
        
        .notification-dot {
            width: 8px;
            height: 8px;
            background: #ef4444;
            border-radius: 50%;
            position: absolute;
            top: -2px;
            right: -2px;
        }
        
        @media (max-width: 768px) {
            .chart-section {
                grid-template-columns: 1fr;
            }
            
            .events-grid {
                grid-template-columns: 1fr;
            }
            
            .tabs {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="nav-left">
            <div class="nav-logo">🎭 Project Montana</div>
        </div>
        <div class="nav-right">
            <div style="position: relative;">
                <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                </svg>
                <div class="notification-dot"></div>
            </div>
            <div class="user-menu">
                <div class="user-avatar">DY</div>
                <span>David Yung</span>
            </div>
        </div>
    </nav>

    <div class="container">
        <div class="tabs">
            <div class="tab active">📅 Events</div>
            <div class="tab">📊 Analytics</div>
            <div class="tab">⚙️ Settings</div>
        </div>

        <!-- Events Tab -->
        <div id="events" class="tab-content active">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">12</div>
                    <div class="stat-label">Events This Month</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">$127K</div>
                    <div class="stat-label">Monthly Revenue</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">3,450</div>
                    <div class="stat-label">Total Attendees</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">97%</div>
                    <div class="stat-label">Success Rate</div>
                </div>
            </div>

            <div class="events-grid">
                <div class="event-card">
                    <div class="event-header">
                        <div class="event-title">Wine Tasting & Jazz Night</div>
                        <div class="event-date">Friday, March 22, 2024 • 7:00 PM</div>
                    </div>
                    <div class="event-body">
                        <div class="event-details">
                            <div class="event-detail">
                                <div class="event-detail-label">Venue</div>
                                <div class="event-detail-value">Rooftop Terrace</div>
                            </div>
                            <div class="event-detail">
                                <div class="event-detail-label">Capacity</div>
                                <div class="event-detail-value">150 guests</div>
                            </div>
                            <div class="event-detail">
                                <div class="event-detail-label">Revenue</div>
                                <div class="event-detail-value event-revenue">$18,500</div>
                            </div>
                            <div class="event-detail">
                                <div class="event-detail-label">Status</div>
                                <div class="event-status status-confirmed">Confirmed</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="event-card">
                    <div class="event-header">
                        <div class="event-title">Corporate Team Building & Bingo</div>
                        <div class="event-date">Wednesday, March 27, 2024 • 2:00 PM</div>
                    </div>
                    <div class="event-body">
                        <div class="event-details">
                            <div class="event-detail">
                                <div class="event-detail-label">Venue</div>
                                <div class="event-detail-value">Grand Ballroom</div>
                            </div>
                            <div class="event-detail">
                                <div class="event-detail-label">Capacity</div>
                                <div class="event-detail-value">200 guests</div>
                            </div>
                            <div class="event-detail">
                                <div class="event-detail-label">Revenue</div>
                                <div class="event-detail-value event-revenue">$24,000</div>
                            </div>
                            <div class="event-detail">
                                <div class="event-detail-label">Status</div>
                                <div class="event-status status-confirmed">Confirmed</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="event-card">
                    <div class="event-header">
                        <div class="event-title">Sustainable Living Workshop</div>
                        <div class="event-date">Saturday, March 30, 2024 • 10:00 AM</div>
                    </div>
                    <div class="event-body">
                        <div class="event-details">
                            <div class="event-detail">
                                <div class="event-detail-label">Venue</div>
                                <div class="event-detail-value">Community Center</div>
                            </div>
                            <div class="event-detail">
                                <div class="event-detail-label">Capacity</div>
                                <div class="event-detail-value">80 guests</div>
                            </div>
                            <div class="event-detail">
                                <div class="event-detail-label">Revenue</div>
                                <div class="event-detail-value event-revenue">$4,800</div>
                            </div>
                            <div class="event-detail">
                                <div class="event-detail-label">Status</div>
                                <div class="event-status status-pending">Pending</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="event-card">
                    <div class="event-header">
                        <div class="event-title">Tech Startup Pitch Night</div>
                        <div class="event-date">Thursday, April 4, 2024 • 6:30 PM</div>
                    </div>
                    <div class="event-body">
                        <div class="event-details">
                            <div class="event-detail">
                                <div class="event-detail-label">Venue</div>
                                <div class="event-detail-value">Innovation Hub</div>
                            </div>
                            <div class="event-detail">
                                <div class="event-detail-label">Capacity</div>
                                <div class="event-detail-value">120 guests</div>
                            </div>
                            <div class="event-detail">
                                <div class="event-detail-label">Revenue</div>
                                <div class="event-detail-value event-revenue">$15,600</div>
                            </div>
                            <div class="event-detail">
                                <div class="event-detail-label">Status</div>
                                <div class="event-status status-confirmed">Confirmed</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="event-card">
                    <div class="event-header">
                        <div class="event-title">Charity Gala Fundraiser</div>
                        <div class="event-date">Saturday, April 6, 2024 • 7:00 PM</div>
                    </div>
                    <div class="event-body">
                        <div class="event-details">
                            <div class="event-detail">
                                <div class="event-detail-label">Venue</div>
                                <div class="event-detail-value">Grand Hotel Ballroom</div>
                            </div>
                            <div class="event-detail">
                                <div class="event-detail-label">Capacity</div>
                                <div class="event-detail-value">300 guests</div>
                            </div>
                            <div class="event-detail">
                                <div class="event-detail-label">Revenue</div>
                                <div class="event-detail-value event-revenue">$45,000</div>
                            </div>
                            <div class="event-detail">
                                <div class="event-detail-label">Status</div>
                                <div class="event-status status-confirmed">Confirmed</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="event-card">
                    <div class="event-header">
                        <div class="event-title">Cooking Masterclass Series</div>
                        <div class="event-date">Sunday, April 7, 2024 • 11:00 AM</div>
                    </div>
                    <div class="event-body">
                        <div class="event-details">
                            <div class="event-detail">
                                <div class="event-detail-label">Venue</div>
                                <div class="event-detail-value">Culinary Institute</div>
                            </div>
                            <div class="event-detail">
                                <div class="event-detail-label">Capacity</div>
                                <div class="event-detail-value">40 guests</div>
                            </div>
                            <div class="event-detail">
                                <div class="event-detail-label">Revenue</div>
                                <div class="event-detail-value event-revenue">$8,400</div>
                            </div>
                            <div class="event-detail">
                                <div class="event-detail-label">Status</div>
                                <div class="event-status status-pending">Pending</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Analytics Tab -->
        <div id="analytics" class="tab-content">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">$2.1M</div>
                    <div class="stat-label">Yearly Revenue</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">1,247</div>
                    <div class="stat-label">Total Events</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">45.6K</div>
                    <div class="stat-label">Total Attendees</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">94%</div>
                    <div class="stat-label">Client Satisfaction</div>
                </div>
            </div>

            <div class="chart-section">
                <div class="chart-card">
                    <div class="chart-title">Revenue by Event Type</div>
                    <div style="height: 200px; display: flex; align-items: center; justify-content: center; color: #94a3b8;">
                        📊 Interactive charts would be rendered here with real data visualization library
                    </div>
                </div>
                
                <div class="chart-card">
                    <div class="chart-title">Monthly Growth Trend</div>
                    <div style="height: 200px; display: flex; align-items: center; justify-content: center; color: #94a3b8;">
                        📈 Time series chart showing month-over-month growth
                    </div>
                </div>
            </div>

            <div class="chart-section">
                <div class="chart-card">
                    <div class="chart-title">Top Performing Venues</div>
                    <div style="padding: 16px 0;">
                        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #334155;">
                            <span>Grand Hotel Ballroom</span>
                            <span style="color: #22c55e; font-weight: 600;">$342K</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #334155;">
                            <span>Innovation Hub</span>
                            <span style="color: #22c55e; font-weight: 600;">$298K</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #334155;">
                            <span>Rooftop Terrace</span>
                            <span style="color: #22c55e; font-weight: 600;">$187K</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 12px 0;">
                            <span>Community Center</span>
                            <span style="color: #22c55e; font-weight: 600;">$156K</span>
                        </div>
                    </div>
                </div>
                
                <div class="chart-card">
                    <div class="chart-title">Customer Demographics</div>
                    <div style="height: 200px; display: flex; align-items: center; justify-content: center; color: #94a3b8;">
                        👥 Demographics breakdown and customer segments
                    </div>
                </div>
            </div>
        </div>

        <!-- Settings Tab -->
        <div id="settings" class="tab-content">
            <div class="settings-section">
                <div class="settings-card">
                    <div class="settings-title">Notification Preferences</div>
                    <div class="settings-item">
                        <div>
                            <div class="settings-label">Email Notifications</div>
                            <div class="settings-description">Receive email alerts for new bookings</div>
                        </div>
                        <div class="toggle active" onclick="toggleSetting(this)"></div>
                    </div>
                    <div class="settings-item">
                        <div>
                            <div class="settings-label">SMS Alerts</div>
                            <div class="settings-description">Get text messages for urgent updates</div>
                        </div>
                        <div class="toggle" onclick="toggleSetting(this)"></div>
                    </div>
                    <div class="settings-item">
                        <div>
                            <div class="settings-label">Push Notifications</div>
                            <div class="settings-description">Browser notifications for real-time updates</div>
                        </div>
                        <div class="toggle active" onclick="toggleSetting(this)"></div>
                    </div>
                </div>

                <div class="settings-card">
                    <div class="settings-title">Event Management</div>
                    <div class="settings-item">
                        <div>
                            <div class="settings-label">Auto-confirm Bookings</div>
                            <div class="settings-description">Automatically confirm recurring client bookings</div>
                        </div>
                        <div class="toggle active" onclick="toggleSetting(this)"></div>
                    </div>
                    <div class="settings-item">
                        <div>
                            <div class="settings-label">Calendar Integration</div>
                            <div class="settings-description">Sync with Google Calendar and Outlook</div>
                        </div>
                        <div class="toggle active" onclick="toggleSetting(this)"></div>
                    </div>
                    <div class="settings-item">
                        <div>
                            <div class="settings-label">Invoice Auto-generation</div>
                            <div class="settings-description">Generate invoices automatically after events</div>
                        </div>
                        <div class="toggle" onclick="toggleSetting(this)"></div>
                    </div>
                </div>

                <div class="settings-card">
                    <div class="settings-title">System Preferences</div>
                    <div class="settings-item">
                        <div>
                            <div class="settings-label">Dark Mode</div>
                            <div class="settings-description">Use dark theme for better night viewing</div>
                        </div>
                        <div class="toggle active" onclick="toggleSetting(this)"></div>
                    </div>
                    <div class="settings-item">
                        <div>
                            <div class="settings-label">Advanced Analytics</div>
                            <div class="settings-description">Enable detailed reporting and insights</div>
                        </div>
                        <div class="toggle active" onclick="toggleSetting(this)"></div>
                    </div>
                    <div class="settings-item">
                        <div>
                            <div class="settings-label">Data Export</div>
                            <div class="settings-description">Allow CSV and PDF export of all data</div>
                        </div>
                        <div class="toggle" onclick="toggleSetting(this)"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function switchTab(targetTab, clickedElement) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Remove active class from all tabs
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show target tab content
            document.getElementById(targetTab).classList.add('active');
            
            // Add active class to clicked tab
            clickedElement.classList.add('active');
        }
        
        function toggleSetting(toggle) {
            toggle.classList.toggle('active');
        }
        
        // Initialize tabs when DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            const tabs = document.querySelectorAll('.tab');
            
            tabs.forEach(function(tab, index) {
                tab.addEventListener('click', function() {
                    let targetTab;
                    
                    // Determine which tab to show based on tab index
                    if (index === 0) {
                        targetTab = 'events';
                    } else if (index === 1) {
                        targetTab = 'analytics';
                    } else if (index === 2) {
                        targetTab = 'settings';
                    }
                    
                    switchTab(targetTab, this);
                });
            });
        });
    </script>
</body>
</html>
            """
        }
