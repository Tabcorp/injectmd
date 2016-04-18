# node-injectmd

[![npm version][0]][1] [![build status][2]][3] [![test coverage][4]][5]
[![downloads][6]][7] [![js-standard-style][8]][9]

Inject markdown into markdown.

## Usage

Given some markdown `README.md`:

```md
<!--START main-header-->
<!--END main-header-->

## another section
```

Inject a header at `<!--main-header-->`:

```sh
printf '# best header ever' | injectmd -t main-header -i README.md
```

Creates:

```md
<!--START main-header-->
# best header ever
<!--END main-header-->

## another section
```

## Installation

```sh
$ npm install injectmd
```
## Related packages

`injectmd` works well with any package / program that outputs Markdown to `stdout`.

| Package | Purpose |
|---------|---------|
| https://www.npmjs.com/package/markdown-toc | Add a table of contents |
| https://www.npmjs.com/package/swagger-to-md | Add Swagger specs |

## License

[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/npm/v/injectmd.svg?style=flat-square
[1]: https://npmjs.org/package/injectmd
[2]: https://img.shields.io/travis/TabDigital/node-injectmd/master.svg?style=flat-square
[3]: https://travis-ci.org/TabDigital/node-injectmd
[4]: https://img.shields.io/codecov/c/github/TabDigital/node-injectmd/master.svg?style=flat-square
[5]: https://codecov.io/github/TabDigital/node-injectmd
[6]: http://img.shields.io/npm/dm/injectmd.svg?style=flat-square
[7]: https://npmjs.org/package/injectmd
[8]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[9]: https://github.com/feross/standard
