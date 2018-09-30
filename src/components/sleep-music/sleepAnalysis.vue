<template>
    <div class='analysis'>
        <mycollapse :havedata='havedata'>
            <div class="showdata" @click='scalemenu'>
                <div class="imgbox">
                    <img src="/static/sleepMusicList/img5.svg" alt="">
                </div>
                <div class="title">睡眠时长</div>
                <div class="time"><span>{{Math.floor(sleepTimeLang/60)}}</span> 小时 <span>{{sleepTimeLang%60}}</span> 分 </div>
                <div class="level">
                </div><i class="el-icon-arrow-down rightarrow " v-if='rotateArr'></i><i class="el-icon-arrow-right rightarrow" v-else></i>
            </div>
        </mycollapse>
        <mymenu animateT='500'>
            <ul class='blocks'>
                <li v-for='(item,index) in paramslist' :key='index' :style="{float:index%2==1?'right':'left','border-right':index%2==0?'1px solid #F8F8F8':'none','border-top':(index==2||index==3)?'1px solid #F8F8F8':'none'}">
                    <h6>{{item.title}}</h6>
                    <img src="/static/sleepMusicList/img6.png" alt="" v-if='item.detail!=""' @click='showdetail(item.detail)'>
                    <p>
                        <span v-for='(val,key) in item.params' :key='key'>{{val.data}}<span> {{val.unit}} </span></span>
                    </p>
                </li>
            </ul>
        </mymenu>
        <div class="sleepAnalysis" v-if='detailAnalysis!=""'>
            <h1>睡眠分析</h1>
            <div class="detail">
                <p v-for='(item,index) in contArr' :key='index'>{{item}}
                </p>
            </div>
        </div>
        <showmodal :showmodal='show' @closemodal='closemodal'>
            <div class='modalContent'>{{tips}}</div>
        </showmodal>
    </div>
</template>

<script>
    import bus from '../eventbus.js';
    import showmodal from './myModal';
    import mycollapse from './mycollapse.vue';
    import mymenu from './mycollapse3.vue';
    import {
        setTimeout
    } from 'timers';
    export default {
        components: {
            showmodal,
            mymenu,
            mycollapse
        },
        props: ['paramslist', 'detailAnalysis', 'sleepTimeLang', 'level'],
        data() {
            return {
                isIos: true, //是否是ios机
                rotateArr: true,
                roting: false,
                havedata: true, //控制刪除模块按钮的显示
                show: false,
                tips: '',
                option: {
                    slidesPerView: 'auto',
                    notNextTick: true,
                    // swiper configs 所有的配置同swiper官方api配置
                    autoplay: 3000,
                    resistanceRatio: 0,
                    slideToClickedSlide: true,
                    // direction : 'vertical',
                    // effect: "coverflow",
                    // loop : true,
                    initialSlide: 0,
                    grabCursor: true,
                    setWrapperSize: true,
                    spaceBetween: 0,
                    centeredSlides: false,
                    // autoHeight: true,
                    // paginationType:"bullets",
                    paginationClickable: true,
                    // scrollbar:'.swiper-scrollbar',
                    mousewheelControl: true,
                    observeParents: true,
                },
            }
        },
        computed: {
            sleepQuality() {
                var quality = ''
                if (this.level == 1) {
                    quality = '很低'
                } else if (this.level == 2) {
                    quality = '较低'
                } else if (this.level == 3) {
                    quality = '正常'
                } else if (this.level == 4) {
                    quality = '较高'
                } else if (this.level == 5) {
                    quality = '很高'
                }
                return quality
            },
            contArr() {
                if (typeof this.detailAnalysis == 'string') {
                   
                    return this.detailAnalysis.split('<br />');
                }
            }
        },
        watch: {
        },
        mounted() {
            var u = navigator.userAgent
            this.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            var that = this;
            document.getElementsByTagName('body')[0].onclick = function(e) { //删除按钮
                if (e.target.getAttribute('class') == 'el-icon-delete' || e.target.getAttribute('class') == 'cannt_getback') {
                    that.deleteThis()
                }
            };
        },
        methods: {
            scalemenu() {
                var that = this;
                if (!this.roting) {
                    this.roting = true;
                    setTimeout(function() {
                        that.roting = false;
                    }, 500)
                    this.rotateArr = !this.rotateArr;
                    bus.$emit('scalemenu');
                }
            },
            deleteThis() {
                this.$emit('deleteThis')
            },
            toManuInput() {
                this.$router.push({
                    path: '/sleepManuInput',
                    query: {}
                });
            },
            showdetail(tip) {
                this.tips = tip;
                this.show = true;
            },
            closemodal() {
                this.show = false;
            }
        }
    };
</script>

<style lang='scss' scoped>
    .modalContent {
        font-size: 0.7rem;
        font-family: 'PingFangSC-Regular';
        color: rgba(51, 51, 51, 1);
        line-height: 1rem;
        width: 12rem;
        text-align: center;
    }
    .verticalline {
        width: 2px;
        height: 2rem;
        background: rgba(245, 245, 245, 1);
        top: 1rem;
        left: 0;
        right: 0;
        margin: auto;
    }
    .analysis {
        width: 17rem;
        margin: 0.5rem auto 0;
        position: relative;
        .showdata {
            position: relative;
            width: 100%;
            height: 4rem;
            background: #fff;
            h6 {
                font-size: 0.6rem;
                font-family: 'PingFangSC-Regular';
                color: rgba(153, 153, 153, 1);
                position: absolute;
                left: 9.5rem;
                top: 1rem;
            }
            .onlyone {
                width: 0.7rem;
                height: 0.7rem;
                position: absolute;
                top: 1rem;
                right: 1.5rem;
            }
            .supplement {
                width: 100%;
                height: 2rem;
                border-top: 1px solid rgba(245, 245, 245, 1);
                position: absolute;
                left: 0;
                bottom: 0;
                font-size: 0.7rem;
                font-family: 'PingFangSC-Regular';
                color: rgba(34, 131, 226, 1);
                line-height: 2rem;
                text-align: center;
            }
            p {
                position: absolute;
                left: 9.5rem;
                top: 2rem;
                span {
                    font-size: 1.1rem;
                    font-weight: 500!important;
                    font-family: 'NotoSansCJKsc-Medium';
                    color: rgba(51, 51, 51, 1);
                    font-weight: 600;
                    span {
                        font-size: 0.6rem;
                        font-family: 'PingFangSC-Regular';
                        color: rgba(153, 153, 153, 1);
                    }
                }
            }
            div {
                position: absolute;
            }
            .imgbox {
                width: 2.5rem;
                height: 2.5rem;
                background: #e9f6fe; // opacity: 0.1;
                border-radius: 50%;
                left: 0.75rem;
                top: 0.75rem;
                img {
                    width: 1.3rem;
                    position: absolute;
                    top: 0.5rem;
                    left: 0.5rem;
                }
            }
            .title {
                font-size: 0.6rem;
                font-family: "PingFangSC-Regular";
                color: rgba(153, 153, 153, 1);
                position: absolute;
                top: 1rem;
                left: 4rem;
                width: 4rem;
            }
            .time {
                font-size: 0.5rem;
                font-family: "PingFangSC-Regular";
                color: rgba(153, 153, 153, 1);
                position: absolute;
                top: 2rem;
                left: 4rem; // width: 4rem;
                span {
                    font-size: 1.1rem;
                    font-weight: 500!important;
                    font-family: 'NotoSansCJKsc-Medium';
                    color: rgba(51, 51, 51, 1);
                    font-weight: 600;
                }
            }
            .level {
                padding: 0 0.2rem;
                height: 0.9rem;
                /*background: rgba(34, 131, 226, 1);*/
                background: #FFFFFF;
                border-radius: 0.1rem;
                font-size: 0.6rem;
                font-family: "PingFangSC-Regular";
                color: rgba(255, 255, 255, 1);
                text-align: center;
                line-height: 0.9rem;
                right: 1.5rem;
                top: 1.5rem;
            }
            .rightarrow {
                position: absolute;
                right: 0.5rem;
                top: 1.65rem;
                font-size: 0.7rem;
                color: #DBDBDB;
            }
        }
        .blocks {
            width: 100%;
            position: relative;
            overflow: hidden;
            li {
                width: 50%;
                height: 4rem;
                position: relative;
                float: left;
                background: #fff;
                box-sizing: border-box;
                img {
                    width: 0.7rem;
                    height: 0.7rem;
                    position: absolute;
                    top: 0.5rem;
                    right: 0.5rem;
                }
                h6 {
                    font-size: 0.6rem;
                    font-family: 'PingFangSC-Regular';
                    color: rgba(153, 153, 153, 1);
                    position: absolute;
                    left: 1rem;
                    top: 0.5rem;
                }
                p {
                    position: absolute;
                    right: 0.8rem;
                    bottom: 0.5rem;
                    span {
                        font-size: 1.1rem;
                        font-weight: 500!important;
                        font-family: 'NotoSansCJKsc-Medium';
                        color: rgba(51, 51, 51, 1);
                        font-weight: 600;
                        span {
                            font-size: 0.6rem;
                            font-family: 'PingFangSC-Regular';
                            color: rgba(153, 153, 153, 1);
                        }
                    }
                }
            }
        }
        .sleepAnalysis {
            width: 100%;
            background: #fff;
            margin: 0.5rem auto 0;
            box-sizing: border-box;
            padding: 1rem;
            h1 {
                font-size: 0.8rem;
                font-family: 'PingFangSC-Medium';
                color: rgba(17, 17, 17, 1);
                font-weight: 600;
                margin-bottom: 0.5rem;
                padding: 0;
            }
            .detail {
                width: 100%;
                p {
                    font-size: 0.7rem;
                    font-family: 'PingFangSC-Regular';
                    color: rgba(102, 102, 102, 1);
                }
            }
        }
    }
    .menu {
        width: 2rem;
    }
</style>