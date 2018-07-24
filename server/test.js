// const OCRAD = require('ocrad.js')
// const Canvas = require('canvas')
// const path = require('path')
// const Image = Canvas.Image
// const fs = require('fs')

// fs.readFile(path.join(__dirname, '/numbers.png'), (err, src) => {
//   if (err) {
//     throw err
//   }
//   const img = new Image()
//   img.src = src
//   const canvas = new Canvas(img.width, img.height)
//   const ctx = canvas.getContext('2d')
//   ctx.drawImage(img, 0, 0, img.width, img.height)
//   console.log(OCRAD(canvas))
// })

var cookieSession = require('cookie-session')
var express = require('express')

var app = express()

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.get('/', function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {}
  }
  // Update views
  req.session.views['/foo'] = (req.session.views['/foo'] || 0) + 1

  // Write response
  console.log(req.session.views['/foo'])
  res.end(req.session.views['/foo'] + ' views')
})

app.listen(3000)
