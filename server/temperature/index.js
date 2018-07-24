const express = require('express')
const router = express.Router()
const http = require('http')
const querystring = require('querystring')
const global = require('../../config/main')
const config = require('../../config/global.config')

// 录入体温信息
router.post('/api/temperature', (req, res, next) => {
  const postData = querystring.stringify({
    member_id: req.body.member_id,
    temperature_data: req.body.temperature_data,
    create_date: req.body.create_date
  })

  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/temperature/insert`,
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
// 获取最后一次的体温信息
router.get('/api/temperature', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/temperature/getLast?member_id=${req.query.member_id}`,
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
// 获取某个时间段的体温信息
router.get('/api/temperature/time', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/temperature/getByTime?member_id=${req.query.member_id}&begin_date=${req.query.begin_date}&end_date=${req.query.end_date}&page_num=${req.query.page}`,
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
// 获取一年的体温信息
router.get('/api/temperature/year', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/temperature/getByYearRange?member_id=${req.query.member_id}`,
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
// 获取最后七次的体温信息
router.get('/api/temperature/seven', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/temperature/getLastSeven2H5?member_id=${req.query.member_id}`,
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
// 获取一个周的体温信息
router.get('/api/temperature/week', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/temperature/getByWeekRange?member_id=${req.query.member_id}`,
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
// 获取月度的体温信息
router.get('/api/temperature/month', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/temperature/getByMonthRange?member_id=${req.query.member_id}`,
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
// 删除某条体温数据
router.post('/api/temperature/delete', (req, res, next) => {
  const postData = querystring.stringify({
    temperature_id: req.body.temperature_id
  })
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/temperature/delete`,
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
// 批量插入体温数据
router.post('/api/temperature/batch', (req, res, next) => {
  const postData = querystring.stringify({
    member_id: req.body.member_id,
    tools_name: req.body.tools_name,
    temperature_datas: req.body.temperature_datas,
    create_date: req.body.create_date,
    temperature_data: req.body.temperature_data
  })

  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/temperature/batchInsert`,
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
router.get('/api/temperature/three', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/temperature/getThreeData?member_id=${req.query.member_id}&date_time=${req.query.date}&limit=${req.query.limit}`,
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
