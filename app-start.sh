#!/bin/bash

set -e

echo "Starting application"
source /home/ec2-user/TwitterWallConfig/env.sh > /home/ec2-user/TwitterWallApp/logs/src.log
npm start > logs/out.log 2> logs/err.log < /dev/null
disown -h `pgrep node` > /home/ec2-user/TwitterWallApp/logs/dis.log
echo "Application started successfully!"

