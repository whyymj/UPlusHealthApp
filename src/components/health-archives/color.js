export const sugar = { //血糖
    '1': {
        level: 1,
        status: '偏低',
        bg: '#5DA2C5'
    },
    '2': {
        level:2,
        status: '正常',
        bg: '#26A5FD'
    },
    '3': {
        level: 3,
        status: '稍高',
        bg: '#FF7E10'
    },
    '4': {
        level: 4,
        status: '偏高',
        bg: '#F65261'
    }
}
export const temperature = { //体温
    '1': {
        level: 1,
        status: '偏低',
        bg: '#5DA2C5'
    },
    '2': {
        level: 2,
        status: '正常',
        bg: '#26A5FD'
    },
    '3': {
        level: 3,
        status: '偏高',
        bg: '#F65261'
    }
}
export const heartEle = { //心电

    '1': {
        level: 1,
        status: '正常',
        bg: '#26A5FD'
    },
    '2': {
        level: 2,
        status: '异常',
        bg: '#FF7E10'
    }

}
export const oxy = { //血氧
    '1': {
        level: 1,
        status: '偏低',
        bg: '#5DA2C5'
    },
    '2': {
        level: 2,
        status: '正常',
        bg: '#26A5FD'
    },
    '3': {
        level: 3,
        status: '偏高',
        bg: '#F65261'
    }
}
export const pressure = { //血压
    '1': {
        level: 1,
        status: '低压',
        bg: '#5DA2C5'
    },
    '2': {
        level: 2,
        status: '正常',
        bg: '#26A5FD'
    },
    '3': {
        level: 3,
        status: '高压',
        bg: '#F65261'
    }
}
export const weight = { //体重
    '1': {
        level: 1,
        status: '偏瘦',
        bg: '#5DA2C5'
    },
    '2': {
        level: 2,
        status: '正常',
        bg: '#26A5FD'
    },
    '3': {
        level: 3,
        status: '偏胖',
        bg: '#FF7E10'
    },
    '4': {
        level: 4,
        status: '肥胖',
        bg: '#F65261'
    }
}
const healthItems = {
    sugar: {
        name: '血糖',
        standard: sugar
    },
    temperature: {
        name: '体温',
        standard: sugar
    },
    heartEle: {
        name: '心电',
        standard: sugar
    },
    oxy: {
        name: '血氧',
        standard: sugar
    },
    pressure: {
        name: '血压',
        standard: sugar
    },
    weight: {
        name: '体重',
        standard: sugar
    }
}