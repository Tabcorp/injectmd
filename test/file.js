const exec = require('child_process').exec
const fromString = require('from2-string')
const waterfall = require('run-waterfall')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const path = require('path')
const test = require('tape')
const fs = require('fs')

test('should read and write files', function (t) {
  t.plan(2)

  const tasks = [
    function createDir (next) {
      mkdirp(path.join(__dirname, '../tmp'), next)
    },
    function readFile (_, next) {
      fs.readFile(path.join(__dirname, 'fixtures/file.md'), 'utf8', next)
    },
    function writeFile (file, next) {
      fs.writeFile(path.join(__dirname, '../tmp/in.md'), file, next)
    },
    function runTask (next) {
      const cmd = path.join(__dirname, '../bin/cli.js')
      const args = ' -i ./tmp/in.md -t main-header'
      const child = exec(cmd + args)
      child.stdout.pipe(process.stdout)
      child.stderr.pipe(process.stderr)
      const rs = fromString('# best header ever')
      rs.pipe(child.stdin)

      child.on('close', function () {
        const expath = path.join(__dirname, 'fixtures/expected.md')
        const expected = fs.readFileSync(expath, 'utf8')
        const respath = path.join(__dirname, '../tmp/in.md')
        const result = fs.readFileSync(respath, 'utf8')
        t.equal(result, expected, 'output is same')
        next()
      })
    },
    function cleanup (next) {
      rimraf(path.join(__dirname, '../tmp'), next)
    }
  ]

  waterfall(tasks, function (err) {
    t.ifError(err, 'no err')
  })
})
