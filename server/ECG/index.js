const express = require('express')
const router = express.Router()
const http = require('http')
const querystring = require('querystring')
const global = require('../../config/main')
const config = require('../../config/global.config')

// 获取最后一次的心电信息
router.get('/api/cardiogram', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/cardiogram/getLast?member_id=${req.query.member_id}`,
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
        req.session.token = result.openId // 设置认证信息
        console.log(`响应中数据: ${JSON.stringify(result)}`)
        res.send(global.handle(result))
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
// 获取某个时间段的心电信息
router.get('/api/cardiogram/time', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/cardiogram/getByTime?member_id=${req.query.member_id}&begin_date=${req.query.begin_date}&end_date=${req.query.end_date}&page_num=${req.query.page}`,
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
        req.session.token = result.openId // 设置认证信息
        console.log(`响应中数据: ${JSON.stringify(result)}`)
        res.send(global.handle(result))
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
// 获取某条心电数据
router.get('/api/cardiogram/detail', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/cardiogram/getCardiogramById?cardiogram_id=${req.query.cardiogram_id}`,
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
        req.session.token = result.openId // 设置认证信息
        console.log(`响应中数据: ${JSON.stringify(result)}`)
        res.send(global.handle(result))
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
// 删除某条心电数据
router.post('/api/cardiogram/delete', (req, res, next) => {
  const postData = querystring.stringify({
    cardiogram_id: req.body.cardiogram_id
  })
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/cardiogram/delete`,
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
// 获取当日前三条数据
router.get('/api/ecg/three', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/cardiogram/getThreeData?member_id=${req.query.member_id}&date_time=${req.query.date}&limit=${req.query.limit}`,
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
        req.session.token = result.openId // 设置认证信息
        console.log(`响应中数据: ${JSON.stringify(result)}`)
        res.send(global.handle(result))
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
