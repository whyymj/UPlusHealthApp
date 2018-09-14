const sugar = { //血糖
    "0": {
        level: 0,
        status: '',
        bg: '#F7F7F7',
        tips: '还没数据，快去记录吧',
        unit: "mmol/L",
        icon: "icon-blood-sugar",
        color: '#A3D0FF'
    },
    '1': {
        level: 1,
        status: '最低',
        bg: '#2889B8',
        tips: '血糖最低，请注意',
        unit: "mmol/L",
        icon: "icon-blood-sugar",
        color: '#fff'
    },
    '2': {
        level: 2,
        status: '偏低',
        bg: '#5DA2C5',
        tips: '血糖偏低，请注意',
        unit: "mmol/L",
        icon: "icon-blood-sugar",
        color: '#fff'
    },
    '3': {
        level: 3,
        status: '正常',
        bg: '#26A5FD',
        tips: '血糖正常',
        unit: "mmol/L",
        icon: "icon-blood-sugar",
        color: '#fff'
    },
    '4': {
        level: 4,
        status: '稍高',
        bg: '#FF7E10',
        tips: '血糖稍高，请注意',
        unit: "mmol/L",
        icon: "icon-blood-sugar",
        color: '#fff'
    },
    '5': {
        level: 5,
        status: '偏高',
        bg: '#F65261',
        tips: '血糖偏高，请注意',
        unit: "mmol/L",
        icon: "icon-blood-sugar",
        color: '#fff'
    }
}
const sleep = { //睡眠
    "0": {
        level: 0,
        status: '',
        bg: '#F7F7F7',
        tips: '还没数据，快去记录吧',
        unit: "小时",
        icon: "ico-sleep_icon",
        color: '#A3D0FF'
    },
    '1': {
        level: 1,
        status: '偏少',
        bg: '#5DA2C5',
        tips: '睡眠偏少',
        unit: "小时",
        icon: "ico-sleep_icon",
        color: '#fff'
    },
    '2': {
        level: 2,
        status: '正常',
        bg: '#26A5FD',
        tips: '睡眠正常',
        unit: "小时",
        icon: "ico-sleep_icon",
        color: '#fff'
    },
    '3': {
        level: 3,
        status: '偏多',
        bg: '#FF7E10',
        tips: '睡眠偏多',
        unit: "小时",
        icon: "ico-sleep_icon",
        color: '#fff'
    }
}
const temperature = { //体温
    "0": {
        level: 0,
        status: '',
        bg: '#F7F7F7',
        tips: '还没数据，快去记录吧',
        unit: "℃",
        icon: "icon-temperature",
        color: '#A3D0FF'
    },
    '1': {
        level: 1,
        status: '偏低',
        bg: '#5DA2C5',
        tips: '体温偏低，请注意',
        unit: "℃",
        icon: "icon-temperature",
        color: '#fff'
    },
    '2': {
        level: 2,
        status: '正常',
        bg: '#26A5FD',
        tips: '体温正常',
        unit: "℃",
        icon: "icon-temperature",
        color: '#fff'
    },
    '3': {
        level: 3,
        status: '偏高',
        bg: '#F65261',
        tips: '体温偏高，请注意',
        unit: "℃",
        icon: "icon-temperature",
        color: '#fff'
    }
}
const heartEle = { //心电
    "0": {
        level: 0,
        status: '',
        bg: '#F7F7F7',
        tips: '还没数据，快去记录吧',
        unit: "/min",
        icon: "icon-ecg",
        color: '#A3D0FF'
    },
    '1': {
        level: 1,
        status: '正常',
        bg: '#26A5FD',
        tips: '心电正常',
        unit: "/min",
        icon: "icon-ecg",
        color: '#fff'
    },
    '2': {
        level: 2,
        status: '异常',
        bg: '#FF7E10',
        tips: '心电异常，请注意',
        unit: "/min",
        icon: "icon-ecg",
        color: '#fff'
    }

}
const oxy = { //血氧
    "0": {
        level: 0,
        status: '',
        bg: '#F7F7F7',
        tips: '还没数据，快去记录吧',
        unit: "%",
        icon: 'icon-oxygen',
        color: '#A3D0FF'
    },
    '1': {
        level: 1,
        status: '偏低',
        bg: '#5DA2C5',
        tips: '血氧偏低，请注意',
        unit: "%",
        icon: 'icon-oxygen',
        color: '#fff'
    },
    '2': {
        level: 2,
        status: '正常',
        bg: '#26A5FD',
        tips: '您的血氧正常',
        unit: "%",
        icon: 'icon-oxygen',
        color: '#fff'
    },
    '3': {
        level: 3,
        status: '偏高',
        bg: '#F65261',
        tips: '血氧偏高，请注意',
        unit: "%",
        icon: 'icon-oxygen',
        color: '#fff'
    }
}
const pressure = { //血压
    "0": {
        level: 0,
        status: '',
        bg: '#F7F7F7',
        tips: '还没数据，快去记录吧',
        unit: "mmHg",
        icon: 'icon-pressure',
        color: '#A3D0FF'
    },
    '1': {
        level: 1,
        status: '低压',
        bg: '#5DA2C5',
        tips: '血压偏低，请注意',
        unit: "mmHg",
        icon: 'icon-pressure',
        color: '#fff'
    },
    '2': {
        level: 2,
        status: '正常',
        bg: '#26A5FD',
        tips: '血压正常',
        unit: "mmHg",
        icon: 'icon-pressure',
        color: '#fff'
    },
    '3': {
        level: 3,
        status: '高压',
        bg: '#F65261',
        tips: '血压偏高，请注意',
        unit: "mmHg",
        icon: 'icon-pressure',
        color: '#fff'
    }
}
const weight = { //体重
    "0": {
        level: 0,
        status: '',
        bg: '#F7F7F7',
        tips: '还没数据，快去记录吧',
        unit: "KG",
        icon: 'icon-weight',
        color: '#A3D0FF'
    },
    '1': {
        level: 1,
        status: '消瘦',
        bg: '#2889B8',
        tips: '体重过轻,请注意',
        unit: "KG",
        icon: 'icon-weight',
        color: '#fff'
    },
    '2': {
        level: 2,
        status: '偏瘦',
        bg: '#5DA2C5',
        tips: '体重偏轻',
        unit: "KG",
        icon: 'icon-weight',
        color: '#fff'
    },
    '3': {
        level: 3,
        status: '正常',
        bg: '#26A5FD',
        tips: '体重正常',
        unit: "KG",
        icon: 'icon-weight',
        color: '#fff'
    },
    '4': {
        level: 4,
        status: '偏胖',
        bg: '#FF7E10',
        tips: '体重偏胖，请注意',
        unit: "KG",
        icon: 'icon-weight',
        color: '#fff'
    },
    '5': {
        level: 5,
        status: '肥胖',
        bg: '#F65261',
        tips: '体重过高，请注意',
        unit: "KG",
        icon: 'icon-weight',
        color: '#fff'
    }
}

export default function (name, level) {
    level = Math.abs(level)
    if (name == '血糖') {
        return sugar[level || 0];
    } else if (name == '体温') {
        return temperature[level || 0]
    } else if (name == '心电') {
        return heartEle[level || 0]
    } else if (name == '血氧') {
        return oxy[level || 0]
    } else if (name == '血压') {
        return pressure[level || 0]
    } else if (name == '体重') {
        return weight[level || 0]
    } else if (name == '睡眠') {
        return sleep[level || 0]
    } else {
        return {
            level: 0,
            status: '',
            bg: '#F7F7F7',
            tips: '',
            unit: "",
            icon: '',
            color: ''
        }
    }

}