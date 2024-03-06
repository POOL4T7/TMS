#!/bin/bash

projectName="tms-server"
webProjectApp="tms-web-app"
nginxPortForServer=6789
nginxPortForWeb=8000
serverHost=172.16.229.179
applicationPort=8080
dbUrl="mongodb://gulshan:1alyxstar@localhost:27017/social?authSource=admin"
enviroment="production"

serverConfigFile="/etc/nginx/conf.d/$projectName.conf"
webConfigFile="/etc/nginx/conf.d/$webProjectApp.conf"

log() {
    echo "⚡️ $1"
}

error_exit() {
    log "Error: $1"
    exit 1
}

log "Welcome to the TMS setup process!"

log "Scanning for available package in OS..."
apt update >/dev/null || error_exit "Failed to update packages."
log "✅ Scan completed successfully!"

# Uncomment if needed in the future
# log "Upgrading packages to the latest versions..."
# apt upgrade -y >/dev/null || error_exit "Failed to upgrade packages."
# log "✅ Upgrade completed successfully!"

log "Installing essential project tools like Nginx, Node.js and NPM..."
snap install node --channel=16/stable --classic >/dev/null || error_exit "Failed to install Node.js"
apt install nginx -y >/dev/null || error_exit "Failed to install Nginx"
systemctl start nginx >/dev/null || error_exit "Failed to start the Nginx web server"
log "✅ Nginx Started"

log "Configuring Nginx for TMS Server"
cat <<EOT >"$serverConfigFile"
server {
    listen $nginxPortForServer;
    server_name $serverHost;

    location / {
        proxy_pass http://localhost:$applicationPort;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOT
log "✅ Nginx configuration for server added successfully!"

log "Configuring Nginx for TMS Web"
cat <<EOT >"$webConfigFile"
server {
  listen $nginxPortForWeb;
  server_name $serverHost;
  root /var/www/html/tms-web-app;
  index index.html;
  location / {
   try_files \$uri \$uri/ /index.html;
  }
}
EOT
log "✅ Nginx configuration for web added successfully!"

log "Fetching the latest code from the cloud..."
git clone https://github.com/POOL4T7/TMS.git || error_exit "Failed to clone the repository."
cd TMS

log "Installing server dependencies..."
npm install --prefix server || error_exit "Failed to install server dependencies."
log "✅ Server dependencies installed successfully!"

log "Adding environment variables..."
cat <<EOT >"server/.env"
PORT=$applicationPort
NODE_ENV=$enviroment
MONGO_URI=$dbUrl
EOT
log "✅ Environment variables added successfully."

log "Building the project..."
npm run build --prefix server || error_exit "Failed to build the project."

log "⚡️ Your tms server is now ready to roll! ⚡️"

log "Installing webapp dependencies..."
npm install --prefix client || error_exit "Failed to install webapp dependencies."
log "✅ webapp dependencies installed successfully!"

log "Adding environment variables..."
cat <<EOT >"client/.env"
VITE_SERVER_URL=http://$serverHost:$applicationPort
EOT
log "✅ Environment variables added successfully."

log "Building the project..."
npm run build --prefix client || error_exit "Failed to build the project."
log "☠️💀 build folder"
ls -l client/dist

mkdir -p /var/www/html/$webProjectApp
mv client/dist/* /var/www/html/$webProjectApp

log "Testing Nginx configuration..."
nginx -t || error_exit "Nginx configuration test failed. Please check your configuration file."
log "✅ Nginx configuration test successful!"

# Restart Nginx to apply the changes
systemctl restart nginx || error_exit "Failed to restart Nginx. Please check Nginx configuration and permissions."
log "✅ Nginx restarted successfully!"
log "⚡️ Your project is now ready to roll! ⚡️"

npm install pm2@latest -g
