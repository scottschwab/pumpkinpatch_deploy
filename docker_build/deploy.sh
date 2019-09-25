#!/bin/bash

if [ $1 ]
then
    docker build -t $1:build .
    docker run  --name $1 -d $1:build
    docker cp $1:/output/index.html ../docker_deploy/site/index.html
    docker cp $1:/output/main.tar ../docker_deploy/site/main.tar

    cd ../docker_deploy
    docker build -t nginx:$1 .
    docker run -d -p 9091:80 nginx:$1
else
    echo "missing argument"
fi
