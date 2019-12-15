const Felid = require('felid')
const injectar = require('injectar')
const helmet = require('../src')

test('Should use default middlewares', (done) => {
  const instance = new Felid()
  instance.use((req, res) => {
    res.setHeader('x-powered-by', 'felid')
  })
  instance.plugin(helmet)
  instance.get('/test', (req, res) => {
    res.send('test')
  })

  injectar(instance.lookup())
    .get('/test')
    .end((err, res) => {
      expect(err).toBe(null)
      expect(res.headers).not.toHaveProperty('x-powered-by')
      expect(res.headers['x-dns-prefetch-control']).toBe('off')
      expect(res.headers['x-frame-options']).toBe('SAMEORIGIN')
      expect(res.headers['strict-transport-security']).toBe('max-age=15552000; includeSubDomains')
      expect(res.headers['x-download-options']).toBe('noopen')
      expect(res.headers['x-content-type-options']).toBe('nosniff')
      expect(res.headers['x-xss-protection']).toBe('1; mode=block')
      expect(res.payload).toBe('test')
      done()
    })
})

test('Should set correct options', (done) => {
  const instance = new Felid()
  instance.plugin(helmet, {
    dnsPrefetchControl: { allow: true },
    featurePolicy: {
      features: {
        fullscreen: ["'self'"],
        vibrate: ["'none'"],
        payment: ['example.com'],
        syncXhr: ["'none'"]
      }
    },
    ieNoOpen: false,
    permittedCrossDomainPolicies: true,
    xssFilter: { mode: null }
  })
  instance.get('/test', (req, res) => {
    res.send('test')
  })

  injectar(instance.lookup())
    .get('/test')
    .end((err, res) => {
      expect(err).toBe(null)
      expect(res.headers).not.toHaveProperty('x-download-options')
      expect(res.headers['feature-policy']).toBe("fullscreen 'self';vibrate 'none';payment example.com;sync-xhr 'none'")
      expect(res.headers['x-dns-prefetch-control']).toBe('on')
      expect(res.headers['x-permitted-cross-domain-policies']).toBe('none')
      expect(res.headers['x-xss-protection']).toBe('1')
      expect(res.payload).toBe('test')
      done()
    })
})
