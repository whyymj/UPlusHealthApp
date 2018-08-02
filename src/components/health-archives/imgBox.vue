<template>
    <div style='width:100%; height:100%;position:relative;padding:1rem 0;'>
        <div class='box' :class='{active:activebox}' :style='{background:bgcolor}'><i :class='[icon]' :style='{color:color}'></i><span :style="{color:color}">{{cont.moudle_name}}</span></div>
        <div class='detail'><span class='cont'>{{cont.value}}</span><span class='unit' :style="{display:display}">{{unit}}</span></div>
    </div>
</template>

<script>
    import colorJudger from './color.js';
    import bus from './bus.js';
    import {
        setTimeout
    } from 'timers';
    export default {
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
        props: ['cont'],
        computed: {
            display() {
                return this.cont.value != '' ? 'block' : 'none'
            }
        },
        mounted() {
            var that = this;
            bus.$on('scalebox', function(name) {
                if (!that.activebox && that.cont.moudle_name == name) {
                    console.log('name', name);
                    that.activebox = true;
                    setTimeout(function() {
                        that.activebox = false;
                    }, 2000)
                }
            })
            var obj = colorJudger(this.cont.moudle_name, this.cont.level);
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
    .box.active {
        animation: scaleBox 2s;
    }
    @keyframes scaleBox {
        0% {
            box-shadow: 0 0 0 0 rgba(51, 51, 51, .1);
            -webkit-transform: scale(1);
            transform: scale(1);
        }
        25% {
            box-shadow: 0 0 0 4px rgba(51, 51, 51, .1);
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }
        75% {
            box-shadow: 0 0 0 4px rgba(51, 51, 51, .1);
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(51, 51, 51, .1);
            -webkit-transform: scale(1);
            transform: scale(1);
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