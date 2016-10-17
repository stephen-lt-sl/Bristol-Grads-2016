#!/bin/bash

set -e

echo "Starting application"
logsFolder=/home/ec2-user/TwitterWallApp/logs
source /home/ec2-user/TwitterWallConfig/env.sh > $logsFolder/src.log
npm start > $logsFolder/out.log 2> $logsFolder/err.log < /dev/null
disown -h `pgrep node` > $logsFolder/dis.log
echo "Application started successfully!"

