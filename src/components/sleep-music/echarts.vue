<template>
    <div class='echarts'>
        <div class="button nearest" :class="{active:active==0}" @click='getdata(0)'>最近七次</div>
        <div class="button week" :class="{active:active==1}" @click='getdata(1)'>周</div>
        <div class="button month" :class="{active:active==2}" @click='getdata(2)'>月</div>
        <div class="button year" :class="{active:active==3}" @click='getdata(3)'>年</div>
        <div id='main' ref='echarts'>
        </div>
        <div class="legend">
            <span class='point sleepStartTime'></span>
            <span class='word1 word'>入睡时间</span>
            <span class='point wakeUpTime'></span>
            <span class='word2 word'>睡醒时间</span>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            getdata(index) {
                this.active = index;
            },
            nearestSeven() { //最近7次
                var that = this;
                this.$axios.get('/api/getByLastSeven').then(function() {}).catch(function() {
                    that.$axios.get('/static/testData/getByLastSeven.json').then(function(res) {
                        if (res.data.code === 'C0000') {
                            console.log(res.data.data);
                            that.setOptions();
                            that.myChart.setOption(that.option);
                        }
                    });
                })
            },
            thisWeek() { //本周
                var that = this;
                this.$axios.get('/api/getByWeek').then(function() {}).catch(function() {
                    that.$axios.get('/static/testData/getByWeek.json').then(function(res) {
                        if (res.data.code === 'C0000') {
                            console.log(res.data.data);
                             that.setOptions();
                            that.myChart.setOption(this.option);
                        }
                    });
                })
            },
            thisMonth() { //本月
            },
            thisYear() { //本年
            },
            getAxisFormatter(val, index) { //计算x轴坐标
                if (index == 0) {
                    return '周日'
                } else if (index == 1) {
                    return '周一'
                } else if (index == 2) {
                    return '周二'
                } else if (index == 3) {
                    return '周三'
                } else if (index == 4) {
                    return '周四'
                } else if (index == 5) {
                    return '周五'
                } else if (index == 6) {
                    return '周六'
                }
            },
            getAxisData() {
                var myDate = new Date(); //获取今天日期
                myDate.setDate(myDate.getDate() - 7);
                var dateArray = [];
                var dateTemp;
                var flag = 1;
                for (var i = 0; i < 7; i++) {
                    dateTemp = myDate.getFullYear() + '年' + (myDate.getMonth() + 1) + "月" + myDate.getDate() + '日';
                    dateArray.push(dateTemp);
                    myDate.setDate(myDate.getDate() + flag);
                }
                return dateArray;
            },
            setOptions() { //设置option
                this.option.series[0].data = this.sleepstarttimes;
                this.option.series[2].data = this.sleepstarttimes.map(function(item, index) {
                    return [index, item];
                })
                this.option.series[3].data = this.sleependtimes;
                this.option.series[1].data = this.sleeplengthtimes;
                this.option.xAxis.data=this.getAxisData();
            }
        },
        data() {
            var that = this;
            return {
                sleepstarttimes: [18, 20, 19, 22, 24, 21, 22],
                sleependtimes: [25.04, 26, 25, 32, 34, 35, 36],
                sleeplengthtimes: [8, 9, 7, 6, 8, 9, 6],
                active: 0,
                option: {
                    title: {
                        top: 15,
                        left: 18,
                        text: '趋势图',
                        sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5'
                    },
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: "#26A5FD",
                        textStyle: {
                            fontSize: 10
                        },
                        extraCssText: 'min-width:200px;',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: function(params) {
                            var tar;
                            if (params[1].value != '-') {
                                tar = params[1];
                            } else {
                                tar = params[0];
                            }
                            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value + '<span style="width:8px;height:8px;border-radius:50%;background:#2283E2;display:inline-block;margin:0 3px 0 10px;border:1px solid #fff;"></span>' + '12:30' + '<span style="width:8px;height:8px;border-radius:50%;background:#F5B616;display:inline-block;margin:0 3px 0 10px;border:1px solid #fff;"></span>' + '19:30';
                        }
                    },
                    grid: {
                        left: '1%',
                        right: '6%',
                        bottom: '15%',
                        top: '25%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        },
                        splitNumber: 7,
                        axisLabel: {
                            color: '#333',
                            formatter: that.getAxisFormatter
                        },
                        data: that.getAxisData()
                    },
                    yAxis: {
                        type: 'value',
                        splitNumber: 4,
                        interval: 8,
                        min: 8,
                        max: 40,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
                        axisLabel: {
                            color: '#333',
                            formatter: function(val, index) {
                                var num = (index + 1) * 8 % 48;
                                num = num > 24 ? 48 - num : num;
                                return num + '时'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: '#ccc'
                            }
                        }
                    },
                    series: [{ //起点
                            name: '入睡时间',
                            type: 'bar',
                            stack: '总量',
                            barWidth: 7, //柱图宽度
                            itemStyle: {
                                color: '#89CAF5',
                                borderColor: '',
                                normal: {
                                    barBorderColor: 'rgba(0,0,0,0)',
                                    color: 'rgba(0,0,0,0)'
                                },
                                emphasis: {
                                    barBorderColor: 'rgba(0,0,0,0)',
                                    color: 'rgba(0,0,0,0)'
                                }
                            },
                            data: []
                        },
                        { //终点
                            name: '睡眠', //时长
                            type: 'bar',
                            stack: '总量',
                            barWidth: 8, //柱图宽度
                            itemStyle: {
                                color: '#89CAF5'
                            },
                            label: {
                                normal: {
                                    show: false,
                                    position: 'top'
                                }
                            },
                            data: []
                        }, { //起点
                            name: '入睡', //时长
                            type: 'scatter',
                            itemStyle: {
                                color: '#2283E2',
                                borderColor: "#fff"
                            },
                            label: {
                                normal: {
                                    show: false,
                                    position: 'top'
                                }
                            },
                            symbolSize: 7,
                            data: [],
                        },
                        { //入睡时间
                            name: '睡醒', //
                            type: 'scatter',
                            itemStyle: {
                                color: '#F5B616',
                                borderColor: "#fff"
                            },
                            label: {
                                normal: {
                                    show: false,
                                    position: 'top'
                                }
                            },
                            symbolSize: 7,
                            data: [],
                        }
                    ]
                },
                myChart: ''
            }
        },
        mounted() {
            var that = this;
            var echarts = require('echarts');
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(document.getElementById('main'));
            // 绘制图表
            // myChart.setOption(this.option2);
            this.nearestSeven();
        }
    }
</script>

<style lang='scss' scoped>
    .echarts {
        width: 17rem;
        height: 17rem;
        background: #fff;
        position: relative;
        margin: auto;
        margin-top: 0.5rem;
        .button {
            z-index: 1000;
            position: absolute;
            width: 3.85rem;
            height: 1.25rem;
            border-radius: 1.5rem;
            border: 0.05rem solid #ccc;
            font-size: 0.6rem;
            text-align: center;
            line-height: 1.25rem;
            top: 2.4rem;
            &.active {
                color: #26a6ff;
                border: 1px solid #26a6ff;
            }
        }
        .nearest {
            left: 0.4rem;
        }
        .week {
            left: 4.5rem;
        }
        .month {
            left: 8.64rem;
        }
        .year {
            right: 0.4rem;
        }
        .legend {
            height: 1.8rem;
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
            border-top: 1px solid #eee;
            span {
                position: absolute;
                font-size: 0.6rem;
                font-family: 'PingFangSC-Regular';
                color: rgba(102, 102, 102, 1);
            }
            .point {
                width: 0.3rem;
                height: 0.3rem;
                top: 50%;
                transform: translate(0, -50%);
                border-radius: 50%;
            }
            .sleepStartTime {
                background: #2283E2;
                left: 4.6rem;
            }
            .wakeUpTime {
                background: #F5B616;
                right: 7.5rem;
            }
            .word {
                top: 50%;
                transform: translate(0, -50%)
            }
            .word1 {
                left: 5.5rem;
            }
            .word2 {
                right: 4.5rem;
            }
        }
        #main {
            width: 17rem;
            height: 17rem;
        }
    }
</style>