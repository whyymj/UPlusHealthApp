<template>
    <div class='wh_datepicker'>
        <div style='overflow:hidden;padding-top:0.5rem;padding-bottom:0.5rem;' v-if="hidetop!='true'">
            <div class='selector' style='padding:0 2% 0 3%;'>
                <el-select v-model="year" placeholder="请选择" @change='getYear'>
                    <el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class='selector' style='padding:0 3% 0 2%;'>
                <el-select v-model="month" placeholder="请选择" @change='getMonth'>
                    <el-option v-for="item in months" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <table id="calendar">
            <thead class='title'>
                <tr>
                    <td>日</td>
                    <td>一</td>
                    <td>二</td>
                    <td>三</td>
                    <td>四</td>
                    <td>五</td>
                    <td>六</td>
                </tr>
            </thead>
            <tbody class='body'>
                <tr v-if='showThisWeek'>
                    <td v-for='(val,key) in thisWeekDates' :key='key' @click='selectdate(-1,key,val)'><span class='havedata' v-if='haveDataDays.indexOf(hasRecord(val))!=-1'></span><span class='today' :class='{active:activeTd(val)}' v-if='isToday(val)'>今天</span><span :class='{active:activeTd(val)}' >{{val.date}}</span></td>
                </tr>
                <tr v-for='(item,index) in datepicker' :key='index' v-else>
                    <td v-for='(val,key) in item' :key='key' @click='selectdate(index,key,val)'><span class='havedata' v-if='haveDataDays.indexOf(hasRecord(val))!=-1'></span><span class='today' :class='{active:activeTd(val)}' v-if='isToday(val)'>今天</span><span :class='{active:activeTd(val)}' :style="{opacity:opacity(val)}">{{val.date}}</span></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import caldate from "../sleep-music/calDate.js";
    import bus from '../eventbus.js';
    export default {
        props: ['hidetop', 'flag'],
        data() {
            return {
                showThisWeek: true,
                thisWeekDates: [],
                selectedDate: '',
                haveDataDays: [],
                month: "",
                year: "",
                date: "",
                years: [],
                months: [],
                datepicker: [],
                datarecord: [],
                today: "",
                selected: []
            };
        },
        computed: {},
        methods: {
            isToday(item) {
                var arr = this.today.split("-");
                if (arr[0] * 1 == item.year * 1 && arr[1] * 1 == item.month * 1 && arr[2] * 1 == item.date * 1) {
                    return true;
                }
                return false;
            },
            hasRecord(item) {
                var that = this;
                var str = '';
                str = item.year + '-' + (item.month > 9 ? item.month : ('0' + item.month)) + '-' + (item.date > 9 ? item.date : '0' + item.date);
                return str
            },
            update() {
                this.datepicker = caldate(this.year, this.month);
            },
            selectdate(index, key, val) {
                var tmp = new Date('' + val.year + '/' + val.month + '/' + val.date);
                if (tmp.getTime() <= new Date().getTime()) {
                    this.selected = [val.year * 1, val.month * 1, val.date * 1];
                    bus.$emit('autoShrink');
                    this.$emit('checkDateData', val);
                }
            },
            getYear(data) {
                this.year = data;
                this.update();
            },
            getMonth(data) {
                this.month = data;
                this.update();
            },
            getThisWeek() {
                this.thisWeekDates = [];
                var now = new Date(); //当前日期 
                var nowDayOfWeek = now.getDay(); //今天本周的第几天 
                var nowDay = now.getDate(); //当前日 
                var nowMonth = now.getMonth(); //当前月 
                var nowYear = now.getFullYear(); //当前年 
                function formatDate(date) {
                    var myyear = date.getFullYear();
                    var mymonth = date.getMonth() + 1;
                    var myweekday = date.getDate();
                    if (mymonth < 10) {
                        mymonth = "0" + mymonth;
                    }
                    if (myweekday < 10) {
                        myweekday = "0" + myweekday;
                    }
                    return {
                        year: myyear,
                        month: mymonth,
                        date: myweekday,
                        day: date.getDay()
                    };
                }
                var date, tmpArr = [];
                for (var i = 0; i < 7; i++) {
                    date = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + i);
                    tmpArr.push(formatDate(date))
                }
                this.thisWeekDates = tmpArr;
            },
            activeTd(val) {
                if (val.year * 1 == this.selected[0] && val.month * 1 == this.selected[1] && val.date * 1 == this.selected[2]) {
                    return true
                }
                return false;
            },
            opacity(val) {
                var tmp = new Date('' + val.year + '/' + val.month + '/' + val.date);
                return (val.year == this.year && val.month == this.month && tmp.getTime() <= new Date().getTime()) ? 1 : 0.5
            }
        },
        mounted() {
            var date = new Date();
            var that = this;
            this.getThisWeek();//收缩状态下显示本周的日期
            bus.$on('onlyShowThisWeek', function() {
                that.showThisWeek = true
            });
            bus.$on('showSelectedDate', function() {
                that.showThisWeek = false;
            });
            this.year = date.getFullYear();
            this.month = date.getMonth() + 1;
            this.date = date.getDate();
            this.today = "" + this.year + "-" + this.month + "-" + this.date;
            this.datepicker = caldate(2018, this.month);
            for (var i = 0; i < 12; i++) {
                this.months.push({
                    value: i + 1,
                    label: i + 1 + "月"
                });
            }
            var date = new Date().getFullYear();
            for (var i = 1970; i <= date; i++) {
                this.years.push({
                    value: i + 1,
                    label: i + 1 + "年"
                });
            }
            this.$axios.get('/api/health/list?begin=1970-01-01&end=' + that.year + '-' + (that.month > 9 ? that.month : '0' + that.month) + '-' + (that.date > 9 ? that.date : '0' + that.date) + '&flag=' + (that.flag || 1) + '&member_id=' + window._member_id, { //获取睡眠模块某个时间段有数据记录的时间序列
                begin: '1970-01-01',
                end: that.year + '-' + (that.month > 9 ? that.month : '0' + that.month) + '-' + (that.date > 9 ? that.date : '0' + that.date),
                flag: that.flag || 1,
                member_id: window._member_id
            }).then(function(res) {
                if (res.data.code == 'C0000') {
                    that.haveDataDays = res.data.data.date_list;
                }
            }).catch(function() {
                if (process.env.NODE_ENV == 'development') {
                    that.$axios.get('/static/testData/sleeGetExistDateList.json').then(function(res) {
                        if (res.data.code == 'C0000') {
                            that.haveDataDays = res.data.data.date_list;
                        }
                    })
                }
            })
        }
    };
</script>

<style lang='scss'>
    .wh_datepicker {
        .ic__header,
        .ic__next,
        .ic__prev,
        .ic__month-select,
        .ic__year-select {
            background: #fff;
            text-align: center;
        }
        .selector {
            width: 50%;
            box-sizing: border-box;
            float: left;
        }
        .el-select {
            width: 100%;
        }
        #calendar {
            width: 100%; // height: 12rem;
            tr {
                height: 2rem;
            }
            td {
                position: relative;
                text-align: center;
                line-height: 2rem;
                height: 2rem;
                font-size: 0.7rem;
                width: 14%;
                font-family: "PingFangSC-Semibold";
                color: rgba(33, 33, 33, 1);
                font-weight: 600;
            }
            .havedata {
                position: absolute;
                width: 0.4rem;
                height: 0.4rem;
                background: rgba(38, 165, 253, 1);
                border-radius: 50%;
                box-shadow: 0 0 0.2rem rgba(38, 165, 253, 1);
                bottom: 0.1rem;
                left: 0;
                right: 0;
                margin: auto;
                z-index: 100;
            }
            .today {
                background: #fff;
                position: absolute;
                width: 1.9rem;
                height: 1.9rem;
                box-sizing: border-box;
                border: 1px solid rgba(38, 165, 253, 1);
                color: rgba(38, 165, 253, 1);
                text-align: center;
                font-size: 0.7rem;
                font-family: "PingFangSC-Regular";
                line-height: 1.9rem;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                border-radius: 50%;
            }
            .active {
                position: absolute;
                box-sizing: border-box;
                width: 1.8rem;
                height: 1.8rem;
                background: rgba(38, 165, 253, 1);
                text-align: center;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                border-radius: 50%;
                color: #fff;
            }
        }
        .el-input {
            height: 2rem;
            line-height: 2rem;
        }
    }
</style>