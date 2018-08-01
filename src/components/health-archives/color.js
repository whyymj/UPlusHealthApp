const sugar = { //血糖
    "0": {
        level: 0,
        status: '',
        bg: '#F7F7F7',
        tips: '还没数据，快去记录吧',
        unit:"mmol/L",
        icon:"icon-blood-sugar",
        color:'#A3D0FF'
    },
    '1': {
        level: 1,
        status: '偏低',
        bg: '#5DA2C5',
        tips: '您的血糖偏低，建议就医检查',
        unit:"mmol/L",
        icon:"icon-blood-sugar",
        color:'#fff'
    },
    '2': {
        level: 2,
        status: '正常',
        bg: '#26A5FD',
        tips: '您的血糖正常',
        unit:"mmol/L",
        icon:"icon-blood-sugar",
        color:'#fff'
    },
    '3': {
        level: 3,
        status: '稍高',
        bg: '#FF7E10',
        tips: '您的血糖稍高，建议控制饮食',
        unit:"mmol/L",
        icon:"icon-blood-sugar",
        color:'#fff'
    },
    '4': {
        level: 4,
        status: '偏高',
        bg: '#F65261',
        tips: '您的血糖偏高，建议就医检查',
        unit:"mmol/L",
        icon:"icon-blood-sugar",
        color:'#fff'
    }
}
const sleep = { //睡眠
    "0": {
        level: 0,
        status: '',
        bg: '#F7F7F7',
        tips: '还没数据，快去记录吧',
        unit:"小时",
        icon:"icon-blood-sugar",
        color:'#A3D0FF'
    },
    '1': {
        level: 1,
        status: '偏少',
        bg: '#5DA2C5',
        tips: '您的睡眠偏少',
        unit:"小时",
        icon:"icon-blood-sugar",
        color:'#fff'
    },
    '2': {
        level: 2,
        status: '正常',
        bg: '#26A5FD',
        tips: '您的睡眠正常',
        unit:"小时",
        icon:"icon-blood-sugar",
        color:'#fff'
    },
    '3': {
        level: 3,
        status: '偏多',
        bg: '#FF7E10',
        tips: '您的睡眠偏多',
        unit:"小时",
        icon:"icon-blood-sugar",
        color:'#fff'
    }
}
const temperature = { //体温
    "0": {
        level: 0,
        status: '',
        bg: '#F7F7F7',
        tips: '还没数据，快去记录吧',
        unit:"℃",
        icon:"icon-temperature",
        color:'#A3D0FF'
    },
    '1': {
        level: 1,
        status: '偏低',
        bg: '#5DA2C5',
        tips: '您的体温偏低，建议就医检查',
        unit:"℃",
        icon:"icon-temperature",
        color:'#fff'
    },
    '2': {
        level: 2,
        status: '正常',
        bg: '#26A5FD',
        tips: '您的体温正常',
        unit:"℃",
        icon:"icon-temperature",
        color:'#fff'
    },
    '3': {
        level: 3,
        status: '偏高',
        bg: '#F65261',
        tips: '您的体温偏高，建议就医检查',
        unit:"℃",
        icon:"icon-temperature",
        color:'#fff'
    }
}
const heartEle = { //心电
    "0": {
        level: 0,
        status: '',
        bg: '#F7F7F7',
        tips: '还没数据，快去记录吧',
        unit:"/min",
        icon:"icon-ecg",
        color:'#A3D0FF'
    },
    '1': {
        level: 1,
        status: '正常',
        bg: '#26A5FD',
        tips: '您的心电正常',
        unit:"/min",
        icon:"icon-ecg",
        color:'#fff'
    },
    '2': {
        level: 2,
        status: '异常',
        bg: '#FF7E10',
        tips: '您的心电异常，建议就医检查',
        unit:"/min",
        icon:"icon-ecg",
        color:'#fff'
    }

}
const oxy = { //血氧
    "0": {
        level: 0,
        status: '',
        bg: '#F7F7F7',
        tips: '还没数据，快去记录吧',
        unit:"%",
        icon:'icon-oxygen',
        color:'#A3D0FF'
    },
    '1': {
        level: 1,
        status: '偏低',
        bg: '#5DA2C5',
        tips: '您的血氧偏低，建议就医检查',
        unit:"%",
        icon:'icon-oxygen',
        color:'#fff'
    },
    '2': {
        level: 2,
        status: '正常',
        bg: '#26A5FD',
        tips: '您的血氧正常',
        unit:"%",
        icon:'icon-oxygen',
        color:'#fff'
    },
    '3': {
        level: 3,
        status: '偏高',
        bg: '#F65261',
        tips: '您的血氧偏高，建议就医检查',
        unit:"%",
        icon:'icon-oxygen',
        color:'#fff'
    }
}
const pressure = { //血压
    "0": {
        level: 0,
        status: '',
        bg: '#F7F7F7',
        tips: '还没数据，快去记录吧',
        unit:"mmHg",
        icon:'icon-pressure',
        color:'#A3D0FF'
    },
    '1': {
        level: 1,
        status: '低压',
        bg: '#5DA2C5',
        tips: '您的血压偏低，建议就医检查',
        unit:"mmHg",
        icon:'icon-pressure',
        color:'#fff'
    },
    '2': {
        level: 2,
        status: '正常',
        bg: '#26A5FD',
        tips: '您的血压正常',
        unit:"mmHg",
        icon:'icon-pressure',
        color:'#fff'
    },
    '3': {
        level: 3,
        status: '高压',
        bg: '#F65261',
        tips: '您的血压偏高，建议就医检查',
        unit:"mmHg",
        icon:'icon-pressure',
        color:'#fff'
    }
}
const weight = { //体重
    "0": {
        level: 0,
        status: '',
        bg: '#F7F7F7',
        tips: '还没数据，快去记录吧',
        unit:"KG",
        icon:'icon-weight',
        color:'#A3D0FF'
    },
    '1': {
        level: 1,
        status: '偏瘦',
        bg: '#5DA2C5',
        tips: '您的体重偏轻，可以适当增加营养',
        unit:"KG",
        icon:'icon-weight',
        color:'#fff'
    },
    '2': {
        level: 2,
        status: '正常',
        bg: '#26A5FD',
        tips: '您的体重正常，请保持',
        unit:"KG",
        icon:'icon-weight',
        color:'#fff'
    },
    '3': {
        level: 3,
        status: '偏胖',
        bg: '#FF7E10',
        tips: '您的体重偏胖，请注意控制体重',
        unit:"KG",
        icon:'icon-weight',
        color:'#fff'
    },
    '4': {
        level: 4,
        status: '肥胖',
        bg: '#F65261',
        tips: '您的体重过高，请注意控制体重',
        unit:"KG",
        icon:'icon-weight',
        color:'#fff'
    }
}

export default function (name, level) {
    if (name == '血糖') {
        return sugar[level];
    } else if (name == '体温') {
        return temperature[level]
    } else if (name == '心电') {
        return heartEle[level]
    } else if (name == '血氧') {
        return oxy[level]
    } else if (name == '血压') {
        return pressure[level]
    } else if (name == '体重') {
        return weight[level]
    } else if (name == '睡眠') {
        return sleep[level]
    }else{
        return {
            level: 0,
            status: '',
            bg: '#F7F7F7',
            tips: '',
            unit:"",
            icon:'',
            color:''
        }
    }

}