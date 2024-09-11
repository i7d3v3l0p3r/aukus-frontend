#!/usr/bin/sh
ps -ef | grep 'serve -s' | awk '{print $2}'  | xargs -r kill -9
sleep 2
rm -rf prod_build
cp -rf build prod_build
setsid nohup serve -s prod_build >> frontend.log &
