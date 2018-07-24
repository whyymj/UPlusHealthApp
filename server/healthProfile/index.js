const express = require('express')
const router = express.Router()
const http = require('http')
const querystring = require('querystring')
const global = require('../../config/main')
const config = require('../../config/global.config')

// 获取首页健康档案接口
router.get('/api/health/profile', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/healthSuggest/getHealthSuggest?member_id=${req.query.member_id}`,
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
// 用户自定义设置显示的健康项目
router.post('/api/health', (req, res, next) => {
  const postData = querystring.stringify({
    member_id: req.body.member_id,
    custom_id: req.body.custom_id,
    pro_item: req.body.pro_item
  })
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/user/setHealthPro`,
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
// 获得自定义设置显示的健康项目
router.get('/api/health', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/user/getHealthPro?member_id=${req.query.member_id}`,
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
// 获取某个健康模块近三个月（上各月、本月、下个月）有数据记录的时间列表
router.get('/api/health/list', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/user/getExistDateList?member_id=${req.query.member_id}&flag=${req.query.flag}&begin_date=${req.query.begin}&end_date=${req.query.end}`,
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
// 获得人物首页各健康模块显示的健康数据
router.get('/api/health/result', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/user/getHealthProResult?member_id=${req.query.member_id}`,
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
