#!/bin/bash
set -e  # Exit on error

if [ ! -f ../staging/ayf.zip ]; then
    echo "Error: ayf.zip not found in staging!"
    exit 1
fi

# Copy the ZIP file from staging
sudo cp ../staging/ayf.zip ./ayf.zip

# Remove old project directory
sudo rm -rf angry-yellow-fruit/

# Unzip the new project
sudo unzip ayf.zip

# Move extracted app folder to project name
sudo mv app/ angry-yellow-fruit

# Remove old node_modules
sudo rm -rf angry-yellow-fruit/node_modules

# Install dependencies inside the project directory
( cd angry-yellow-fruit && npm install )

# Restart or Start the app safely
( cd angry-yellow-fruit && pm2 list | grep -q angry-yellow-fruit && pm2 restart angry-yellow-fruit || pm2 start npm --name ang>

# Save PM2 state (ensures it starts on reboot)
pm2 save

# Clean up the ZIP file
sudo rm -f ayf.zip

echo "✅ Deployment complete!"