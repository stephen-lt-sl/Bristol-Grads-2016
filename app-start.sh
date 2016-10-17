#!/bin/bash

set -e

echo "Starting application"
source /home/ec2-user/TwitterWallConfig/env.sh
nohup npm start > logs/out.log 2> logs/err.log < /dev/null &
echo "Application started successfully!"

