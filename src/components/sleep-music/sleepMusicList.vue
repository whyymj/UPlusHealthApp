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
                        <myDatePicker></myDatePicker>
                    </div>
                </mycollapse2>
                <!-- 有手动录入的数据就显示今天录入的 -->
                <sleepanalysis :sleepTimeLang='sleepTimeLang' :paramslist='paramslist' :detailAnalysis='detailAnalysis' :level='sleepQuality' v-if='todayManuInputData'></sleepanalysis>
                <!-- 如果无手动录入就显示从apple health获取的数据 -->
                <iosdatashower :showdata='iosshowdata' v-if='!todayManuInputData&&appleHealthData!=""'></iosdatashower>
                <!-- 如果有数据偏差就显示 -->
                <datadeviation v-if='dataDeviat'></datadeviation>
                <!-- 如果没有手动录入的数据并且无苹果健康数据就显示 -->
                <nodata v-if='!todayManuInputData&&appleHealthData===""'></nodata>
                <echarts></echarts>
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
        <el-dialog title="关联Apple Health" :visible.sync="dialogVisible" width="80%">
            <span>是否同意关联苹果健康数据？</span>
            <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="saveSleepInfo">确 定</el-button>
                            </span>
        </el-dialog>
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
            iosdatashower
        },
        data() {
            return {
                dataDeviat: false, //数据存在偏差
                sleepQuality: 0,
                sleepTimeLang: "",
                appleHealthData: '', //从苹果健康获取的数据
                iosshowdata: '',
                todayManuInputData: false, //今天是否手动录入数据
                dialogVisible: false, //是否需要提示获取权限
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
            getAppleHealthData(val) { //例子数据，获取苹果健康数据
                var data = this.appleHealthData = val || [{
                    "categoryType.identifier": "HKCategoryTypeIdentifierSleepAnalysis",
                    "endDate": "2018-08-08T08:22:04+08:00",
                    "startDate": "2018-08-08T00:06:28+08:00",
                    "UUID": "C97F643D-411D-44F5-A7E3-C6C31BBDFAE2",
                    "sourceBundleId": "com.boohee.sleep",
                    "value": 1,
                    "sourceName": "萤火虫睡眠",
                    "metadata": {},
                    "categoryType.description": "HKCategoryTypeIdentifierSleepAnalysis"
                }];
                var today = new Date(),
                    todaydata = '';
                var year = today.getFullYear(),
                    month = today.getMonth() + 1,
                    date = today.getDate(),
                    datestr = year + '-' + (month > 9 ? month : '0' + month) + '-' + (date > 9 ? date : '0' + date);
                this.iosshowdata = data.filter(function(item) {
                    var endtime = item.endDate.split('T')[0];
                    return endtime === datestr
                })[0];
            },
            //保存信息
            saveSleepInfo() {
                this.dialogVisible = false;
                window.localStorage.UPlusApp_getAppleHealthData = true;
                let _this = this;
                if (window.plugins && window.plugins.healthkit) {
                    window.plugins.healthkit.monitorSampleType({
                        'sampleType': 'HKCategoryTypeIdentifierSleepAnalysis'
                    }, (value) => {
                        _this.getSleepInfo();
                    })
                }
            },
            //获取苹果健康数据信息
            getSleepInfo(value1) {
                var that = this;
                var startDate = 0,
                    endDate = new Date(),
                    limit = 10;
                // this.dialogVisible = false;
                if (window.plugins && window.plugins.healthkit) {
                    window.plugins.healthkit.querySampleType({
                        'startDate': startDate, // 开始时间
                        'endDate': endDate, // now 结束时间
                        'sampleType': 'HKCategoryTypeIdentifierSleepAnalysis',
                        'limit': limit,
                        'ascending': 'T',
                    }, function(value) {
                        that.appleHealthData = value; //获取苹果健康数据
                        that.getAppleHealthData(value);
                    })
                }
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
            // window.localStorage.UPlusApp_firstLogin_sleepMusicList = undefined; //测试用的+++++++s+
            window.localStorage.UPlusApp_getAppleHealthData = false; //测试用的+++++++s+
            if (window.localStorage.UPlusApp_getAppleHealthData === true || window.localStorage.UPlusApp_getAppleHealthData === 'true') {
                this.saveSleepInfo(); //获取苹果健康数据 
                this.getSleepInfo(); //获取今天的苹果健康数据
                this.getAppleHealthData(); //获取今天的苹果健康数据,测试用的++++++
            }
            if (window.localStorage.wh_fromPage == 'music') { //是否直接进入音乐页面
                this.activeSpan = 1;
            }
            if (window.localStorage.UPlusApp_firstLogin_sleepMusicList === undefined || window.localStorage.UPlusApp_firstLogin_sleepMusicList === 'undefined') { //第一次登陆
                window.localStorage.UPlusApp_firstLogin_sleepMusicList = true;
                window.localStorage.UPlusApp_getAppleHealthData = false;
            }
            var u = navigator.userAgent,
                app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) { //判断是否是苹果机
                this.dialogVisible = false;
            } else if (isIOS) {
                if ((window.localStorage.UPlusApp_firstLogin_sleepMusicList === true || window.localStorage.UPlusApp_firstLogin_sleepMusicList === "true") && window.plugins && window.plugins.healthkit) { //是否第一次进入,是否有applehealth 数据
                    this.dialogVisible = true;
                } else {
                    this.dialogVisible = false;
                }
            }
            var that = this;
            this.$axios.get('/api/getSleepPractice').then(function(res) {}).catch(function() { //获取音乐列表
                that.$axios.get('/static/testData/getSleepPractice.json').then(function(res) {
                    if (res.data.code == 'C0000') {
                        that.list = res.data.data.map(function(item) {
                            return {
                                name: item.lineTitle,
                                time: 10,
                                level: item.resourceType - 1,
                                imgurl: item.imgUrl,
                                musicurl: item.audioUrl
                            }
                        })
                        console.log(that.list)
                    }
                }).catch(function() {});
            });
            this.$axios.get('/api/getLast').then(function(res) {}).catch(function(res) { //获取用户最近一条测量记录,判断今天是否有记录信息
                that.$axios.get('/static/testData/getLast.json').then(function(res) {
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
                        } else {
                            that.paramslist = [];
                            that.detailAnalysis = "";
                            that.todayManuInputData = false;
                        }
                    }
                })
            }) 
            this.$axios.get('/api/getSleepInfo', {//获取睡眠资讯
                size: 7
            }).then(function(res) {}).catch(function(res) {
                that.$axios.get('/static/testData/getSleepInfo.json').then(function(res) {
                    console.log('aboutnews', res);
                    that.sleepnewslist = res.data;
                });
            })
            window.localStorage.UPlusApp_firstLogin_sleepMusicList = false;//非首次登陆
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