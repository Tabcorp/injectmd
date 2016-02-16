# node-injectmd [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

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
$ npm install node-injectmd
```

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/node-injectmd.svg?style=flat-square
[3]: https://npmjs.org/package/node-injectmd
[4]: https://img.shields.io/travis/TabDigital/node-injectmd/master.svg?style=flat-square
[5]: https://travis-ci.org/TabDigital/node-injectmd
[6]: https://img.shields.io/codecov/c/github/TabDigital/node-injectmd/master.svg?style=flat-square
[7]: https://codecov.io/github/TabDigital/node-injectmd
[8]: http://img.shields.io/npm/dm/node-injectmd.svg?style=flat-square
[9]: https://npmjs.org/package/node-injectmd
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
