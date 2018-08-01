<template>
    <div class='analysis'>
        <div class="showdata" v-if='haveDetail'>
            <div class="imgbox">
                <img src="/static/sleepMusicList/img5.png" alt="">
            </div>
            <div class="title">睡眠时长</div>
            <div class="time"><span>6</span>小时<span>32</span>分</div>
            <div class="level">正常</div>
        </div>
        <div class="showdata" style='height:6rem;' v-else>
            <div class="imgbox">
                <img src="/static/sleepMusicList/img5.png" alt="">
            </div>
            <div class="title">睡眠时长</div>
            <div class="time"><span>6</span>小时<span>32</span>分</div>
            <div class='verticalline'></div>
            <h6>当日作息</h6>
            <img src="/static/sleepMusicList/img6.png" alt="" @click='showdetail' class='onlyone'>
            <p>
                <span>23:32<span>-</span></span> <span>8:32<span></span></span>
            </p>
            <div class='supplement'>补全记录</div>
        </div>
        <ul class='blocks'>
            <li v-for='(item,index) in paramslist' :key='index' :style="{float:index%2==1?'right':'left'}">
                <h6>{{item.title}}</h6>
                <img src="/static/sleepMusicList/img6.png" alt="" v-if='item.detail!=""' @click='showdetail'>
                <p>
                    <span v-for='(val,key) in item.params' :key='key'>{{val.data}}<span>{{val.unit}}</span></span>
                </p>
            </li>
        </ul>
        <div class="sleepAnalysis">
            <h1>睡眠分析</h1>
            <div class="detail">
                <p>您和否定法苏哦跟扫下回复可见啊大家发 都会放假后 待发货US和覅闳六点和覅uhuiiush符合符合uhuehruue㛑㛑uehisaudhf李俊峰六黑历史风口浪尖不是。</p>
                <p>您和否定法苏哦跟扫下回复可见啊大家发 都会放假后 待发货US和覅闳六点和覅uhuiiush符合符合uhuehruue㛑㛑uehisaudhf李俊峰六黑历史风口浪尖不是。</p>
            </div>
        </div>
        <showmodal :showmodal='show' @closemodal='closemodal'>
            <div class='modalContent'>当日作息即当日上床歇息至起床时间</div>
        </showmodal>
    </div>
</template>

<script>
    import showmodal from './myModal';
    export default {
        components: {
            showmodal
        },
        props: ['paramslist'],
        data() {
            return {
                show: false,
                haveDetail: false
            }
        },
        mounted() {},
        methods: {
            showdetail() {
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
        margin: 1rem auto 0;
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
                text-align:center;
            }
            p {
                position: absolute;
                left: 9.5rem;
                top: 2rem;
                span {
                    font-size: 0.8rem;
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
                left: 4rem;
                width: 4rem;
                span {
                    font-size: 0.8rem;
                    font-family: 'NotoSansCJKsc-Medium';
                    color: rgba(51, 51, 51, 1);
                    font-weight: 600;
                }
            }
            .level {
                padding: 0 0.2rem;
                height: 0.9rem;
                background: rgba(34, 131, 226, 1);
                border-radius: 0.2rem;
                font-size: 0.6rem;
                font-family: "PingFangSC-Regular";
                color: rgba(255, 255, 255, 1);
                text-align: center;
                line-height: 0.9rem;
                right: 1rem;
                top: 1.5rem;
            }
        }
        .blocks {
            width: 100%;
            position: relative;
            overflow: hidden;
            li {
                width: 8.25rem;
                height: 3rem;
                position: relative;
                float: left;
                background: #fff;
                margin-top: 0.5rem;
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
                    right: 0.6rem;
                    bottom: 0.2rem;
                    span {
                        font-size: 0.8rem;
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
</style>