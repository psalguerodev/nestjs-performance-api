#! /bin/sh

echo '   Building NestJS application'
echo '==============================='
echo '>>> Compiling'
yarn run xprestart:prod
echo '>>> Creating docker image tag psalguero/nest-mock-api:latest'
docker build -t psalguero/nest-mock-api:latest .
echo '>>> Docker Login'
echo 'psalguero' | docker login --username psalguero --password-stdin
echo '>>> Publish docker image tag :latest'
docker push psalguero/nest-mock-api:latest
exit -1