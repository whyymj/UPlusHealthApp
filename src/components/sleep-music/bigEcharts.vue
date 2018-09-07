<template>
	<div class='echarts'>
		<div class="button nearest" :class="{active:active==0}" @click='getdata(0)'>最近七次</div>
		<div class="button week" :class="{active:active==1}" @click='getdata(1)'>周</div>
		<div class="button month" :class="{active:active==2}" @click='getdata(2)'>月</div>
		<div class="button year" :class="{active:active==3}" @click='getdata(3)'>年</div>
		<div id='main2' ref='echarts'>
		</div>
		<div class="legend">
			<span class='point sleepStartTime'></span>
			<span class='word1 word'>入睡时间</span>
			<span class='point wakeUpTime'></span>
			<span class='word2 word'>睡醒时间</span>
		</div>
		<img class='scale' src="/static/sleepMusicList/scale.png" alt="" @click='scaleEcharts'>
	</div>
</template>

<script>
	export default {
		methods: {
			scaleEcharts() {
				this.$emit('showbig')
			},
			dealtime(time) { //将时间字符串化为小数
				if (time) {
					var t = time.split(':');
					var h = t[0] * 1;
					var m = t[1] / 60;
					return h + m;
				} else {
					return NaN
				}
			},
			fillThisWeekArr(arr) { //用于填充数组两个时间之间的空白
				var a, b;
				var len = arr.length;
				for (var i = 0; i < len - 1; i++) {
					a = arr[i];
					b = arr[i + 1];
					for (var j = 0; j < b.date - a.date - 1; j++) {
						arr.splice(i + 1, 0, {
							"sleepTime": "",
							"wakeTime": "",
							"sleepTimeLang": ""
						})
					}
					len = arr.length;
				}
				return arr;
			},
			getdata(index) {
				this.sleepstarttimes = [];
				this.sleependtimes = [];
				this.sleeplengthtimes = [];
				this.active = index;
				window.sleep_charts_active = index;
				var that = this;
				if (index == 0) { //最近7次
					this.nearestSeven();
				} else if (index == 1) { //本周
					this.option.yAxis = {
						type: 'category',
						inverse: true,
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
							rotate: -90,
							color: '#333',
							formatter: that.getAxisFormatter
						},
						data: that.getAxisData()
					}
					this.thisWeek();
				} else if (index == 2) { //本月
					var year = new Date().getFullYear();
					var month = (new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1);
					var len = new Date(year, month, 0).getDate();
					var dateArray = [];
					var dateTemp;
					for (var i = 1; i <= len; i++) {
						dateTemp = year + '年' + month + "月" + (i > 9 ? i : '0' + i) + '日';
						dateArray.push(dateTemp);
					}
					window.sleep_xaxis_arr = dateArray;
					this.option.yAxis = {
						type: 'category',
						inverse: true,
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
						splitNumber: len,
						axisLabel: {
							color: '#333',
							rotate: -90,
							formatter: function(item, index) {
								return index + 1 + '日'
							}
						},
						data: function() {
							var dateArray = [];
							var dateTemp;
							var flag = 1;
							for (var i = 1; i <= len; i++) {
								dateTemp = year + '年' + month + "月" + (i > 9 ? i : '0' + i) + '日';
								dateArray.push(dateTemp);
							}
							return dateArray;
						}()
					}
					this.thisMonth();
				} else if (index == 3) { //本年
					var date = new Date();
					var year = date.getFullYear();
					function getMonthDate(year, month) {
						var firstDay = new Date(year, month - 1, 1);
						var lastDay = new Date(year, month, 0);
						var firday = firstDay.getDate() > 9 ? firstDay.getDate() : '0' + firstDay.getDate();
						var lasday = lastDay.getDate() > 9 ? lastDay.getDate() : '0' + lastDay.getDate();
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
					var len = ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) ? 366 : 365;
					var dateTemp;
					var dateArray = [];
					var monthlength = [],
						monthlimit = [];
					var tmp;
					! function() {
						for (var i = 1; i <= 12; i++) {
							tmp = getMonthDate(year, i);
							tmp.map(function(item) {
								dateTemp = year + '年' + (i > 9 ? i + '月' : '0' + i + '月') + item.date + '日';
								dateArray.push(dateTemp)
							});
							monthlength[i - 1] = tmp.length;
						}
					}();
					for (var i = 1; i <= 12; i++) {
						monthlimit[i - 1] = 0;
						for (var j = 0; j < i; j++) {
							monthlimit[i - 1] = monthlimit[i - 1] + monthlength[j];
						}
					}
					this.option.yAxis.splitNumber = 12;
					this.option.yAxis.axisLabel.formatter = function(val, index) {
						return val.split('年')[1]
					}
					this.option.yAxis.axisLabel.rotate = -90;
					this.option.yAxis.data = dateArray;
					this.thisYear();
				}
			},
			nearestSeven() { //最近7次
				var that = this;
				this.$axios.post('/api/getByLastSeven').then(function(res) {
					if (res.data.code === 'C0000') {
						var list = res.data.data.map(function(item, index) {
							var newitem = item;
							newitem.date = new Date(item.create_date.replace('-', '/')).getTime();
							return newitem;
						}).sort(function(a, b) {
							return a.date - b.date;
						});
						var formate = list.map(function(item, index) {
							var arr = item.create_date.split('-')
							return arr[1] + '月' + arr[2] + '日';
						});
						that.option.yAxis = {
							type: 'category',
							inverse: true,
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
							splitNumber: list.length,
							axisLabel: {
								color: '#333',
								rotate: -90,
								formatter: function(item, index) {
									return formate[index]
								}
							},
							data: ''
						}
						that.sleeplengthtimes = list.map(function(item, index) {
							that.sleepstarttimes.push(that.dealtime(item.sleepTime));
							that.sleependtimes.push(that.dealtime(item.wakeTime) + 24);
							return (item.sleepTimeLang / 60).toFixed(1);
						});
						var year = new Date().getFullYear();
						window.sleep_xaxis_arr = formate.map(function(item) {
							return year + '年' + item;
						});
						that.setOptions();
						that.myChart.setOption(that.option);
					}
				}).catch(function() {
					if (process.env.NODE_ENV == 'development') {
						that.$axios.get('/static/testData/getByLastSeven.json').then(function(res) {
							if (res.data.code === 'C0000') {
								var list = res.data.data.map(function(item, index) {
									var newitem = item;
									newitem.date = new Date(item.create_date.replace('-', '/')).getTime();
									return newitem;
								}).sort(function(a, b) {
									return a.date - b.date;
								});
								var formate = list.map(function(item, index) {
									var arr = item.create_date.split('-')
									return arr[1] + '月' + arr[2] + '日';
								});
								that.option.yAxis = {
									type: 'category',
									inverse: true,
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
									splitNumber: list.length,
									axisLabel: {
										color: '#333',
										rotate: -90,
										formatter: function(item, index) {
											return formate[index]
										}
									},
									data: ''
								}
								that.sleeplengthtimes = list.map(function(item, index) {
									that.sleepstarttimes.push(that.dealtime(item.sleepTime));
									that.sleependtimes.push(that.dealtime(item.wakeTime) + 24);
									return (item.sleepTimeLang / 60).toFixed(1);
								});
								var year = new Date().getFullYear();
								window.sleep_xaxis_arr = formate.map(function(item) {
									return year + '年' + item;
								});
								that.setOptions();
								that.myChart.setOption(that.option);
							}
						});
					}
				})
			},
			thisWeek() { //本周
				var that = this;
				this.$axios.post('/api/sleep/getByWeek').then(function(res) {
					if (res.data.code === 'C0000') {
						var list = res.data.data.map(function(item, index) {
							var newitem = item;
							newitem.date = new Date(item.create_date.replace('-', '/')).getDay() - 1;
							if (newitem.date == -1) {
								newitem.date = 6;
							}
							return newitem;
						}).sort(function(a, b) {
							return a.date - b.date;
						});
						list = that.fillThisWeekArr(list);
						that.sleeplengthtimes = list.map(function(item, index) {
							that.sleepstarttimes.push(that.dealtime(item.sleepTime));
							that.sleependtimes.push(that.dealtime(item.wakeTime) + 24);
							return (item.sleepTimeLang / 60).toFixed(1);
						});
						that.setOptions();
						that.myChart.setOption(that.option);
					}
				}).catch(function() {
					if (process.env.NODE_ENV == 'development') {
						that.$axios.get('/static/testData/getByWeek.json').then(function(res) {
							if (res.data.code === 'C0000') {
								var list = res.data.data.map(function(item, index) {
									var newitem = item;
									newitem.date = new Date(item.create_date.replace('-', '/')).getDay() - 1;
									if (newitem.date == -1) {
										newitem.date = 6;
									}
									return newitem;
								}).sort(function(a, b) {
									return a.date - b.date;
								});
								list = that.fillThisWeekArr(list);
								that.sleeplengthtimes = list.map(function(item, index) {
									that.sleepstarttimes.push(that.dealtime(item.sleepTime));
									that.sleependtimes.push(that.dealtime(item.wakeTime) + 24);
									return (item.sleepTimeLang / 60).toFixed(1);
								});
								that.setOptions();
								that.myChart.setOption(that.option);
							}
						});
					}
				})
			},
			thisMonth() { //本月
				var that = this;
				var date = new Date();
				var that = this;
				this.year = date.getFullYear();
				this.month = date.getMonth() + 1;
				this.date = date.getDate();
				this.$axios.post('/api/sleeGetExistDateList', {
					begin_date: this.year + (this.month > 9 ? this.month : '0' + this.month) + '-01 00:00:00',
					end_date: this.year + '-' + (this.month > 9 ? this.month : '0' + this.month) + '-' + (this.date > 9 ? this.date : '0' + this.date) + ' 23:59:59'
				}).then(function(res) {
					if (res.data.code === 'C0000') {
						var list = res.data.data.map(function(item, index) {
							var newitem = item;
							newitem.date = new Date(item.create_date.replace('-', '/')).getDay() - 1;
							if (newitem.date == -1) {
								newitem.date = 6;
							}
							return newitem;
						}).sort(function(a, b) {
							return a.date - b.date;
						});
						list = that.fillThisWeekArr(list);
						that.sleeplengthtimes = list.map(function(item, index) {
							that.sleepstarttimes.push(that.dealtime(item.sleepTime));
							that.sleependtimes.push(that.dealtime(item.wakeTime) + 24);
							return (item.sleepTimeLang / 60).toFixed(1);
						});
						that.setOptions();
						that.myChart.setOption(that.option);
					}
				}).catch(function() {
					if (process.env.NODE_ENV == 'development') {
						that.$axios.get('/static/testData/getByWeek.json').then(function(res) {
							if (res.data.code === 'C0000') {
								var list = res.data.data.map(function(item, index) {
									var newitem = item;
									newitem.date = new Date(item.create_date.replace('-', '/')).getDay() - 1;
									if (newitem.date == -1) {
										newitem.date = 6;
									}
									return newitem;
								}).sort(function(a, b) {
									return a.date - b.date;
								});
								list = that.fillThisWeekArr(list);
								that.sleeplengthtimes = list.map(function(item, index) {
									that.sleepstarttimes.push(that.dealtime(item.sleepTime));
									that.sleependtimes.push(that.dealtime(item.wakeTime) + 24);
									return (item.sleepTimeLang / 60).toFixed(1);
								});
								that.setOptions();
								that.myChart.setOption(that.option);
							}
						});
					}
				})
			},
			thisYear() { //本年
				var that = this;
				var date = new Date();
				this.year = date.getFullYear();
				this.month = date.getMonth() + 1;
				this.date = date.getDate();
				this.$axios.post('/api/sleeGetExistDateList', {
					begin_date: this.year + '-01-01 00:00:00',
					end_date: this.year + '-' + (this.month > 9 ? this.month : '0' + this.month) + '-' + (this.date > 9 ? this.date : '0' + this.date) + ' 23:59:59'
				}).then(function(res) {
					if (res.data.code === 'C0000') {
						var list = res.data.data.map(function(item, index) {
							var newitem = item;
							newitem.date = new Date(item.create_date.replace('-', '/')).getDay() - 1;
							if (newitem.date == -1) {
								newitem.date = 6;
							}
							return newitem;
						}).sort(function(a, b) {
							return a.date - b.date;
						});
						list = that.fillThisWeekArr(list);
						that.sleeplengthtimes = list.map(function(item, index) {
							that.sleepstarttimes.push(that.dealtime(item.sleepTime));
							that.sleependtimes.push(that.dealtime(item.wakeTime) + 24);
							return (item.sleepTimeLang / 60).toFixed(1);
						});
						that.setOptions();
						that.myChart.setOption(that.option);
					}
				}).catch(function() {
					if (process.env.NODE_ENV == 'development') {
						that.$axios.get('/static/testData/getByWeek.json').then(function(res) {
							if (res.data.code === 'C0000') {
								var list = res.data.data.map(function(item, index) {
									var newitem = item;
									newitem.date = new Date(item.create_date.replace('-', '/')).getDay() - 1;
									if (newitem.date == -1) {
										newitem.date = 6;
									}
									return newitem;
								}).sort(function(a, b) {
									return a.date - b.date;
								});
								list = that.fillThisWeekArr(list);
								that.sleeplengthtimes = list.map(function(item, index) {
									that.sleepstarttimes.push(that.dealtime(item.sleepTime));
									that.sleependtimes.push(that.dealtime(item.wakeTime) + 24);
									return (item.sleepTimeLang / 60).toFixed(1);
								});
								that.setOptions();
								that.myChart.setOption(that.option);
							}
						});
					}
				})
			},
			getAxisFormatter(val, index) { //计算x轴坐标
				if (index == 0) {
					return '周一'
				} else if (index == 1) {
					return '周二'
				} else if (index == 2) {
					return '周三'
				} else if (index == 3) {
					return '周四'
				} else if (index == 4) {
					return '周五'
				} else if (index == 5) {
					return '周六'
				} else if (index == 6) {
					return '周日'
				}
			},
			getAxisData() { //本周的
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
					return [item, index];
				})
				this.option.series[3].data = this.sleependtimes;
				this.option.series[1].data = this.sleeplengthtimes;
			}
		},
		data() {
			var that = this;
			return {
				bigberImg: false,
				sleepstarttimes: [],
				sleependtimes: [],
				sleeplengthtimes: [],
				active: 0,
				option: {
					tooltip: {
						trigger: 'axis',
						backgroundColor: "#26A5FD",
						textStyle: {
							fontSize: 10
						},
						extraCssText: 'min-width:200px;transform:rotate(90deg);',
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
							var startH,
								startM,
								endH,
								endM;
							var time = tar.name;
							startH = Math.floor(params[0].data);
							startM = Math.round((params[0].data - startH) * 60);
							endH = Math.floor(params[3].data) - 24;
							endM = Math.round((params[3].data - 24 - endH) * 60);
							if (window.sleep_charts_active == 0) {
								time = window.sleep_xaxis_arr[params[0].axisValue];
							} else if (window.sleep_charts_active == 2) {
								time = params[0].axisValueLabel;
							} else if (window.sleep_charts_active == 3) {
								time = params[0].axisValueLabel;
							}
							startH = startH > 9 ? startH : '0' + startH;
							startM = startM > 9 ? startM : '0' + startM;
							endH = endH > 9 ? endH : '0' + endH;
							endM = endM > 9 ? endM : '0' + endM;
							return time + '<br/>' + tar.seriesName + ' : ' + tar.value + '小时' + '<span style="width:8px;height:8px;border-radius:50%;background:#2283E2;display:inline-block;margin:0 3px 0 10px;border:1px solid #fff;"></span>' + startH + ':' + startM + '<span style="width:8px;height:8px;border-radius:50%;background:#F5B616;display:inline-block;margin:0 3px 0 10px;border:1px solid #fff;"></span>' + endH + ":" + endM;
						},
						position: function(pos, params, dom, rect, size) {
							var obj = {
								right: -70
							};
							obj[['top', 'bottom'][+(pos[1] < size.viewSize[1] / 2)]] = 120;
							return obj;
						}
					},
					grid: {
						left: '8%',
						right: '16%',
						bottom: '3%',
						top: '3%',
						containLabel: true
					},
					yAxis: {
						type: 'category',
						inverse: true,
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
					xAxis: {
						type: 'value',
						position: 'top',
						splitNumber: 4, //属性splitNumber控制每份split细分多少段
						interval: 8, //强制设置坐标轴分割间隔
						min: 8, //坐标轴刻度最小值。
						max: 40, //坐标轴刻度最大值。
						splitLine: { //坐标轴分割线
							show: true,
							lineStyle: {
								type: 'dashed'
							}
						},
						axisLabel: { //是否显示刻度标签。
							color: '#333',
							rotate: 90,
							formatter: function(val, index) {
								var num = (index + 1) * 8 % 24;
								return (num == 0 ? 24 : num) + '时'
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
						}, { //起点 蓝色散点图
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
						{ //入睡时间 橘色散点图
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
			this.myChart = echarts.init(document.getElementById('main2'));
			// 绘制图表
			this.active = 0;
			window.sleep_charts_active = 0;
			this.nearestSeven();
		}
	}
</script>

<style lang='scss' scoped>
	.echarts {
		width: 100%;
		height: 100%;
		background: #fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100000;
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
			top: 1.0rem;
			&.active {
				color: #26a6ff;
				border: 1px solid #26a6ff;
			}
		}
		.nearest {
			left: 0.5rem;
		}
		.week {
			left: 5.1rem;
		}
		.month {
			left: 9.8rem;
		}
		.year {
			right: 0.5rem;
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
		.scale {
			width: 1rem;
			height: 1rem;
			position: absolute;
			bottom: 0.5rem;
			right: 0.5rem;
		}
		#main2 {
			background: #fff;
			position: absolute;
			left: 0rem;
			top: 3rem;
			bottom: 2rem;
			right: 0;
		}
	}
</style>