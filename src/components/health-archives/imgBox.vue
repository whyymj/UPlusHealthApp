<template>
    <div style='width:100%; height:100%;position:relative;padding:1rem 0;'>
        <p class='shadow' :class='{active:activebox}' :style="{background:bgcolor}"></p>
        <p class="tips-r" :class='{active:activebox}' v-if="position=='right'">{{tips}}</p>
        <p class="tips" :class='{active:activebox}' v-else>{{tips}}</p>
        <div class='box' :class='{active:activebox}' :style="{background:bgcolor}" @click='toReport'><i :class='[icon]' :style='{color:color}'></i><span :style="{color:color}">{{meta.moudle_name}}</span></div>
        <div class='detail'><span class='cont'>{{meta.value}}</span><span class='unit' :style="{display:display}">{{unit}}</span></div>
    </div>
</template>

<script>
    import colorJudger from './color.js';
    import bus from './bus.js';
    import {
        setTimeout
    } from 'timers';
    export default {
        methods: {
            toReport() {
                var that = this;
                this.$router.push({
                    path: '/sleepMusicList',
                    query: that.meta
                })
            }
        },
        data() {
            return {
                unit: "",
                bgcolor: "#F7F7F7",
                color: "#fff",
                tips: '',
                icon: '',
                activebox: false
            }
        },
        props: ['meta', 'position'],
        computed: {
            display() {
                return this.meta.value != '' ? 'block' : 'none'
            }
        },
        mounted() {
            var that = this;
            bus.$on('scalebox', function(name) {
                if (!that.activebox && that.meta.moudle_name == name) {
                    that.activebox = true;
                    setTimeout(function() {
                        that.activebox = false;
                    }, 3000)
                }
            })
            var obj = colorJudger(this.meta.moudle_name, this.meta.level);
            this.tips = obj.tips;
            this.color = obj.color;
            this.bgcolor = obj.bg;
            this.unit = obj.unit;
            this.icon = obj.icon;
        }
    }
</script>

<style scoped lang='scss'>
    i {
        font-size: 1rem;
        line-height: 1.6rem;
    }
    .tips {
        position: absolute;
        height: 1.3rem;
        line-height: 1.3rem;
        top: 1.6rem;
        background: #ccc;
        left: 65%;
        width: 4rem;
        border-radius: .15rem;
        background-color: #26A6FF;
        font-weight: 600;
        color: #fff;
        font-size: 0.7rem;
        padding: 0 0.2rem;
        white-space: nowrap;
        overflow: hidden;
        -webkit-transform: perspective(150px) rotateY(-15deg);
        transform: perspective(150px) rotateY(-15deg);
        width: 0;
        -webkit-transition: width .3s ease-in;
        transition: width .3s ease-in;
        opacity: 0;
        &.active {
            z-index: 100;
            animation: scaleTips 3s;
        }
    }
    .tips-r {
        position: absolute;
        height: 1.3rem;
        line-height: 1.3rem;
        top: 1.6rem;
        background: #ccc;
        right: 70%;
        width: 4rem;
        border-radius: .15rem;
        background-color: #26A6FF;
        font-weight: 600;
        color: #fff;
        font-size: 0.7rem;
        padding: 0 0.2rem;
        white-space: nowrap;
        overflow: hidden;
        -webkit-transform: perspective(150px) rotateY(15deg);
        transform: perspective(150px) rotateY(15deg);
        width: 0; // -webkit-transition: width .3s ease-in;
        // transition: width .3s ease-in;
        opacity: 0;
        &.active {
            z-index: 100;
            animation: scaleTips 3s;
        }
    }
    .box.active {
        animation: scaleBox 3s;
    }
    .shadow {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        top: 1rem;
        opacity: 0.5;
    }
    .shadow.active {
        animation: scaleShadow 3s;
    }
    @keyframes scaleBox {
        0% {
            -webkit-transform: scale(1)  translateX(0);
            transform: scale(1) translateX(0);
        }
        20% {
            -webkit-transform: scale(1.2) translateX(-2px);
            transform: scale(1.2) translateX(-2px);
        }
        80% {
            -webkit-transform: scale(1.2) translateX(-2px);
            transform: scale(1.2) translateX(-2px);
        }
        100% {
            -webkit-transform: scale(1) translateX(0);
            transform: scale(1) translateX(0);
        }
    }
    @keyframes scaleTips {
        0% {
            width: 0;
            opacity: 1;
        }
        20% {
            width: 7rem;
            opacity: 1;
        }
        80% {
            width: 7rem;
            opacity: 1;
        }
        100% {
            width: 0;
            opacity: 0;
        }
    }
    @keyframes scaleShadow {
        0% {
            -webkit-transform: scale(1) translateX(0);
            transform: scale(1) translateX(0);
        }
        20% {
            -webkit-transform: scale(1.4) translateX(-2px);
            transform: scale(1.4)translateX(-2px);
        }
        80% {
            -webkit-transform: scale(1.4) translateX(-2px);
            transform: scale(1.4) translateX(-2px);
        }
        100% {
            -webkit-transform: scale(1) translateX(0);
            transform: scale(1) translateX(0);
        }
    }
    .box {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        position: relative;
        margin: auto;
        text-align: center;
        background: rgba(38, 165, 253, 0.2);
        box-sizing: content-box;
        span {
            color: #26A5FD;
            font-size: 0.5rem;
            position: absolute;
            left: 0;
            right: 0;
            text-align: center;
            margin: auto;
            bottom: 0.2rem;
        }
        img {
            position: absolute;
            width: 1rem;
            height: 1rem;
            left: 0;
            right: 0;
            margin: auto;
            top: 0.35rem;
        }
    }
    .detail {
        word-wrap: break-word;
        word-break: normal;
        width: 4.2rem;
        text-align: center;
        margin: auto;
        padding-top: 0.2rem;
    }
    .cont {
        font-size: 1.2rem;
        font-weight: 500;
        font-family: 'ArialMT';
        color: #3C3939;
        line-height: 1.4rem;
    }
    .unit {
        font-size: 0.6rem;
        font-weight: 500;
        font-family: ArialMT;
        color: #B3B3B3;
        line-height: 0.7rem;
    }
    .orangeBox {
        background: #FF6E00;
    }
    .redBox {
        background: #FF475D;
    }
    .greyBox {
        background: #f7f7f7;
        color: #26A5FD;
    }
</style>