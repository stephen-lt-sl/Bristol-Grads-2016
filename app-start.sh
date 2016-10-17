#!/bin/bash

set -e

echo "Starting application"
source /home/ec2-user/TwitterWallConfig/env.sh
npm start > logs/out.log 2> logs/err.log < /dev/null &
disown -h `pgrep node`
echo "Application started successfully!"

