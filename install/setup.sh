#!/bin/bash
# Setup script for WebPanel

set -e

# Update and install dependencies
apt update && apt upgrade -y
apt install -y nginx ufw git curl nodejs npm certbot python3-certbot-nginx

# Set up UFW firewall
bash ./install/ufw-setup.sh

# Enable and start NGINX
systemctl enable nginx
systemctl start nginx

echo "WebPanel setup complete. Configure NGINX and start backend/frontend next." 