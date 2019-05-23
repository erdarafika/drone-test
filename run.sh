#! /bin/bash
echo "Run App ..."
nohup serve -l 9527 dist  > /dev/null 2>&1&