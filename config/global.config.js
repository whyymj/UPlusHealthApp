module.exports = {
    // host: '10.159.46.28',
    // port: '80',
    // url: 'http://healthrecord.haier.net/healthRecordsB',
    url: 'http://10.130.95.125:8088/healthRecordsB', // app 免登录 URL 配置
    // host: '123.103.113.201:8085',
    host: '123.103.113.201',//95.118
    port: '8085',
    path: '/healthcare',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'originType': 'UHOME'
    },
    uploadimgAction:'http://123.103.113.201:8085/healthcare/upload/uploadPic'
    
}