<template>
    <div class='sleepMusic'>
        <div class="tabbars">
            <!-- 音乐暂时隐藏，宽度设为100%（原50%） -->
            <div class="tabbar" @click='clickSpan(0)'><span :class='{active:activeSpan==0}'>睡眠报告</span></div>
            <div class="tabbar" @click='clickSpan(1)'><span :class='{active:activeSpan==1}'>睡眠练习</span></div>
        </div>
        <div class='content'>
            <div class="page page1" v-show='activeSpan==0'>
                <mycollapse2 animateT='500'>
                    <div>
                        <myDatePicker flag='7' @checkDateData='checkDateData' :appleHealthDates='appleHealthDates'></myDatePicker>
                    </div>
                </mycollapse2>
                <div class='tipDeleteData' v-if='tipDeleteData&&todayManuInputData'>
                    <i class='el-icon-info'></i>
                    <span>可以左滑动删除不必要的数据</span>
                    <i class='el-icon-close' @click='closeTipDeleteButton'></i>
                </div>
                <!-- 有手动录入的数据就显示今天录入的 -->
                <sleepanalysis :sleepTimeLang='sleepTimeLang' :paramslist='paramslist' :detailAnalysis='detailAnalysis' @deleteThis='deleteThis' :level='sleepQuality' v-if='todayManuInputData'></sleepanalysis>
                <!-- 如果无手动录入，且有苹果健康数据就显示从apple health获取的数据 -->
                <iosdatashower :showdata='iosshowdata' :sleepid='sleep_id' v-if='!todayManuInputData&&iosshowdata!=""'></iosdatashower>
                <!-- 如果有数据偏差就显示，暂时未启用 -->
                <datadeviation v-if='dataDeviat'></datadeviation>
                <!-- 如果没有手动录入的数据并且无苹果健康数据就显示 ,根据有无权限判断显示内容以及跳转路径-->
                <nodata v-if='!todayManuInputData&&iosshowdata===""' :haveAuthor='haveAuthor'></nodata>
                <echarts @showbig='showbig' :nearestAppleHealthData='nearestAppleHealthData'></echarts>
                <!-- 睡眠百科 -->
                <aboutSleep v-for='(item,index) in sleepAboutData' :data='item' :key='index'></aboutSleep>
                <aboutNews :newslist='sleepnewslist'></aboutNews>
            </div>
            <div class="buttons" v-show='activeSpan==0'>
                <div class="manuinput" @click='toManuInput'>手动录入</div>
                <!-- <div class="equipinput">设备录入</div> -->
            </div>
            <div class="page page2" v-show='activeSpan==1'>
                <musiclist :musiclist='list'></musiclist>
                <div class="tips">
                    <h6><img src="/static/sleepMusicList/img3.svg" alt="">
                        <span>以上服务由寝安提供</span></h6>
                </div>
            </div>
        </div>
        <bigechart @showbig='showbig' v-if='showBigEcharts' :nearestAppleHealthData='nearestAppleHealthData'></bigechart>
        <myLoadingModal :show='showMyLoadingModal'></myLoadingModal>
    </div>
</template>

<script>
    // import myDatePicker from '../pressure/myDatePicker.vue';
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
        Toast
    } from 'mint-ui';
    import bus from '../eventbus.js';
    export default {
        name: "sleepMusicList",
        components: {
            musiclist,
            player,
            myDatePicker: resolve => require(['../pressure/myDatePicker.vue'], resolve),
            sleepanalysis,
            echarts,
            aboutSleep,
            aboutNews,
            datadeviation,
            nodata,
            mycollapse2,
            iosdatashower,
            bigechart,
            Toast
        },
        data() {
            return {
                showMyLoadingModal: true,
                thisloadingbar: '',
                myToast: '',
                tipDeleteData: true,
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
                nearestAppleHealthData: '',
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
                    title: '睡眠测试',
                    content: '睡眠小测试，了解自己的睡眠问题。',
                    src: "/static/sleepMusicList/sleeptest.png",
                    link: '测一测',
                    linkurl: '/enterToTest'
                }, {
                    title: '睡眠百科',
                    content: '睡眠小百科，睡眠知识全收录。',
                    src: "/static/sleepMusicList/sleepknowledge.png",
                    link: '立刻围观',
                    linkurl: '/sleepCyclopedia'
                }],
                appleHealthDates: []
            };
        },
        methods: {
            closeTipDeleteButton() {
                this.tipDeleteData = !this.tipDeleteData;
            },
            deleteThis() {
                var that = this;
                this.$axios.post('/api/sleep/delete', {
                    sleep_id: that.sleepid
                }).then(function(res) {
                    if (res.data.code == 'C0000') {
                        that.paramslist = [];
                        that.detailAnalysis = "";
                        that.todayManuInputData = false;
                        that.sleepid = '';
                    }
                }).catch(function(e) {
                    that.paramslist = [];
                    that.detailAnalysis = "";
                    that.todayManuInputData = false;
                    that.sleepid = '';
                })
            },
            checkDateData(val) { //查询当天的数据
                this.showMyLoadingModal = true;
                clearTimeout(this.thisloadingbar);
                this.thisloadingbar = setTimeout(function() {
                    that.showMyLoadingModal = false;
                }, 5000)
                var that = this;
                this.appleHealthData = '';
                var check = val.year + '-' + (val.month > 9 ? val.month : ('0' + val.month * 1)) + '-' + (val.date > 9 ? val.date : ('0' + val.date * 1));
                this.saveSleepInfo(check);
                this.$axios.post('/api/sleep/getByDay', {
                    date: val.year + '-' + (val.month > 9 ? val.month : ('0' + val.month * 1)) + '-' + (val.date > 9 ? val.date : ('0' + val.date * 1)),
                    member_id: window._member_id
                }).then(function(res) {
                    if (res.data.code === 'C0000' && res.data.data) {
                        var data = res.data.data[res.data.data.length - 1];
                        that.todayManuInputData = true;
                        var tmp1 = data.sleepTime,
                            tmp2 = data.wakeTime
                        tmp1 = (tmp1.indexOf('-') == -1) ? tmp1 : tmp1.split(' ')[1];
                        tmp2 = (tmp2.indexOf('-') == -1) ? tmp2 : tmp2.split(' ')[1];
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
                        that.$axios.post('/api/updateErrorFlag', { //获取数据偏差信息
                            sleep_id: data.sleep_id
                        }).then(function(res) {
                            console.log('data piancha', res);
                            if (res.data) {}
                        })
                    } else {
                        that.paramslist = [];
                        that.detailAnalysis = "";
                        that.todayManuInputData = false;
                        that.sleepid = '';
                    }
                    clearTimeout(that.thisloadingbar);
                    that.showMyLoadingModal = false;
                }).catch(function(res) { //获取用户最近一条测量记录,判断今天是否有记录信息
                    clearTimeout(that.thisloadingbar);
                    that.showMyLoadingModal = false;
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
                console.log('check that date apple data>>++++>>>>', val, check);
                var that = this;
                var data = val || [];
                this.appleHealthData = val || [];
                var today = new Date(),
                    todaydata = '';
                if (check) { //查询某天的数据
                    today = new Date(check)
                }
                var year = today.getFullYear(),
                    month = today.getMonth() + 1,
                    date = today.getDate(),
                    datestr = year + '-' + (month > 9 ? month : ('0' + month * 1)) + '-' + (date > 9 ? date : ('0' + date * 1));
                this.iosshowdata = data.filter(function(item) {
                    var endtime = item.endDate.split('T')[0];
                    return endtime === datestr
                })[0] || '';
                console.log('将要展示的数据？？？？', this.iosshowdata);
                if (this.iosshowdata) { //如果有数据就上传后台
                    that.$axios.post('/api/insertByIphone', {
                        sleepTime: that.iosshowdata.startDate.replace('T', ' ').split('+')[0],
                        wakeTime: that.iosshowdata.endDate.replace('T', ' ').split('+')[0],
                        member_id: window._member_id
                    }).then(function(res) {
                        if (res.data.code == 'C0000') {
                            that.sleep_id = res.data.data.sleep_id
                        }
                    }).catch(function() {});
                }
            },
            //打开苹果健康权限
            getHealth() {
                try {
                    let supportedTypes = ['HKCategoryTypeIdentifierSleepAnalysis'];
                    window.plugins.healthkit.requestAuthorization({
                        readTypes: supportedTypes,
                    }, function(res) {
                        console.log('get apple health >+++++>', res);
                    });
                } catch (e) {
                    this.iosshowdata = '';
                    console.log('1.獲取苹果健康权限报错！！：', e);
                }
            },
            //保存信息
            saveSleepInfo(check, end) {
                try {
                    let _this = this;
                    // this.$axios.get('/static/testData/mockAppleHealth.json').then(function(res) { //测试代码++++++++++++++
                    //     var value = res.data;
                    //     _this.nearestAppleHealthData = value.map(function(item) {
                    //         var start = item.startDate.replace('T', ' ').split('+')[0];
                    //         var end = item.endDate.replace('T', ' ').split('+')[0];
                    //         return {
                    //             bedTimeLang: null,
                    //             create_date: item.endDate.split('T')[0],
                    //             errorFlag: null,
                    //             getupTime: null,
                    //             influence: null,
                    //             quality: null,
                    //             sleepAnalysis: null,
                    //             sleepEfficiency: null,
                    //             sleepTime: start,
                    //             sleepTimeLang: Math.round((new Date(end).getTime() - new Date(start).getTime()) / 1000 / 60),
                    //             sleep_id: null,
                    //             sleepingtime: null,
                    //             startTime: null,
                    //             tools_name: null,
                    //             user_id: null,
                    //             wakeTime: end,
                    //             from:'appleHealth'
                    //         }
                    //     })
                    //     _this.appleHealthDates = value.map(function(item) {
                    //         var endtime = item.endDate.split('T')[0];
                    //         return endtime;
                    //     });
                    // })
                    // if (window.plugins && window.plugins.healthkit) {
                    window.plugins.healthkit.monitorSampleType({
                        'sampleType': 'HKCategoryTypeIdentifierSleepAnalysis'
                    }, (value) => {
                        _this.getSleepInfo(check, end);
                    })
                } catch (e) {
                    console.log('2.獲取苹果健康数据报错！！：', e);
                    this.iosshowdata = ''
                }
                // }
            },
            //获取苹果健康数据信息
            getSleepInfo(check, end) {
                var that = this;
                var startDate = new Date(new Date().getTime() - 364 * 24 * 60 * 60 * 1000), //一年前
                    endDate = new Date(),
                    limit = 365;
                if (check && !end) { //只传入一个参数,查询当天
                    startDate = this.isios ? new Date(new Date(check + 'T00:00:00+08:00').getTime() - 24 * 3600 * 1000) : new Date(check + ' 00:00');
                    endDate = this.isios ? new Date(check + 'T23:59:59+08:00') : new Date(check + ' 23:59:59');
                    endDate = endDate.getTime() > new Date().getTime() ? new Date() : endDate;
                } else if (check && end) { //传入起点与终点,查找范围
                    startDate = this.isios ? new Date(new Date(check + 'T00:00:00+08:00').getTime() - 24 * 3600 * 1000) : new Date(check + ' 00:00');
                    endDate = this.isios ? new Date(end + 'T23:59:59+08:00') : new Date(end + ' 23:59:59');
                    endDate = endDate.getTime() > new Date().getTime() ? new Date() : endDate;
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
                        that.getAppleHealthData(value, check); //用于展示当天的数据
                    })
                    window.plugins.healthkit.querySampleType({ //判断是否有权限,同时初始化最近的苹果健康数据，用于曲线展示
                        'startDate': (typeof end == 'string') ? new Date(check) : new Date(new Date().getTime() - 400 * 24 * 60 * 60 * 1000), // 开始时间
                        'endDate': (typeof end == 'string') ? new Date(end) : new Date(), //  结束时间
                        'sampleType': 'HKCategoryTypeIdentifierSleepAnalysis',
                        'limit': (typeof end == 'string') ? (new Date(end).getTime() - new Date(check).getTime() / 24 / 3600 / 1000) : 400,
                        'ascending': 'T',
                    }, function(value) {
                        if (that.nearestAppleHealthData === '') { //获取苹果健康最近的数据，用于曲线图展示
                            that.nearestAppleHealthData = value.map(function(item) {
                                var start = item.startDate.replace('-', '/').split('+')[0];
                                var end = item.endDate.replace('-', '/').split('+')[0];
                                return {
                                    bedTimeLang: null,
                                    create_date: item.endDate.split('T')[0],
                                    errorFlag: null,
                                    getupTime: null,
                                    influence: null,
                                    quality: null,
                                    sleepAnalysis: null,
                                    sleepEfficiency: null,
                                    sleepTime: start,
                                    sleepTimeLang: Math.round((new Date(end).getTime() - new Date(start).getTime()) / 1000 / 60),
                                    sleep_id: null,
                                    sleepingtime: null,
                                    startTime: null,
                                    tools_name: null,
                                    user_id: null,
                                    wakeTime: end,
                                    from: 'appleHealth'
                                }
                            })
                        }
                        that.appleHealthDates = value.map(function(item) {
                            var endtime = item.endDate.split('T')[0];
                            return endtime;
                        });
                        if (value && value.length && typeof value == 'object') {
                            that.haveAuthor = true;
                            window.localStorage.UPlusApp_getAppleHealthData = true;
                        }
                    })
                } catch (e) {
                    console.log('3.处理苹果健康数据报错！！：', e);
                    this.iosshowdata = ''
                }
                // }
            },
            toManuInput() {
                var that = this;
                if (!this.todayManuInputData) { //如果今天还没有手动录入
                    this.$router.push({
                        path: '/sleepManuInput',
                        query: {}
                    });
                } else if (!this.myToast) { //防止反复点击
                    this.myToast = Toast('请先删除今天的数据,再录入');
                    setTimeout(() => {
                        that.myToast.close();
                        that.myToast = ''
                    }, 2000);
                }
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
            // 判断是否是ios系统
            var u = navigator.userAgent,
                app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            this.isios = isIOS;
            // this.isios=false;//注释掉苹果健康数据功能，nodata组件里面也有
            // 判断是否已经获取过苹果健康数据权限
            if (window.localStorage.UPlusApp_getAppleHealthData && (window.localStorage.UPlusApp_getAppleHealthData == 'true' || window.localStorage.UPlusApp_getAppleHealthData == true)) {
                this.haveAuthor = true;
            }
            // 注释掉，不在获取苹果健康权限
            this.getHealth(); //获取苹果健康数据权限
            this.showMyLoadingModal = true;
            this.thisloadingbar = setTimeout(function() {
                that.showMyLoadingModal = false;
            }, 5000)
            var today = new Date();
            var month = today.getMonth() + 1;
            var date = today.getDate();
            var str = today.getFullYear() + '-' + (month > 9 ? month : ('0' + month * 1)) + '-' + (date > 9 ? date : ('0' + date * 1));
            // 注释掉，不在获取苹果健康数据
            this.saveSleepInfo(str); //获取今天的苹果健康数据 
            if (window.localStorage.wh_fromPage == 'music') { //是否直接进入音乐页面
                this.activeSpan = 1;
            }
            if (window.localStorage.UPlusApp_firstLogin_sleepMusicList === undefined || window.localStorage.UPlusApp_firstLogin_sleepMusicList === 'undefined') { //第一次登陆
                window.localStorage.UPlusApp_firstLogin_sleepMusicList = true;
            }
            var that = this;
            document.getElementsByClassName('page1')[0].onscroll = function(e) { //记录滚动距离
                localStorage.Uplus_sleepmusiclist_scrollTop = this.scrollTop;
            }
            bus.$on('toManuInput', function() {
                that.toManuInput();
            })
            this.$axios.post('/api/getSleepPractice').then(function(res) {
                if (res.data.code == 'C0000') {
                    that.list = res.data.data.map(function(item) {
                        return {
                            name: item.lineTitle,
                            time: item.lineValues,
                            level: item.resourceType,
                            imgurl: item.imgUrl,
                            musicurl: item.audioUrl
                        }
                    })
                }
                clearTimeout(that.thisloadingbar);
                that.showMyLoadingModal = false;
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
                clearTimeout(that.thisloadingbar);
                that.showMyLoadingModal = false;
            });
            this.$axios.post('/api/sleep/getLast', {
                member_id: window._member_id
            }).then(function(res) {
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
                clearTimeout(that.thisloadingbar);
                that.showMyLoadingModal = false;
            }).catch(function(res) { //获取用户最近一条测量记录,判断今天是否有记录信息
                if (process.env.NODE_ENV == 'development') {
                    that.$axios.get('/static/testData/getLast.json').then(function(res) {
                        clearTimeout(that.thisloadingbar);
                        that.showMyLoadingModal = false;
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
            this.$axios.get('/static/sleepMusicList/getSleepInfo.json', { //获取睡眠资讯
                pageSize: 2,
                currentPage: 1
            }).then(function(res) {
                var arr = [];
                var tmp = 0;
                that.sleepnewslist = [];
                while (arr.length != 2) { //随机取两条新闻
                    if (arr.length == 0) {
                        tmp = Math.random() * 3
                        arr.push(Math.round(tmp))
                    } else {
                        tmp = Math.round(Math.random() * 3);
                        if (tmp != arr[0]) {
                            arr.push(tmp)
                        }
                    }
                }
                that.sleepnewslist.push(res.data[arr[0]]); //随机的新闻
                that.sleepnewslist.push(res.data[arr[1]]); //随机的新闻
                clearTimeout(that.thisloadingbar);
                that.showMyLoadingModal = false;
                that.$nextTick(function() { //直接到达上一次访问的地方
                    document.getElementsByClassName('page1')[0].scrollTop = localStorage.Uplus_sleepmusiclist_scrollTop;
                })
            }).catch(function(res) {
                if (process.env.NODE_ENV == 'development') {
                    that.$axios.get('/static/testData/getSleepInfo.json').then(function(res) {
                        that.sleepnewslist = res.data;
                    });
                }
                clearTimeout(that.thisloadingbar);
                that.showMyLoadingModal = false;
            })
            window.localStorage.UPlusApp_firstLogin_sleepMusicList = false; //非首次登陆
        }
    };
</script>

<style lang='scss'>
    .page1 {
        padding-bottom: 3rem;
        .tipDeleteData {
            width: 17.15rem;
            height: 1.2rem;
            background: #fff;
            border-radius: 0.6rem;
            margin: 0.5rem auto 0;
            line-height: 1.4rem;
            font-size: 0.7rem;
            color: #666;
            box-sizing: border-box;
            padding: 0 0.5rem;
        }
        .el-icon-close {
            float: right;
            margin-top: 0.3rem;
        }
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
                img{
                    margin-top:-0.1rem;
                }
            }
        }
    }
    .sleepMusic {
        -webkit-overflow-scrolling: touch;
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
            -webkit-overflow-scrolling: touch;
            width: 100%;
            position: absolute;
            top: 3rem;
            bottom: 0;
            left: 0;
            right: 0;
            .page {
                position: absolute;
                -webkit-overflow-scrolling: touch;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                overflow: auto;
                .buttons {
                    width: 100%;
                    height: 2.5rem;
                    position: fixed;
                    z-index: 10000;
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
                        line-height: 2.5rem;
                        text-align: center;
                        background: #26A6FF;
                    }
                    .equipinput {
                        right: 0;
                        background: rgba(38, 166, 255, 1);
                    }
                }
            }
            .buttons {
                width: 100%;
                height: 2.5rem;
                position: fixed;
                z-index: 10000;
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
                    line-height: 2.5rem;
                    text-align: center;
                    background: #26A6FF;
                }
                .equipinput {
                    right: 0;
                    background: rgba(38, 166, 255, 1);
                }
            }
        }
    }
</style>