#!/bin/bash

echo "Starting application"
echo "This is a test" > /home/ec2-user/TwitterWallApp/test.log
source /home/ec2-user/TwitterWallConfig/env.sh
echo "This is a also test" > /home/ec2-user/TwitterWallApp/test2.log
sudo -E npm start > logs/out.log 2> logs/err.log < /dev/null &
echo "This is the last test" > /home/ec2-user/TwitterWallApp/test3.log
echo "Application started successfully!"

