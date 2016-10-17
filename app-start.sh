#!/bin/bash

echo "Starting application"
echo "This is a test" > /home/ec2-user/TwitterWallApp/test.log
source /home/ec2-user/TwitterWallConfig/env.sh
sudo -E npm start > logs/out.log 2> logs/err.log < /dev/null &
echo "Application started successfully!"

