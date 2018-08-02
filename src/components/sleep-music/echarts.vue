<template>
    <div class='echarts'>
        <div id='main' ref='echarts'>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                color: 0,
                option: {
                    title: {
                        text: '趋势图',
                        sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5'
                    },
                    tooltip: {
                        trigger: 'axis',
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
                            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
                        }
                    },
                    legend: {
                        data: ['支出', '收入']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        splitLine: {
                            show: false
                        },
                        data: function() {
                            var list = [];
                            for (var i = 1; i <= 7; i++) {
                                list.push('周' + i);
                            }
                            return list;
                        }()
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{ //起点
                            name: '入睡时间',
                            type: 'bar',
                            stack: '总量',
                            // barWidth: 10, //柱图宽度
                            itemStyle: {
                                normal: {
                                    barBorderColor: 'rgba(0,0,0,0)',
                                    color: 'rgba(0,0,0,0)'
                                },
                                emphasis: {
                                    barBorderColor: 'rgba(0,0,0,0)',
                                    color: 'rgba(0,0,0,0)'
                                }
                            },
                            data: [18, 20, 19, 22, 24, 21, 22]
                        },
                        { //终点
                            name: '睡醒时间',
                            type: 'bar',
                            stack: '总量',
                            barWidth: 10, //柱图宽度
                            itemStyle: {
                                normal: {
                                    color: 'rgba(221,221,221,1)'
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: [8, 9, 7, 6, 8, 9, 6]
                        }
                    ]
                },
                option2: {
                    xAxis: {
                        
                    },
                    yAxis: { min:0,
                        max:48},
                    series: [{
                        symbolSize: 20,
                        itemStyle: {
                            normal: {
                                color: 'red green'
                            }
                        },
                        data: [
                            [0, 8.04],
                            [1, 6.95],
                            [2, 7.58],
                            [3, 8.81],
                            [4, 8.33],
                            [5, 9.96],
                            [6, 7.24],
                            // [0, 4.04],
                            // [1, 2.95],
                            // [2, 3.58],
                            // [3, 10.81],
                            // [4, 11.33],
                            // [5, 7.96],
                            // [6, 1.24]
                        ],
                        type: 'scatter'
                    }]
                },
            }
        },
        mounted() {
            var echarts = require('echarts');
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
            // 绘制图表
            myChart.setOption(this.option);
            // myChart.setOption(this.option2);
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
        #main {
            width: 17rem;
            height: 17rem;
        }
    }
</style>