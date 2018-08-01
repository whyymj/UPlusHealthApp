const serverUrl = '/api'||'http://10.130.93.182:9020/healthcare'
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
}

export const getMemberById = {//2.1.2.6 根据ID获取家庭成员信息
    method: 'get',
    url: serverUrl + '/user/getMemberById',
    data: {
        member_id: ''
    },
    headers
}


export const getHealthPro = {
    method: 'get',
    url: serverUrl + '/user/getHealthPro',
    data: {
        member_id: ''
    },
    headers
}

export const addUserInfo={
    method: 'get',
    url: serverUrl + '/user/addUserInfo',
    data: {
        nick_name: '',
        sex:"",
        height:"",
        weight:"",
        birthday:"",
        head_pic:"",
        disease:"",
        allergy:""

    },headers
}