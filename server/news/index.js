const express = require('express')
const router = express.Router()
const http = require('http')
const config = require('../../config/global.config')

router.get('/api/news', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/info/getInfo?module=${req.query.id}&level=${req.query.level}`,
    method: 'GET',
    headers: Object.assign(config.headers, {
      openId: req.session.token,
      loginCode: req.session.loginCode
    })
  }
  const _req = http.request(options, _res => {
    console.log(`请求地址: ${options.path}`)
    console.log(`状态码: ${_res.statusCode}`)
    console.log(`响应头: ${JSON.stringify(_res.headers)}`)
    _res.setEncoding('utf8')
    let rawData = ''
    _res.on('data', (chunk) => {
      rawData += chunk
    })
    _res.on('end', () => {
      try {
        const result = JSON.parse(rawData)
        console.log(`响应中数据: ${JSON.stringify(result)}`)
        res.send(result)
      } catch (e) {
        console.log(e.message)
      }
    })
  })
  _req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`)
  })
  _req.end()
})

module.exports = router
