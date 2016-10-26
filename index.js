const stream = require('readable-stream')
const assert = require('assert')
const split = require('split2')
const EOL = require('os').EOL
const path = require('path')
const fs = require('fs')
const bl = require('bl')

module.exports = nodeInjectmd

// Inject markdown into markdown
// obj -> null
function nodeInjectmd (opts) {
  const inBuf = bl()

  assert.equal(typeof opts, 'object', 'opts should be an object')
  assert.equal(typeof opts.in, 'string', 'opts.in should be a string')
  assert.equal(typeof opts.tag, 'string', 'opts.tag should be a string')

  const inFile = opts.in
  const tag = opts.tag
  const startTag = new RegExp('<!--\\s*START ' + tag + '\\s*-->')
  const endTag = new RegExp('<!--\\s*END ' + tag + '\\s*-->')

  assert.equal(typeof opts, 'object', 'opts must be an object')

  const rs = new stream.PassThrough()

  rs.pipe(inBuf)

  rs.on('end', function () {
    var tagMode = false
    const mdPath = path.join(process.cwd(), inFile)
    const irs = fs.createReadStream(mdPath)
    const its = split(parse)
    const tmpBuf = bl()

    irs.pipe(its).pipe(tmpBuf)

    tmpBuf.on('finish', function () {
      const ws = fs.createWriteStream(inFile, { flags: 'w' })
      const rs = tmpBuf.duplicate()
      rs.pipe(ws)
    })

    function parse (line) {
      if (startTag.test(line.trim())) {
        tagMode = true
        const res = line + EOL + String(inBuf) + EOL + EOL
        return res
      } else if (endTag.test(line.trim())) {
        tagMode = false
        return line + EOL
      } else if (!tagMode) {
        return line + EOL
      }
    }
  })

  return rs
}
