const express = require('express')
const router = express.Router()
const http = require('http')
const querystring = require('querystring')
const global = require('../../config/main')
const config = require('../../config/global.config')

// 获取睡眠量表类型标识
router.post('/api/getTemplateTerms', (req, res, next) => {
    const postData = querystring.stringify({
      member_id: req.body.member_id,
    })
    const options = {
      host: config.host,
      port: config.port,
      path: `${config.path}/sleep/getTemplateTerms`,
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
// 获取睡眠量表信息
router.post('/api/getTemplateList', (req, res, next) => {
    const postData = querystring.stringify({
      member_id: req.body.member_id,
      templateTerm:req.body.templateTerm
    })
    const options = {
      host: config.host,
      port: config.port,
      path: `${config.path}/sleep/getTemplateList`,
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
// 设置用户睡眠量表
router.post('/api/setUserTemplate', (req, res, next) => {
    const postData = querystring.stringify({
      member_id: req.body.member_id,
      templateId: req.body.templateId,
      tuId: req.body.tuId,
    })
 
    const options = {
      host: config.host,
      port: config.port,
      path: `${config.path}/sleep/setUserTemplate`,
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
// 保存用户输入的睡眠量表数据(提交已完成测试的量表)
router.post('/api/saveUserTemplate', (req, res, next) => {
    const postData = querystring.stringify({
      member_id: req.body.member_id,
      tuId: req.body.tuId,
      inputVal: req.body.inputVal,
    })
  
    const options = {
      host: config.host,
      port: config.port,
      path: `${config.path}/sleep/saveUserTemplate`,
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
// 在进行量表测试的时候实时保存已做过的题目
router.post('/api/saveUserTemplateByTime', (req, res, next) => {
    const postData = querystring.stringify({
      member_id: req.body.member_id,
      templateId: req.body.templateId,
      tuId: req.body.tuId,
      inputVal: req.body.inputVal
    })
  
    const options = {
      host: config.host,
      port: config.port,
      path: `${config.path}/sleep/saveUserTemplateByTime`,
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
// 获取睡眠百科类型列表
router.post('/api/getSleepWikiTerms', (req, res, next) => {
    const postData = querystring.stringify({
      member_id: req.body.member_id,
    })
  
    const options = {
      host: config.host,
      port: config.port,
      path: `${config.path}/sleep/getSleepWikiTerms`,
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
// 获取睡眠百科列表
router.post('/api/getSleepWikiList', (req, res, next) => {
    const postData = querystring.stringify({
      member_id: req.body.member_id,
      termsId: req.body.termsId,
    })
  
    const options = {
      host: config.host,
      port: config.port,
      path: `${config.path}/sleep/getSleepWikiList`,
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
// 获取睡眠百科内容
router.post('/api/getSleepWiki', (req, res, next) => {
    const postData = querystring.stringify({
      member_id: req.body.member_id,
      postId: req.body.postId,
    })
  
    const options = {
      host: config.host,
      port: config.port,
      path: `${config.path}/sleep/getSleepWiki`,
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
// 获取助眠练习列表
router.post('/api/getSleepPractice', (req, res, next) => {
    const postData = querystring.stringify({
      member_id: req.body.member_id,
      postId: req.body.postId,
    })
  
    const options = {
      host: config.host,
      port: config.port,
      path: `${config.path}/sleep/getSleepPractice`,
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
// 获取用户睡眠量表分析数据
router.post('/api/getUserSleepPractice', (req, res, next) => {
    const postData = querystring.stringify({
      member_id: req.body.member_id,
      tuId: req.body.tuId,
    })
  
    const options = {
      host: config.host,
      port: config.port,
      path: `${config.path}/sleep/getSleepPractice`,
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
// 新增睡眠测试记录
router.post('/api/sleep/insert', (req, res, next) => {
    const postData = querystring.stringify({
      member_id: req.body.member_id,
      startTime: req.body.startTime,
      sleepTime: req.body.sleepTime,
      wakeTime: req.body.wakeTime,
      getupTime: req.body.getupTime,
      quality: req.body.quality,
      influence: req.body.influence,
    })
  
    const options = {
      host: config.host,
      port: config.port,
      path: `${config.path}/sleep/insert`,
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
// 获取最近一个周的测量记录
router.post('/api/sleep/getByWeek', (req, res, next) => {
    const postData = querystring.stringify({
      member_id: req.body.member_id,
    })
  
    const options = {
      host: config.host,
      port: config.port,
      path: `${config.path}/sleep/getByWeek`,
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
// 获取最近7条测量记录
router.post('/api/getByLastSeven', (req, res, next) => {
    const postData = querystring.stringify({
      member_id: req.body.member_id,
    })
  
    const options = {
      host: config.host,
      port: config.port,
      path: `${config.path}/sleep/getByLastSeven`,
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
// 获取用户最近一条测量记录
router.post('/api/sleep/getLast', (req, res, next) => {
    const postData = querystring.stringify({
      member_id: req.body.member_id,
    })
  
    const options = {
      host: config.host,
      port: config.port,
      path: `${config.path}/sleep/getLast`,
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
// 获取慢病标签
router.post('/api/getDiseaseList', (req, res, next) => {
    const postData = querystring.stringify({
      openId: req.body.openId,
    })
  
    const options = {
      host: config.host,
      port: config.port,
      path: `${config.path}/common/getDiseaseList`,
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

// 获取过敏标签
router.post('/api/getAllergyList', (req, res, next) => {
    const postData = querystring.stringify({
      member_id: req.body.member_id,
      templateId: req.body.templateId,
      tuId: req.body.tuId,
      inputVal: req.body.inputVal
    })
  
    const options = {
      host: config.host,
      port: config.port,
      path: `${config.path}/common/getAllergyList`,
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

module.exports = router


