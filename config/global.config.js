module.exports = {
    // host: '10.159.46.28',
    // port: '80',
    // url: 'http://healthrecord.haier.net/healthRecordsB',
    url: 'http://123.103.113.201:8085/healthRecordsB', // app 免登录 URL 配置
    // host: '123.103.113.201:8085',
    host: '127.0.0.1',//95.118
    port: '8088',
    path: '/healthcare',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'originType': 'UHOME'
    }
}