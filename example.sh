#!/bin/sh
mkdir -p tmp
cp test/file.md tmp/README.md
printf '# best header ever' | ./bin/cli.js -t main-header -i tmp/README.md
