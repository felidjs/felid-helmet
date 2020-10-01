# felid-helmet

[![npm version](https://img.shields.io/npm/v/felid-helmet.svg)](https://www.npmjs.com/package/felid-helmet)
![Node.js CI](https://github.com/felidjs/felid-helmet/workflows/Node.js%20CI/badge.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![codecov](https://codecov.io/gh/felidjs/felid-helmet/branch/master/graph/badge.svg)](https://codecov.io/gh/felidjs/felid-helmet)

Using [Helmet](https://github.com/helmetjs/helmet) middlewares in your [Felid](https://github.com/felidjs/felid) app to help improving security.

## Install

```bash
npm install felid-helmet
```

or

```bash
yarn add felid-helmet
```

## Usage

```javascript
const Felid = require('felid')
const helmet = require('felid-helmet')

const app = new Felid()
app.plugin(helmet, options)
```

The following table displays all middlewares in Helmet, and the default ones. (Data comes from [Helmet's doc](https://github.com/helmetjs/helmet/blob/master/README.md))

| Module | Default? |
|---|---|
| [contentSecurityPolicy](https://helmetjs.github.io/docs/csp/) for setting Content Security Policy |  |
| [crossdomain](https://helmetjs.github.io/docs/crossdomain/) for handling Adobe products' crossdomain requests |  |
| [dnsPrefetchControl](https://helmetjs.github.io/docs/dns-prefetch-control) controls browser DNS prefetching | ✓ |
| [expectCt](https://helmetjs.github.io/docs/expect-ct/) for handling Certificate Transparency |  |
| [featurePolicy](https://helmetjs.github.io/docs/feature-policy/) to limit your site's features |  |
| [frameguard](https://helmetjs.github.io/docs/frameguard/) to prevent clickjacking | ✓ |
| [hidePoweredBy](https://helmetjs.github.io/docs/hide-powered-by) to remove the X-Powered-By header | ✓ |
| [hpkp](https://helmetjs.github.io/docs/hpkp/) for HTTP Public Key Pinning |  |
| [hsts](https://helmetjs.github.io/docs/hsts/) for HTTP Strict Transport Security | ✓ |
| [ieNoOpen](https://helmetjs.github.io/docs/ienoopen) sets X-Download-Options for IE8+ | ✓ |
| [noCache](https://helmetjs.github.io/docs/nocache/) to disable client-side caching |  |
| [noSniff](https://helmetjs.github.io/docs/dont-sniff-mimetype) to keep clients from sniffing the MIME type | ✓ |
| [referrerPolicy](https://helmetjs.github.io/docs/referrer-policy) to hide the Referer header |  |
| [xssFilter](https://helmetjs.github.io/docs/xss-filter) adds some small XSS protections | ✓ |

Pass an option to the middleware:
```js
app.use(helmet, {
  xssFilter: { mode: null }
})
```

Disable a default middleware:
```js
app.use(helmet, { xssFilter: false })
```

To enable a middleware, you can set the property to `true` (and use the default option), or just pass the option to it.
```js
app.use(helmet, {
  expectCt: { maxAge: 123 },
  hpkp: true
})
```

For more information, please check [the official documentation of Helmet](https://helmetjs.github.io/docs/).

## License

[MIT](./LICENSE)
