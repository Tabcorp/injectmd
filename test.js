const exec = require('child_process').exec
const waterfall = require('run-waterfall')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const path = require('path')
const test = require('tape')
const fs = require('fs')

test('should read and write files', function (t) {
  t.plan(1)

  const tasks = [
    function createDir (next) {
      mkdirp(path.join(__dirname, 'tmp'), next)
    },
    function readFile (_, next) {
      fs.readFile(path.join(__dirname, 'test/file.md'), 'utf8', next)
    },
    function writeFile (file, next) {
      fs.writeFile(path.join(__dirname, 'tmp/in.md'), next)
    },
    function runTask (_, next) {
      const cmd = path.join(__dirname, 'bin/cli.js')
      const args = ' -i ./tmp/in.md -t main-header'
      exec(cmd + args, function (err, stdout, stderr) {
        t.ifError(err, 'no error')
      })
    },
    function cleanup (_, next) {
      rimraf(path.join(__dirname, 'tmp'), next)
    }
  ]

  waterfall(tasks, function (err) {
    t.ifError(err, 'no err')
  })
})
