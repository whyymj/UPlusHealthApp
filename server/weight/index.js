const express = require('express')
const router = express.Router()
const http = require('http')
const querystring = require('querystring')
const global = require('../../config/main')
const config = require('../../config/global.config')

// 录入体脂信息
router.post('/api/weight', (req, res, next) => {
  const postData = querystring.stringify({
    member_id: req.body.member_id,
    weight: req.body.weight,
    // resistance: req.body.resistance,
    // tools_name: req.body.tools_name,
    create_date: req.body.create_date
  })

  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/weight/insert`,
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
// 获取最后一次的体脂信息
router.get('/api/weight', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/weight/getLast?member_id=${req.query.member_id}`,
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
// 获取数据指标
router.get('/api/weight/index', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/weight/getDataIndex?weight_id=${req.query.weight_id}`,
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
// 获取测量报告
router.get('/api/weight/report', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/weight/getMeasurementReport?weight_id=${req.query.weight_id}`,
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
// 获取某个时间段的体脂信息
router.get('/api/weight/time', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/weight/getByTime?member_id=${req.query.member_id}&begin_date=${req.query.begin_date}&end_date=${req.query.end_date}&page_num=${req.query.page}`,
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
// 获取一年的某个指标信息
router.get('/api/weight/type', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/weight/getLastSeven2H5?member_id=${req.query.member_id}&date_time=${req.query.date}`,
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
// 保存用户自定义体重趋势
router.post('/api/weight/custom', (req, res, next) => {
  const postData = querystring.stringify({
    member_id: req.body.member_id,
    custom_id: req.body.custom_id,
    custom_item: req.body.custom_item
  })
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/weight/setWeightCustom`,
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
// 获取用户自定义体重趋势
router.get('/api/weight/custom', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/weight/getWeightCustom?member_id=${req.query.member_id}`,
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
// 删除某条体重数据
router.post('/api/weight/delete', (req, res, next) => {
  const postData = querystring.stringify({
    weight_id: req.body.weight_id
  })
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/weight/delete`,
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
// 获得最佳体重信息，包括最佳体重范围和参考区间
router.get('/api/weight/info', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/weight/getPerfectWeightInfo?member_id=${req.query.member_id}`,
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
// 获取当日前三条数据
router.get('/api/weight/three', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/weight/getThreeData?member_id=${req.query.member_id}&date_time=${req.query.date}&limit=${req.query.limit}`,
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
