#!/bin/bash

set -e

sudo yum -y update

echo "Installing nodejs to yum..."
curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -
sudo yum -y install nodejs

cd /home/ec2-user/TwitterWallApp

echo "Installing packages..."
sudo npm install

echo "Building project..."
sudo env NODE_ENV=production grunt build

# Copy server config files stored in the EC2 directory to the appropriate folder
echo "Fetching configuration files..."
sudo mkdir /home/ec2-user/TwitterWallApp/server/config
sudo cp /home/ec2-user/TwitterWallConfig/adminConfig.json /home/ec2-user/TwitterWallApp/server/config/adminConfig.json
sudo cp /home/ec2-user/TwitterWallConfig/eventConfig.json /home/ec2-user/TwitterWallApp/server/config/eventConfig.json

echo "Creating log folder..."
sudo rm -r /home/ec2-user/TwitterWallApp/logs
sudo mkdir /home/ec2-user/TwitterWallApp/logs

echo "Install complete."

