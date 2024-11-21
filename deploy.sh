#!/bin/bash

set -e

cd ./build

docker compose build ekfgroup
docker compose build ekfgroup-nginx
docker compose push ekfgroup
docker compose push ekfgroup-nginx
docker compose pull
docker compose up --force-recreate -d
