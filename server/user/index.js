const express = require('express')
const router = express.Router()
const http = require('http')
const querystring = require('querystring')
const global = require('../../config/main')
const config = require('../../config/global.config')

// access_token 获取用户信息
router.post('/api/info', (req, res, next) => {
  const postData = querystring.stringify({
    code: req.body.code,
    redirect_url: req.body.url
  })
  const options = {
    host: config.host,
    port: config.port,
    method: 'POST',
    path: `${config.path}/user/checkOthersLogin`,
    headers: Object.assign(config.headers, {
      openId: '',
      loginCode: ''
    })
  }
  console.log(JSON.stringify(options))
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
        req.session.loginCode = result.data.login_code
        req.session.token = result.openId
        res.send(global.handle(result))
      } catch (e) {
        console.log(e.message)
      }
    })
  })
  _req.on('error', (e) => {
    console.error(`Whoops, something went wrong: ${e.message}`)
  })
  _req.write(postData)
  _req.end()
})
// tv端 扫码登录
router.post('/api/tv/login', (req, res, next) => {
  if (req.body.code === 'true') {
    // tv 扫码登录
    global.$_tv_h5_login = true
  } else {
    // 普通登录
    global.$_tv_h5_login = false
  }
  res.sendStatus(200).end()
})
router.get('/api/tv/login', (req, res, next) => {
  res.send({flag: global.$_tv_h5_login})
})
// 添加用户信息
router.post('/api/user', (req, res, next) => {
  const postData = querystring.stringify({
    height: req.body.height,
    weight: req.body.weight,
    sex: req.body.sex,
    birthday: req.body.birthday
  })

  const options = {
    host: config.host,
    port: config.port,
    method: 'POST',
    path: `${config.path}/user/addUserInfo`,
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
        req.session.token = result.openId
        res.send(global.handle(result))
      } catch (e) {
        console.log(e.message)
      }
    })
  })
  _req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`)
  })

  _req.write(postData)
  _req.end()
})
// 用户信息修改
router.post('/api/user/update', (req, res, next) => {
  const postData = querystring.stringify({
    height: req.body.height,
    weight: req.body.weight,
    sex: req.body.sex,
    birthday: req.body.birthday,
    target_weight: req.body.target_weight
  })

  const options = {
    host: config.host,
    port: config.port,
    method: 'POST',
    path: `${config.path}/user/modifyUserInfo`,
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
        req.session.token = result.openId
        res.send(global.handle(result))
      } catch (e) {
        console.log(e.message)
      }
    })
  })
  _req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`)
  })
  _req.write(postData)
  _req.end()
})
// 用户目标体重信息修改
router.post('/api/user/update/target', (req, res, next) => {
  const postData = querystring.stringify({
    target_weight: req.body.target_weight
  })

  const options = {
    host: config.host,
    port: config.port,
    method: 'POST',
    path: `${config.path}/user/modifyUserInfo`,
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
        req.session.token = result.openId
        res.send(global.handle(result))
      } catch (e) {
        console.log(e.message)
      }
    })
  })
  _req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`)
  })
  _req.write(postData)
  _req.end()
})
// 根据ID获取用户信息
router.post('/api/user/info', (req, res, next) => {
  if (req.body.phone === req.session.loginCode) {
    res.send({data: {msg: '不能关联自己!', resultcode: '-1'}})
  } else {
    const postData = querystring.stringify({
      user_id: req.body.phone ? req.body.phone : req.session.loginCode
    })
    const options = {
      host: config.host,
      port: config.port,
      path: `${config.path}/user/getUserById`,
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
          console.log(`响应中数据: ${JSON.stringify(result)}`)
          req.session.token = result.openId
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
  }
})
// 新增家庭成员
router.post('/api/member', (req, res, next) => {
  const postData = querystring.stringify({
    height: req.body.height,
    weight: req.body.weight,
    birthday: req.body.birthday,
    relation: req.body.relation
  })

  const options = {
    host: config.host,
    port: config.port,
    method: 'POST',
    path: `${config.path}/user/addMember`,
    headers: Object.assign(config.headers, {
      openId: req.session.token,
      loginCode: req.session.loginCode
    })
  }

  const _req = http.request(options, (_res) => {
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
        req.session.token = result.openId
        res.send(global.handle(result))
      } catch (e) {
        console.log(e.message)
      }
    })
  })
  _req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`)
  })
  _req.write(postData)
  _req.end()
})
// 修改家庭成员
router.post('/api/member/info', (req, res, next) => {
  const postData = querystring.stringify({
    member_id: req.body.member_id,
    target_weight: req.body.target_weight
  })

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
        console.log(`响应中数据: ${JSON.stringify(result)}`)
        req.session.token = result.openId
        res.send(global.handle(result))
      } catch (e) {
        console.log(e.message)
      }
    })
  })
  _req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`)
  })
  _req.write(postData)
  _req.end()
})
// 设置目标体重
router.post('/api/member/target', (req, res, next) => {
  const postData = querystring.stringify({
    member_id: req.body.member_id,
    target_weight: req.body.target_weight
  })

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
        console.log(`响应中数据: ${JSON.stringify(result)}`)
        req.session.token = result.openId
        res.send(global.handle(result))
      } catch (e) {
        console.log(e.message)
      }
    })
  })
  _req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`)
  })
  _req.write(postData)
  _req.end()
})
// 删除家庭成员
router.post('/api/member/delete', (req, res, next) => {
  const postData = querystring.stringify({
    memberList: req.body.memberList
  })
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/user/delMember`,
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
        console.log(`响应中数据: ${JSON.stringify(result)}`)
        req.session.token = result.openId
        res.send(global.handle(result))
      } catch (e) {
        console.log(e.message)
      }
    })
  })
  _req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`)
  })
  _req.write(postData)
  _req.end()
})
// 同意关联用户申请
router.post('/api/associate/agree', (req, res, next) => {
  const postData = querystring.stringify({
    send_user_code: req.body.code
  })
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.host}/user/agreeUserAssociatReq`,
    method: 'POST',
    headers: Object.assign(config.headers, {
      // TODO
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
        req.session.token = result.openId
        res.send(global.handle(result))
      } catch (e) {
        console.log(e.message)
      }
    })
  })
  _req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`)
  })
  _req.write(postData)
  _req.end()
})
// 申请用户关联
router.post('/api/associate', (req, res, next) => {
  const postData = querystring.stringify({
    receive_code: req.body.receive_code, // 目标用户ID
    association: req.body.association, // 用户关系
    message: req.body.message // 请求发送信息
  })
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/user/createNewAssociatReq`,
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
        console.log(`响应中数据: ${JSON.stringify(result)}`)
        req.session.token = result.openId
        res.send(global.handle(result))
      } catch (e) {
        console.log(e.message)
      }
    })
  })
  _req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`)
  })
  _req.write(postData)
  _req.end()
})
// 获取可以申请的家庭关系
router.get('/api/relation', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/user/getRelationList`,
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
        req.session.token = result.openId
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
// 根据ID获取家庭成员信息
router.get('/api/member', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/user/getMemberById?member_id=${req.query.member_id}`,
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
        req.session.token = result.openId
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
// 获取用户下的所有家庭成员和关联成员
router.get('/api/family', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/user/getFamilyList`,
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
        req.session.token = result.openId
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
router.get('/api/health/status', (req, res, next) => {
  const options = {
    host: config.host,
    port: config.port,
    path: `${config.path}/user/getHealthProStatus?member_id=${req.query.member_id}`,
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
        req.session.token = result.openId
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
