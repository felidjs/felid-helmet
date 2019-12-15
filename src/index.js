const helmet = {
  contentSecurityPolicy: 'helmet-csp',
  dnsPrefetchControl: 'dns-prefetch-control',
  expectCt: 'expect-ct',
  featurePolicy: 'feature-policy',
  frameguard: 'frameguard',
  hidePoweredBy: 'hide-powered-by',
  hsts: 'hsts',
  ieNoOpen: 'ienoopen',
  noCache: 'nocache',
  noSniff: 'dont-sniff-mimetype',
  permittedCrossDomainPolicies: 'helmet-crossdomain',
  referrerPolicy: 'referrer-policy',
  xssFilter: 'x-xss-protection'
}

const defaultPlugins = [
  'dnsPrefetchControl',
  'frameguard',
  'hidePoweredBy',
  'hsts',
  'ieNoOpen',
  'noSniff',
  'xssFilter'
]

function plugin (felid, options) {
  const opts = options || {}
  for (const name in helmet) {
    const opt = opts[name]
    if ((defaultPlugins.includes(name) && opt !== false) || opt) {
      if (opt === true) {
        felid.use(require(helmet[name])())
      } else {
        felid.use(require(helmet[name])(opt))
      }
    }
  }
}

module.exports = plugin
