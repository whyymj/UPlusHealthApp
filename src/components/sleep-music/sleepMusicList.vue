<template>
    <div class='sleepMusic'>
        <div class="tabbars">
            <div class="tabbar" @click='clickSpan(0)'><span :class='{active:activeSpan==0}'>睡眠报告</span></div>
            <div class="tabbar" @click='clickSpan(1)'><span :class='{active:activeSpan==1}'>睡眠练习</span></div>
        </div>
        <div class='content'>
            <div class="page page1" v-show='activeSpan==0'>
                <mycollapse2 animateT='500'>
                    <div>
                        <myDatePicker @checkDateData='checkDateData'></myDatePicker>
                    </div>
                </mycollapse2>
                <!-- 有手动录入的数据就显示今天录入的 -->
                <sleepanalysis :sleepTimeLang='sleepTimeLang' :paramslist='paramslist' :detailAnalysis='detailAnalysis' @deleteThis='deleteThis' :level='sleepQuality' v-if='todayManuInputData'></sleepanalysis>
                <!-- 如果无手动录入，且有苹果健康数据就显示从apple health获取的数据 -->
                <iosdatashower :showdata='iosshowdata' :sleepid='sleep_id' v-if='!todayManuInputData&&iosshowdata!=""'></iosdatashower>
                <!-- 如果有数据偏差就显示 -->
                <datadeviation v-if='dataDeviat'></datadeviation>
                <!-- 如果没有手动录入的数据并且无苹果健康数据就显示 ,根据有无权限判断显示内容以及跳转路径-->
                <nodata v-if='!todayManuInputData&&iosshowdata===""' :haveAuthor='haveAuthor'></nodata>
                <echarts @showbig='showbig'></echarts>
                <!-- 睡眠百科 -->
                <aboutSleep v-for='(item,index) in sleepAboutData' :data='item' :key='index'></aboutSleep>
                <aboutNews :newslist='sleepnewslist'></aboutNews>
                <div class="buttons">
                    <div class="manuinput" @click='toManuInput'>手动录入</div>
                    <!-- <div class="equipinput">设备录入</div> -->
                </div>
            </div>
            <div class="page page2" v-show='activeSpan==1'>
                <musiclist :musiclist='list'></musiclist>
                <!-- <player></player> -->
                <div class="tips">
                    <h6><img src="/static/sleepMusicList/img3.png" alt="">
                        <span>以上服务由寝安提供</span></h6>
                </div>
            </div>
        </div>
  
        <bigechart @showbig='showbig' v-if='showBigEcharts'></bigechart>
    </div>
</template>

<script>
    import myDatePicker from './myDatePicker.vue';
    import mycollapse2 from './mycollapse2.vue';
    import musiclist from "./musicList.vue";
    import player from "./player.vue";
    import sleepanalysis from './sleepAnalysis.vue';
    import iosdatashower from './iosDataShower.vue';
    import echarts from './echarts.vue';
    import aboutSleep from './sleepAbout.vue';
    import aboutNews from './sleepNews.vue';
    import datadeviation from './dataDeviation.vue';
    import nodata from './nodata.vue';
    import bigechart from './bigEcharts.vue';
    import {
        Loading
    } from 'element-ui';
    export default {
        name: "sleepMusicList",
        components: {
            musiclist,
            player,
            myDatePicker,
            sleepanalysis,
            echarts,
            aboutSleep,
            aboutNews,
            datadeviation,
            nodata,
            mycollapse2,
            iosdatashower,
            Loading,
            bigechart
        },
        data() {
            return {
                loadingmodal: '',
                haveAuthor: false, //是否有权限
                isios: false,
                sleep_id: '', //上传苹果健康数据获取的
                sleepid: '', //查询当天的数据获取的
                showBigEcharts: false,
                dataDeviat: false, //数据存在偏差
                sleepQuality: 0,
                sleepTimeLang: "",
                appleHealthData: '', //从苹果健康获取的数据
                iosshowdata: '',
                todayManuInputData: false, //今天是否手动录入数据
                sleepnewslist: [],
                showDateSelect: false,
                activeName: "",
                detailAnalysis: "",
                list: [],
                activeSpan: 0,
                paramslist: [],
                sleepAboutData: [{
                    title: '睡眠测试(本服务由寝安睡眠提供)',
                    content: '睡眠小测试，了解自己的睡眠问题。',
                    src: "/static/sleepMusicList/exm1.jpg",
                    link: '测一测',
                    linkurl: '/enterToTest'
                }, {
                    title: '睡眠百科（本服务由寝安睡眠提供',
                    content: '睡眠小百科，睡眠知识全收录。',
                    src: "/static/sleepMusicList/exm2.jpg",
                    link: '立刻围观',
                    linkurl: '/sleepCyclopedia'
                }]
            };
        },
        methods: {
            deleteThis() {
                var that = this;
                this.$axios.post('/api/sleep/delete', {
                    sleep_id: that.sleep_id
                }).then(function(res) {
                    if (res.data.code == 'C0000') {
                        that.paramslist = [];
                        that.detailAnalysis = "";
                        that.todayManuInputData = false;
                        that.sleepid = '';
                    }
                }).catch(function() {
                    that.paramslist = [];
                    that.detailAnalysis = "";
                    that.todayManuInputData = false;
                    that.sleepid = '';
                })
            },
            checkDateData(val) { //查询当天的数据
                this.loadingmodal = Loading.service({
                    fullscreen: true,
                    background: 'rgba(0, 0, 0, 0.7)',
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                });
                var that = this;
                this.appleHealthData = '';
                var check = val.year + '/' + (val.month > 9 ? val.month : '0' + val.month) + '/' + (val.date > 9 ? val.date : '0' + val.date);
                this.saveSleepInfo(check);
                this.$axios.post('/api/sleep/getByDay', {
                    Date: val.year + '-' + (val.month > 9 ? val.month : '0' + val.month) + '-' + (val.date > 9 ? val.date : '0' + val.date)
                }).then(function(res) {
                    if (res.data.code === 'C0000' && res.data.data) {
                        var data = res.data.data;
                        that.todayManuInputData = true;
                        that.paramslist = [{
                            title: '当日作息',
                            detail: '当日作息即当日上床歇息至起床时间',
                            params: [{
                                data: data.sleepTime,
                                unit: '-'
                            }, {
                                data: data.wakeTime,
                                unit: ''
                            }]
                        }, {
                            title: '卧床时长',
                            detail: '',
                            params: [{
                                data: Math.floor(data.bedTimeLang / 60),
                                unit: '小时'
                            }, {
                                data: data.bedTimeLang % 60,
                                unit: '分钟'
                            }]
                        }, {
                            title: '睡眠效率',
                            detail: '',
                            params: [{
                                data: data.sleepEfficiency,
                                unit: '%'
                            }]
                        }, {
                            title: '入睡速度（分）',
                            detail: '',
                            params: [{
                                data: data.sleepingtime,
                                unit: '分钟'
                            }]
                        }];
                        that.detailAnalysis = data.sleepAnalysis;
                        that.sleepTimeLang = data.sleepTimeLang;
                        that.sleepQuality = data.quality;
                        that.sleepid = data.sleep_id;
                    } else {
                        that.paramslist = [];
                        that.detailAnalysis = "";
                        that.todayManuInputData = false;
                        that.sleepid = '';
                    }
                    that.loadingmodal.close()
                }).catch(function(res) { //获取用户最近一条测量记录,判断今天是否有记录信息
                    that.loadingmodal.close();
                    if (process.env.NODE_ENV == 'development') {
                        that.$axios.get('/static/testData/checkSomeDay.json').then(function(res) {
                            if (res.data.code === 'C0000') {
                                var data = res.data.data;
                                that.todayManuInputData = true;
                                that.paramslist = [{
                                    title: '当日作息',
                                    detail: '当日作息即当日上床歇息至起床时间',
                                    params: [{
                                        data: data.sleepTime,
                                        unit: '-'
                                    }, {
                                        data: data.wakeTime,
                                        unit: ''
                                    }]
                                }, {
                                    title: '卧床时长',
                                    detail: '',
                                    params: [{
                                        data: Math.floor(data.bedTimeLang / 60),
                                        unit: '小时'
                                    }, {
                                        data: data.bedTimeLang % 60,
                                        unit: '分钟'
                                    }]
                                }, {
                                    title: '睡眠效率',
                                    detail: '',
                                    params: [{
                                        data: data.sleepEfficiency,
                                        unit: '%'
                                    }]
                                }, {
                                    title: '入睡速度（分）',
                                    detail: '',
                                    params: [{
                                        data: data.sleepingtime,
                                        unit: '分钟'
                                    }]
                                }];
                                that.detailAnalysis = data.sleepAnalysis;
                                that.sleepTimeLang = data.sleepTimeLang;
                                that.sleepQuality = data.quality;
                                that.sleepid = data.sleep_id;
                            } else {
                                that.paramslist = [];
                                that.detailAnalysis = "";
                                that.todayManuInputData = false;
                                that.sleepid = '';
                            }
                        })
                    }
                })
            },
            showbig() {
                this.showBigEcharts = !this.showBigEcharts;
            },
            getAppleHealthData(val, check) { //例子数据，获取苹果健康数据
                var that = this;
                var data = this.appleHealthData = val || [];
                var today = new Date(),
                    todaydata = '';
                if (check) { //查询某天的数据
                    today = new Date(check)
                }
                var year = today.getFullYear(),
                    month = today.getMonth() + 1,
                    date = today.getDate(),
                    datestr = year + '-' + (month > 9 ? month : '0' + month) + '-' + (date > 9 ? date : '0' + date);
                this.iosshowdata = data.filter(function(item) {
                    var endtime = item.endDate.split('T')[0];
                    return endtime === datestr
                })[0] || '';
                if (this.iosshowdata) { //如果有数据就上传后台
                    that.$axios.post('/api/insertByIphone', {
                        sleepTime: that.iosshowdata.startDate.replace('T', ' ').split('+')[0],
                        wakeTime: that.iosshowdata.endDate.replace('T', ' ').split('+')[0]
                    }).then(function(res) {
                        if (res.data.code == 'C0000') {
                            that.sleep_id = res.data.data.sleep_id
                        }
                    }).catch(function() {
                    });
                }
            },
            //打开苹果健康权限
            getHealth() {
                try {
                    let supportedTypes = ['HKCategoryTypeIdentifierSleepAnalysis'];
                    window.plugins.healthkit.requestAuthorization({
                        readTypes: supportedTypes,
                    });
                } catch (e) {
                    this.iosshowdata = ''
                }
            },
            //保存信息
            saveSleepInfo(check) {
                try {
                    let _this = this;
                    // if (window.plugins && window.plugins.healthkit) {
                    window.plugins.healthkit.monitorSampleType({
                        'sampleType': 'HKCategoryTypeIdentifierSleepAnalysis'
                    }, (value) => {
                        _this.getSleepInfo(check);
                    })
                } catch (e) {
                    this.iosshowdata = ''
                }
                // }
            },
            //获取苹果健康数据信息
            getSleepInfo(check) {
                var that = this;
                var startDate = 0,
                    endDate = new Date(),
                    limit = 10;
                if (check) {
                    startDate = this.isios ? new Date(check + 'T' + '00:00') : new Date(check + ' 00:00');
                    endDate = this.isios ? new Date(check + 'T' + '23:59:59') : new Date(check + ' 23:59:59');
                }
                // this.dialogVisible = false;
                // if (window.plugins && window.plugins.healthkit) {
                try {
                    window.plugins.healthkit.querySampleType({
                        'startDate': startDate, // 开始时间
                        'endDate': endDate, // now 结束时间
                        'sampleType': 'HKCategoryTypeIdentifierSleepAnalysis',
                        'limit': limit,
                        'ascending': 'T',
                    }, function(value) {
                        that.getAppleHealthData(value, check);
                    })
                    if (!that.haveAuthor) {
                        window.plugins.healthkit.querySampleType({ //判断是否有权限
                            'startDate': 0, // 开始时间
                            'endDate': endDate, // now 结束时间
                            'sampleType': 'HKCategoryTypeIdentifierSleepAnalysis',
                            'limit': limit,
                            'ascending': 'T',
                        }, function(value) {
                            if (value && value.length && typeof value == 'object') {
                                that.haveAuthor = true;
                                window.localStorage.UPlusApp_getAppleHealthData = true;
                            }
                        })
                    }
                } catch (e) {
                    this.iosshowdata = ''
                }
                // }
            },
            toManuInput() {
                this.$router.push({
                    path: '/sleepManuInput',
                    query: {}
                });
            },
            handleClick() {},
            clickSpan(index) {
                window.localStorage.wh_fromPage = (index == 1) ? 'music' : ''; //用来记录是否是从音乐播放页面跳过来的
                this.activeSpan = index;
            },
            showDater(bool) {
                var that = this;
                if (bool) {
                    that.showDateSelect = bool;
                } else {
                    setTimeout(function() {
                        that.showDateSelect = bool;
                    }, 400)
                }
            }
        },
        mounted() {
            
            if (window.localStorage.UPlusApp_getAppleHealthData && (window.localStorage.UPlusApp_getAppleHealthData == 'true' || window.localStorage.UPlusApp_getAppleHealthData == true)) {
                this.haveAuthor = true;
            }
            //测试用的+++++++s++++++++++++++++//测试用的+++++++s++++++++++++++++//测试用的+++++++s++++++++++++++++//测试用的+++++++s++++++++++++++++//测试用的+++++++s++++++++++++++++//测试用的+++++++s++++++++++++++++//测试用的+++++++s++++++++++++++++//测试用的+++++++s++++++++++++++++//测试用的+++++++s++++++++++++++++//测试用的+++++++s++++++++++++++++//测试用的+++++++s++++++++++++++++//测试用的+++++++s++++++++++++++++//测试用的+++++++s++++++++++++++++//测试用的+++++++s++++++++++++++++
            this.getHealth(); //获取权限
            this.loadingmodal = Loading.service({
                fullscreen: true,
                background: 'rgba(0, 0, 0, 0.7)',
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
            });
            var today = new Date();
            var month = today.getMonth() + 1;
            var date = today.getDate();
            var str = today.getFullYear() + '/' + (month > 9 ? month : '0' + month) + '/' + (date > 9 ? date : '0' + date);
            this.saveSleepInfo(str); //获取苹果健康数据 
            // }
            if (window.localStorage.wh_fromPage == 'music') { //是否直接进入音乐页面
                this.activeSpan = 1;
            }
            if (window.localStorage.UPlusApp_firstLogin_sleepMusicList === undefined || window.localStorage.UPlusApp_firstLogin_sleepMusicList === 'undefined') { //第一次登陆
                window.localStorage.UPlusApp_firstLogin_sleepMusicList = true;
            }
            var u = navigator.userAgent,
                app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            this.isios = isIOS;
            var that = this;
            this.$axios.post('/api/getSleepPractice').then(function(res) {
                if (res.data.code == 'C0000') {
                    that.list = res.data.data.map(function(item) {
                        return {
                            name: item.lineTitle,
                            time: item.lineValues,
                            level: item.resourceType - 1,
                            imgurl: item.imgUrl,
                            musicurl: item.audioUrl
                        }
                    })
                }
                that.loadingmodal.close();
            }).catch(function() { //获取音乐列表
                if (process.env.NODE_ENV == 'development') {
                    that.$axios.get('/static/testData/getSleepPractice.json').then(function(res) {
                        if (res.data.code == 'C0000') {
                            that.list = res.data.data.map(function(item) {
                                return {
                                    name: item.lineTitle,
                                    time: item.lineValues,
                                    level: item.resourceType - 1,
                                    imgurl: item.imgUrl,
                                    musicurl: item.audioUrl
                                }
                            })
                        }
                    });
                }
                that.loadingmodal.close();
            });
            this.$axios.post('/api/sleep/getLast').then(function(res) {
                if (res.data.code === 'C0000') {
                    var data = res.data.data;
                    var createTime = data.create_date.split(' ')[0].split('-');
                    var today = new Date();
                    if (today.getFullYear() == createTime[0] && today.getMonth() + 1 == createTime[1] * 1 && today.getDate() == createTime[2]) {
                        that.todayManuInputData = true;
                        that.paramslist = [{
                            title: '当日作息',
                            detail: '当日作息即当日上床歇息至起床时间',
                            params: [{
                                data: data.sleepTime.split(' ')[1],
                                unit: '-'
                            }, {
                                data: data.wakeTime.split(' ')[1],
                                unit: ''
                            }]
                        }, {
                            title: '卧床时长',
                            detail: '',
                            params: [{
                                data: Math.floor(data.bedTimeLang / 60),
                                unit: '小时'
                            }, {
                                data: data.bedTimeLang % 60,
                                unit: '分钟'
                            }]
                        }, {
                            title: '睡眠效率',
                            detail: '',
                            params: [{
                                data: data.sleepEfficiency,
                                unit: '%'
                            }]
                        }, {
                            title: '入睡速度（分）',
                            detail: '',
                            params: [{
                                data: data.sleepingtime,
                                unit: '分钟'
                            }]
                        }];
                        that.detailAnalysis = data.sleepAnalysis;
                        that.sleepTimeLang = data.sleepTimeLang;
                        that.sleepQuality = data.quality;
                        that.sleepid = data.sleep_id;
                    } else {
                        that.paramslist = [];
                        that.detailAnalysis = "";
                        that.todayManuInputData = false;
                        that.sleepid = '';
                    }
                } else {
                    that.paramslist = [];
                    that.detailAnalysis = "";
                    that.todayManuInputData = false;
                    that.sleepid = '';
                }
                that.loadingmodal.close();
            }).catch(function(res) { //获取用户最近一条测量记录,判断今天是否有记录信息
                if (process.env.NODE_ENV == 'development') {
                    that.$axios.get('/static/testData/getLast.json').then(function(res) {
                        that.loadingmodal.close();
                        if (res.data.code === 'C0000') {
                            var data = res.data.data;
                            var createTime = data.create_date.split(' ')[0].split('-');
                            var today = new Date();
                            if (today.getFullYear() == createTime[0] && today.getMonth() + 1 == createTime[1] * 1 && today.getDate() == createTime[2]) {
                                that.todayManuInputData = true;
                                that.paramslist = [{
                                    title: '当日作息',
                                    detail: '当日作息即当日上床歇息至起床时间',
                                    params: [{
                                        data: data.sleepTime,
                                        unit: '-'
                                    }, {
                                        data: data.wakeTime,
                                        unit: ''
                                    }]
                                }, {
                                    title: '卧床时长',
                                    detail: '',
                                    params: [{
                                        data: Math.floor(data.bedTimeLang / 60),
                                        unit: '小时'
                                    }, {
                                        data: data.bedTimeLang % 60,
                                        unit: '分钟'
                                    }]
                                }, {
                                    title: '睡眠效率',
                                    detail: '',
                                    params: [{
                                        data: data.sleepEfficiency,
                                        unit: '%'
                                    }]
                                }, {
                                    title: '入睡速度（分）',
                                    detail: '',
                                    params: [{
                                        data: data.sleepingtime,
                                        unit: '分钟'
                                    }]
                                }];
                                that.detailAnalysis = data.sleepAnalysis;
                                that.sleepTimeLang = data.sleepTimeLang;
                                that.sleepQuality = data.quality;
                                that.sleepid = data.sleep_id;
                            } else {
                                that.paramslist = [];
                                that.detailAnalysis = "";
                                that.todayManuInputData = false;
                                that.sleepid = '';
                            }
                        } else {
                            that.paramslist = [];
                            that.detailAnalysis = "";
                            that.todayManuInputData = false;
                            that.sleepid = '';
                        }
                    })
                }
            })
            this.$axios.post('/api/getSleepInfo', { //获取睡眠资讯
                pageSize: 10,
                currentPage: 1
            }).then(function(res) {
                that.sleepnewslist = res.data;
                that.loadingmodal.close();
            }).catch(function(res) {
                if (process.env.NODE_ENV == 'development') {
                    that.$axios.get('/static/testData/getSleepInfo.json').then(function(res) {
                        console.log('aboutnews', res);
                        that.sleepnewslist = res.data;
                    });
                }
                that.loadingmodal.close();
            })
            window.localStorage.UPlusApp_firstLogin_sleepMusicList = false; //非首次登陆
        }
    };
</script>

<style lang='scss'>
    .page1 {
        padding-bottom: 3rem;
    }
    .page2 {
        position: fixed;
        top: 3rem;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        overflow: auto;
        .tips {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            overflow: hidden;
            height: 2rem;
            border-top: 1px solid #F5F5F5;
            h6 {
                width: 100%;
                height: 100%;
                line-height: 2rem;
                text-align: center;
                vertical-align: middle;
                img,
                span {
                    vertical-align: middle;
                }
            }
        }
    }
    .sleepMusic {
        background: #fff;
        width: 100%;
        .tabbars {
            width: 100%;
            height: 3rem;
            border-bottom: 1px solid rgba(245, 245, 245, 1);
            .tabbar {
                width: 50%;
                height: 100%;
                float: left;
                text-align: center;
                line-height: 3rem;
                span {
                    display: inline-block;
                    font-size: 0.75rem;
                    font-family: ‘;
                    color: #666;
                    line-height: 1.5rem;
                }
                span.active {
                    color: rgba(38, 165, 253, 1);
                    border-bottom: 2px solid rgba(38, 165, 253, 1);
                }
            }
        }
        .content {
            width: 100%;
            position: absolute;
            top: 3rem;
            bottom: 0;
            left: 0;
            right: 0;
            .page {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                overflow: auto;
                .buttons {
                    width: 100%;
                    height: 2rem;
                    position: fixed;
                    bottom: 0;
                    margin: 1rem auto 0;
                    .manuinput,
                    .equipinput {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        font-size: 0.7rem;
                        font-family: 'PingFangSC-Semibold';
                        color: rgba(255, 255, 255, 1);
                        text-align: center;
                        box-sizing: border-box;
                        line-height: 2rem;
                        text-align: center;
                        background: rgba(16, 214, 226, 1);
                    }
                    .equipinput {
                        right: 0;
                        background: rgba(38, 166, 255, 1);
                    }
                }
            }
        }
    }
</style>