const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('cookie-session')
const user = require('./user/index')
const health = require('./healthProfile/index')
const pressure = require('./pressure/index')
const weight = require('./weight/index')
const ecg = require('./ECG/index')
const oxygen = require('./oxygen/index')
const sugar = require('./sugar/index')
const temperature = require('./temperature/index')
const news = require('./news/index')
const sleep = require('./sleep/index')
const app = express()

const PORT = 3001 || process.env.PORT

// parse application/json
app.use(bodyParser.json({
  limit: '100mb'
}))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  limit: '100mb',
  extended: false
}))
app.set('trust proxy', 1) // trust first proxy

// For cookie session middleware
app.use(session({
  name: 'session',
  keys: ['key1', 'key2']
  // cookie: {
  //   httpOnly: true,
  //   domain: config.host,
  //   path: config.path,
  //   expires: new Date(Date.now() + 60 * 60 * 1000)
  // }
}))
app.use((req, res, next) => {
  if (/\/api\/*/.test(req.originalUrl)) {
    // handle http request headers
    console.log('Cookies: ', req.session)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // if (!req.session.user) {
    //   req.session.user = {}
    // }
  }
  next()
})
// 用户管理业务
app.use(user)
// 健康档案业务
app.use(health)
// 血压业务
app.use(pressure)
// 体重业务
app.use(weight)
// 心电业务
app.use(ecg)
// 血氧业务
app.use(oxygen)
// 血糖业务
app.use(sugar)
// 体温业务
app.use(temperature)
// 资讯业务
app.use(news)
// 睡眠业务
app.use(sleep)

app.use(express.static(path.resolve(__dirname, '../dist')))
app.get('*', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})

app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`)
})
