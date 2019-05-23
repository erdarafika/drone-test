#! /bin/bash

./kill.sh

git pull origin master

yarn install
yarn build:stage