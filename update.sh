#! /bin/bash

./kill.sh

git pull origin master

yarn build:stage

./run.sh