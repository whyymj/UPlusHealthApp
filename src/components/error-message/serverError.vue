<template>
    <div class="errorMessage" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div class='errorBox'>
            <div class="top">
                <img class='error' src="/static/errorpage/error.png" alt="">
            </div>
            <div class="body_1">服务器飞了到外太空了</div>
            <div class="body_2">先看看资讯吧，也许很快它就飞回来了。</div>
        </div>
        <div class="news">
            <ul class='newsbox'>
                <li v-for="(item,index) in list" :key='index' class='new'>
                    <img src="/static/errorpage/exam1.png" alt="">
                    <h2>(这世界)那些不睡觉的传说，还是留给真正的天才吧！</h2>
                    <ul class="keywords">
                        <li>健康</li>
                        <li>健康</li>
                    </ul>
                </li>
            </ul>
            <div class="loadingtips">
                <span> 正在努力加载资讯...</span><img src="/static/errorpage/waiting.png" alt="">
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    @import "./errorMessage.scss";
    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .news {
        width: 100%;
        position: relative;
        .loadingtips {
            margin-top: -1px;
            background: #fff;
            width: 100%;
            height: 2rem;
            text-align: center;
            line-height: 2rem;
            color: #2283E2;
            font-size: 0.8rem;
            border-top: 1px solid #F5F5F5;
            font-family: 'PingFangSC-Regular';
            span,
            img {
                vertical-align: middle;
                margin: 0 0.2rem;
                font-size: 0.6rem
            }
            img {
                width: 0.8rem;
                height: 0.8rem;
                animation: rotate 1s linear infinite;
            }
        }
    }
    .errorBox {
        padding-bottom: 1rem;
        border-bottom: 1px solid #F5F5F5;
    }
    .error {
        width: 16rem;
        height: 13rem;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
    .newsbox {
        position: relative;
        width: 16rem;
        border-bottom: 1px solid #F5F5F5;
        margin: auto;
        .new {
            width: 100%;
            position: relative;
            height: 6rem;
            border-bottom: 1px solid #F5F5F5;
            img {
                position: absolute;
                width: 5rem;
                height: 4rem;
                top: 1rem;
                left: 0;
            }
            h2 {
                width: 10rem;
                position: absolute;
                top: 1rem;
                left: 5.5rem;
            }
            .keywords {
                width: 10rem;
                height: 1rem;
                position: absolute;
                bottom: 1rem;
                left: 5.5rem;
                li {
                    float: left;
                    width: auto;
                    height: 100%;
                    box-sizing: border-box;
                    border: 1px solid rgba(200, 200, 200, 1);
                    font-size: 0.6rem;
                    font-family: 'PingFangSC-Regular';
                    color: rgba(142, 142, 142, 1);
                    line-height: 0.95rem;
                    text-align: center;
                    padding: 0 0.3rem;
                    margin-right: 0.2rem;
                }
            }
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                list: [1, 2, 3, 4, 5, 6, 7, 8, 9], //新聞列表
                loading: false,
            };
        },
        methods: {
            loadMore() {
                this.loading = true;
                setTimeout(() => {
                    let last = this.list[this.list.length - 1];
                    for (let i = 1; i <= 10; i++) {
                        this.list.push(last + i);
                    }
                    this.loading = false;
                }, 2500);
            }
        }
    };
</script>

