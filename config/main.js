module.exports = {
    handle: function (obj) {
        switch (obj.code) {
            case 'C0000':
                obj.msg = '成功'
                break
            case 'U0001':
                obj.msg = '短信验证码包含非法字符,请核实短信验证码'
                break
            case 'U0002':
                obj.msg = '手机号码包含非法字符,请核实输入的手机号码'
                break
            case 'U0003':
                obj.msg = '登陆失败,未获取到登陆信息'
                break
            case 'U0004':
                obj.msg = '登陆失败'
                break
            case 'U0005':
                obj.msg = '密码不一致'
                break
            case 'U0006':
                obj.msg = '该手机号已注册'
                break
            case 'U0007':
                obj.msg = '手机号码不能为空'
                break
            case 'U0008':
                obj.msg = '手机号码必须为数字,请核实输入的手机号码'
                break
            case 'U0009':
                obj.msg = '昵称不能为空'
                break
            case 'U0010':
                obj.msg = '昵称包含非法字符,请核实'
                break
            case 'U0011':
                obj.msg = '性别不能为空'
                break
            case 'U0012':
                obj.msg = '出生日期不能为空'
                break
            case 'U0013':
                obj.msg = '身高不能为空'
                break
            case 'U0014':
                obj.msg = '体重不能为空'
                break
            case 'U0015':
                obj.msg = '新增用户失败'
                break
            case 'U0016':
                obj.msg = '修改用户失败'
                break
            case 'U0017':
                obj.msg = '未查询到用户信息'
                break
            case 'U0018':
                obj.msg = '家庭关系不能为空'
                break
            case 'U0019':
                obj.msg = '朋友的昵称不能为空'
                break
            case 'U0020':
                obj.msg = '添加家庭成员失败'
                break
            case 'U0021':
                obj.msg = '修改家庭成员失败'
                break
            case 'U0022':
                obj.msg = '删除家庭成员失败'
                break
            case 'U0023':
                obj.msg = '未查询到家庭成员信息'
                break
            case 'U0024':
                obj.msg = '关联用户手机号码不能为空'
                break
            case 'U0025':
                obj.msg = '该用户已经关联,请勿重复添加'
                break
            case 'C0002':
                obj.msg = '请求标识不能为空'
                break
            case 'C0003':
                obj.msg = '请求ID不能为空'
                break
            case 'C0004':
                obj.msg = '成员ID不能为空'
                break
            case 'C0005':
                obj.msg = '录入的数据异常,请检查核实'
                break
            case 'S0001':
                obj.msg = '缺少时间点,请检查'
                break
            case 'C0006':
                obj.msg = '系统忙，请稍后再试'
                break
            case 'P0001':
                obj.msg = '血压id不能为空'
                break
            case 'P0002':
                obj.msg = '录入的收缩压（高压）数据异常,请检查核实'
                break
            case 'P0003':
                obj.msg = '录入的舒张压（低压）数据异常,请检查核实'
                break
            case 'S0002':
                obj.msg = '血糖ID不能为空'
                break
            case 'S0003':
                obj.msg = '录入的血糖值异常,请检查'
                break
            case 'O0001':
                obj.msg = '血氧ID不能为空'
                break
            case 'T0001':
                obj.msg = '体温id不能为空'
                break
            case 'T0002':
                obj.msg = '录入的体温值数据异常,请核实'
                break
            case 'CA001':
                obj.msg = '心电ID不能为空'
                break
            case 'P0004':
                obj.msg = '录入的血压数据异常,请核实'
                break
            case 'CA002':
                obj.msg = '录入的心电编码异常,请核实'
                break
            case 'C0007':
                obj.msg = '请输入合理的检查ID'
                break
            case 'CA003':
                obj.msg = '解析心电图结果出错'
                break
            case 'U0026':
                obj.msg = '没有获取到登录信息,请重新登录'
                break
            case 'O0002':
                obj.msg = '录入的血氧数据异常,请核实'
                break
            case 'F0001':
                obj.msg = '请输入问题和意见'
                break
            case 'W0001':
                obj.msg = '体重指标不可为空'
                break
            case 'W0002':
                obj.msg = '指标类型不可为空'
                break
            case 'W0003':
                obj.msg = '指标类型必须为数字'
                break
            case 'W0004':
                obj.msg = '指标类型请填0~14之间的数字'
                break
            case 'W0005':
                obj.msg = '体脂ID不能为空'
                break
            case 'U0027':
                obj.msg = '密码不能为空'
                break
            default:
                obj.msg = ''
                break
        }
        console.log(`this is main.js: ${obj.openId}`)
        return obj
    }
}