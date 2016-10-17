#!/bin/bash

echo "Starting application"
source /home/ec2-user/TwitterWallConfig/env.sh
sudo -E npm start > logs/out.log 2> logs/err.log < /dev/null &
echo "Application started successfully!"

