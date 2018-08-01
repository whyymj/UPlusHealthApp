<template>
    <div class='sleepMusic'>
        <div class="tabbars">
            <div class="tabbar" @click='clickSpan(0)'><span :class='{active:activeSpan==0}'>睡眠报告</span></div>
            <div class="tabbar" @click='clickSpan(1)'><span :class='{active:activeSpan==1}'>睡眠练习</span></div>
        </div>
        <div class='content'>
            <div class="page page1" v-show='activeSpan==0'>
                <mycollapse @showDetail='showDater'>
                    <div slot='main' style='height:4rem;overflow:hidden;padding-top:-4rem;' v-if='!showDateSelect'>
                        <myDatePicker hidetop='true'></myDatePicker>
                    </div>
                    <div slot='slider'>
                        <myDatePicker></myDatePicker>
                    </div>
                </mycollapse>
                <sleepanalysis :paramslist='paramslist'></sleepanalysis>
                <datadeviation></datadeviation>
                <nodata></nodata>
                <echarts></echarts>
                <!-- 睡眠百科 -->
                <aboutSleep v-for='(item,index) in sleepAboutData' :data='item' :key='index'></aboutSleep>
                <aboutNews></aboutNews>
                <div class="buttons">
                    <div class="manuinput">手动录入</div>
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
    </div>
</template>

<script>
    import mycollapse from "./myCollapse";
    import myDatePicker from './myDatePicker.vue';
    import musiclist from "./musicList.vue";
    import player from "./player.vue";
    import sleepanalysis from './sleepAnalysis.vue';
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
            mycollapse,
            myDatePicker,
            sleepanalysis,
            echarts,
            aboutSleep,
            aboutNews,
            datadeviation,
            nodata
        },
        data() {
            return {
                showDateSelect: false,
                activeName: "",
                list: [{
                        name: "腹式呼吸练习1",
                        time: 10,
                        level: 0,
                        imgurl: "/static/sleepMusicList/img2.png",
                        musicurl: ""
                    },
                    {
                        name: "腹式呼吸练习2",
                        time: 10,
                        level: 0,
                        imgurl: "/static/sleepMusicList/img2.png",
                        musicurl: ""
                    },
                    {
                        name: "腹式呼吸练习3",
                        time: 10,
                        level: 1,
                        imgurl: "/static/sleepMusicList/img2.png",
                        musicurl: ""
                    },
                    {
                        name: "腹式呼吸练习4",
                        time: 10,
                        level: 2,
                        imgurl: "/static/sleepMusicList/img2.png",
                        musicurl: ""
                    },
                    {
                        name: "腹式呼吸练习5",
                        time: 10,
                        level: 0,
                        imgurl: "/static/sleepMusicList/img2.png",
                        musicurl: ""
                    },
                    {
                        name: "腹式呼吸练习6",
                        time: 10,
                        level: 0,
                        imgurl: "/static/sleepMusicList/img2.png",
                        musicurl: ""
                    },
                    {
                        name: "腹式呼吸练习7",
                        time: 10,
                        level: 0,
                        imgurl: "/static/sleepMusicList/img2.png",
                        musicurl: ""
                    }
                ],
                activeSpan: 0,
                paramslist: [{
                    title: '睡眠效率',
                    detail: '',
                    params: [{
                        data: 90,
                        unit: '%'
                    }]
                }, {
                    title: '入睡速度（分）',
                    detail: '',
                    params: [{
                        data: 10,
                        unit: '分钟'
                    }]
                }, {
                    title: '当日作息',
                    detail: '123',
                    params: [{
                        data: '23:32',
                        unit: '-'
                    }, {
                        data: '06:56',
                        unit: ''
                    }]
                }, {
                    title: '入睡速度（分）',
                    detail: '',
                    params: [{
                        data: 6,
                        unit: '小时'
                    }, {
                        data: 7,
                        unit: '分钟'
                    }]
                }],
                sleepAboutData: [{
                    title: '睡眠测试(本服务由寝安睡眠提供)',
                    content: '睡眠小测试，了解自己的睡眠问题。',
                    src: "/static/sleepMusicList/exm1.jpg",
                    link: '测一测',
                    linkurl: '/sleepTest'
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
            handleClick() {},
            clickSpan(index) {
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
            border-top:1px solid #F5F5F5;
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