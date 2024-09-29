#!/usr/bin/sh
#ps -ef | grep 'serve -s' | awk '{print $2}'  | xargs -r kill -9
#sleep 2
#rm -rf test_build
#cp -rf build test_build
#setsid nohup serve -s test_build >> frontend.log &


# Now in nginx serving test_build folder
