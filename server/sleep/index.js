const express = require('express')
const router = express.Router()
const http = require('http')
const querystring = require('querystring')
const global = require('../../config/main')
const config = require('../../config/global.config')

// 录入血糖信息
router.post('/api/sugar', (req, res, next) => {
    const postData = querystring.stringify({
      member_id: req.body.member_id,
      glucose_data: req.body.glucose_data,
      time_point: req.body.time_point,
      create_date: req.body.create_date
    })
  
    const options = {
      host: config.host,
      port: config.port,
      path: `${config.path}/bloodSugar/insert`,
      method: 'POST',
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
          req.session.token = result.openId // 设置认证信息
          console.log(`响应中数据: ${JSON.stringify(result)}`)
          res.send(global.handle(result))
        } catch (e) {
          console.log(e.message)
        }
      })
    })
  
    _req.write(postData)
    _req.on('error', (e) => {
      console.error(`请求遇到问题: ${e.message}`)
    })
    _req.end()
  })