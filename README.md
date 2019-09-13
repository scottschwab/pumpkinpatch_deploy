# pumpkinpatch_deploy
deploying the pumpkin patch order page


1. Copy code from dev area to docker_build/code/src
2. In docker_build, run `docker -t name:tag .`
3. Run docker image, `docker run -d name:tag`
4. Get idea of container.
5. Go to up a directory.
6. Copy build results to deploy 
```
  docker cp xxx:/output/index.html docker_deploy/site/
  docker cp xxx:/output/dist/main.js docker_deploy/site/dist/
```
7. Go to docker_deploy
8. Run `docker build -t nginx:version .`
9. To view `docker run -d -p 9090:80 nginx:version`

