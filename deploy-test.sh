#!/bin/bash

set -e

cd ./build

docker compose -f docker-compose-test.yaml build ekfgroup
docker compose -f docker-compose-test.yaml push ekfgroup

docker compose -f docker-compose-test.yaml pull
docker compose -f docker-compose-test.yaml up --force-recreate -d
