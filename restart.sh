#!/usr/bin/sh
ps -ef | grep 'serve -s' | awk '{print $2}'  | xargs -r kill -9
sleep 2
nohup serve -s build > frontend.log &
