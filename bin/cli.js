#!/usr/bin/env node
const cliclopts = require('cliclopts')
const minimist = require('minimist')
const pump = require('pump')
const fs = require('fs')

const pkg = require('../package.json')
const main = require('../')

const opts = cliclopts([
  { name: 'help', abbr: 'h', boolean: true },
  { name: 'version', abbr: 'v', boolean: true },
  { name: 'in', abbr: 'i', string: true },
  { name: 'tag', abbr: 't', string: true }
])

const argv = minimist(process.argv.slice(2), opts.options())

// parse options
if (argv.version) {
  const version = require('../package.json').version
  process.stdout.write('v' + version + '\n')
  process.exit(0)
} else if (argv.help) {
  process.stdout.write(pkg.name + ' - ' + pkg.description + '\n')
  usage(0)
} else if (!argv.in) {
  process.stdout.write('--in is required' + '\n')
  usage(1)
} else if (!argv.tag) {
  process.stdout.write('--tag is required' + '\n')
  usage(1)
} else {
  const rs = process.stdin
  const ts = main(argv)
  pump(rs, ts)
}

// print usage & exit
// num? -> null
function usage (exitCode) {
  const rs = fs.createReadStream(__dirname + '/usage.txt')
  const ws = process.stdout
  rs.pipe(ws)
  ws.on('finish', process.exit.bind(null, exitCode))
}
