const express = require('express')
const router = express.Router()
const http = require('http')
const querystring = require('querystring')
const global = require('../../config/main')
const config = require('../../config/global.config')

// 获取睡眠量表类型标识
router.post('/api/getTemplateTerms', (req, res, next) => {
  const postData = querystring.stringify({member_id: req.body.member_id})
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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
  const postData = querystring.stringify({member_id: req.body.member_id, templateTerm: req.body.templateTerm})
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/sleep/getTemplateList`,
    method: 'POST',
    headers: Object.assign(config.headers, {
      openId: req.session.token||'ab7ffc85a5ef44ce8c6ce6e0f032557c',
      loginCode: req.session.loginCode||'17561722550'
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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
  const postData = querystring.stringify({member_id: req.body.member_id, templateId: req.body.templateId, tuId: req.body.tuId})

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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
  const postData = querystring.stringify({member_id: req.body.member_id, tuId: req.body.tuId, inputVal: req.body.inputVal})

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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
  const postData = querystring.stringify({member_id: req.body.member_id, templateId: req.body.templateId, tuId: req.body.tuId, inputVal: req.body.inputVal})

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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
  const postData = querystring.stringify({member_id: req.body.member_id})

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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
  const postData = querystring.stringify({member_id: req.body.member_id, termsId: req.body.termsId})

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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
  const postData = querystring.stringify({member_id: req.body.member_id, postId: req.body.postId})

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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
  const postData = querystring.stringify({member_id: req.body.member_id})

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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
router.post('/api/getUserTemplateAnalysis', (req, res, next) => {
  const postData = querystring.stringify({member_id: req.body.member_id, tuId: req.body.tuId})

  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/sleep/getUserTemplateAnalysis`,
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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
  const postData = querystring.stringify(req.body)

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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
  const postData = querystring.stringify({member_id: req.body.member_id})

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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
  const postData = querystring.stringify({member_id: req.body.member_id})

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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
  const postData = querystring.stringify({member_id: req.body.member_id})

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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
  const postData = querystring.stringify({openId: req.session.token})

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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
  const postData = querystring.stringify({member_id: req.body.member_id, templateId: req.body.templateId, tuId: req.body.tuId, inputVal: req.body.inputVal})

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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        }
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
router.post('/api/sleeGetExistDateList', (req, res, next) => {
  const postData = querystring.stringify({member_id: req.body.member_id, begin_date: req.body.begin_date, end_date: req.body.end_date})

  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/sleep/getExistDateList`,
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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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

// 新增睡眠测试记录(从iphone中获取)
router.post('/api/insertByIphone', (req, res, next) => {
  const postData = querystring.stringify({member_id: req.body.member_id, sleepTime: req.body.sleepTime, wakeTimes: req.body.wakeTimes})

  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/sleep/insertByIphone`,
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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
// 更新睡眠日报(补全从iphone中获取的睡眠信息)
router.post('/api/updateSleepAnalysis', (req, res, next) => {
  const postData = querystring.stringify({
    sleep_id: req.body.sleep_id,
    startTime: req.body.startTime,
    getupTime: req.body.getupTime,
    sleepTime: req.body.sleepTime,
    wakeTime: req.body.wakeTime,
    quality: req.body.quality,
    influence: req.body.influence
  })

  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/sleep/updateSleepAnalysis`,
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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
// 根据ID获取睡眠日报
router.post('/api/getAnalysisById', (req, res, next) => {
  const postData = querystring.stringify({sleep_id: req.body.sleep_id})

  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/sleep/getAnalysisById`,
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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
// 返回当前日期的睡眠记录数目(0或1)
router.post('/api/returnDaySize', (req, res, next) => {
  const postData = querystring.stringify({date: req.body.date})

  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/sleep/returnDaySize`,
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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
// 删除某条记录
router.post('/api/sleep/delete', (req, res, next) => {
  const postData = querystring.stringify({sleep_id: req.body.sleep_id})

  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/sleep/delete`,
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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
// 获取某一天的测量记录
router.post('/api/sleep/getByDay', (req, res, next) => {
  const postData = querystring.stringify({member_id: req.body.member_id, date: req.body.date})

  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/sleep/getByDay`,
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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
// 获取睡眠资讯
router.post('/api/getSleepInfo', (req, res, next) => {
  const postData = querystring.stringify({pageSize: req.body.pageSize,currentPage:req.body.currentPage})

  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/info/getSleepInfo`,
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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
//  获取健康资讯(血压,血糖,体重,体温,心电,血氧)
router.post('/api/getHealthInfo', (req, res, next) => {
  const postData = querystring.stringify({size: req.body.size, module: req.body.module, level: req.body.level})

  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/info/getInfo`,
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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
//  获得人物首页各健康模块显示的健康数据
router.post('/api/getHealthIndexInfo', (req, res, next) => {
  const postData = querystring.stringify({member_id: req.body.member_id})

  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/user/getHealthIndexInfo`,
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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
//  获取云平台上的关联用户
router.get('/api/getUHomeFamilyMember', (req, res, next) => {
  const postData = querystring.stringify({})

  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/user/getUHomeFamilyMember`,
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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
//  根据ID获取家庭成员信息
router.post('/api/checkMemberInfo', (req, res, next) => {
  const postData = querystring.stringify({member_id:req.body.member_id})

  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/user/getMemberById`,
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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
//  修改家庭成员
router.post('/api/changeMemberInfo', (req, res, next) => {
  console.log('changing:::::::::::::::::::::::,req',req.body);
  const postData = querystring.stringify(req.body)

  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/user/modifyMember`,
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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
//  修改家庭成员
router.post('/api/updateErrorFlag', (req, res, next) => {
  const postData = querystring.stringify(req.body)

  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/sleep/updateErrorFlag`,
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
        if (result.openId) {
          req.session.token = result.openId // 设置认证信息
        } // 设置认证信息
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
