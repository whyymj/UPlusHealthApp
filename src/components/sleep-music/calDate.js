/**
 * 获取当月全部日期
 * @param {} year
 * @param {*} month
 */
var _ = require('lodash');
function getMonthDate(year, month) {
    var firstDay = new Date(year, month - 1, 1);
    var lastDay = new Date(year, month, 0);
    var firday = firstDay.getDate();
    var lasday = lastDay.getDate();
    var date = [];
    for (var i = firday; i <= lasday; i++) {
        date.push({
            year: year,
            month: month,
            date: i,
            day: new Date(year, month - 1, i).getDay()
        });
    }
    return date;
}
function getLastMonth(year, month) {
    var lastmonth = {};
    if (month == 1) {
        lastmonth = {
            year: year - 1,
            month: 12
        }
    } else {
        lastmonth = {
            year: year,
            month: month - 1
        }
    }
    return getMonthDate(lastmonth.year, lastmonth.month)
}
function getNextMonth(year, month) {
    var nextmonth = {};
    if (month == 12) {
        nextmonth = {
            year: year + 1,
            month: 1
        }
    } else {
        nextmonth = {
            year: year,
            month: month + 1
        }
    }
    return getMonthDate(nextmonth.year, nextmonth.month)
}
export default function (year, month) {

    var curMonth = getMonthDate(year, month);
    var lastMonth = getLastMonth(year, month);
    var nextMonth = getNextMonth(year, month);
    var curFirDay = curMonth[0].day;

    var tmp = [];
    if (curFirDay > 0) {
        tmp = lastMonth.slice(-curFirDay);
    }
    curMonth = tmp.concat(curMonth);
    var curlen = curMonth.length;
    for (var i = 0; i < 42 - curlen; i++) {
        curMonth.push(nextMonth[i])
    }
    
    return _.chunk(curMonth,7);
}