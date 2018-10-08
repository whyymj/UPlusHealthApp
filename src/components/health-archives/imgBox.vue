<template>
    <div style='width:100%; height:100%;position:relative;padding:1rem 0;' class='wh_imgbox'>
        <p class='shadow' :class='{active:activebox}' :style="{background:bgcolor,width:boxW,height:boxW}"></p>
        <p class="tips-r" :class='{active:activebox}' v-if="position=='right'">{{tips}}</p>
        <p class="tips" :class='{active:activebox}' v-else>{{tips}}</p>

        <div class='box' :class='{active:activebox}' :style="{background:bgcolor,width:boxW,height:boxW}" @click='toReport'><i :class='[icon]' :style='{color:color}'><i class="path2" v-if='icon=="ico-sleep_icon"' style='font-size:1.3rem'></i><i class="path3" style='font-size:1.3rem' v-if='icon=="ico-sleep_icon"'></i><i class="path4" style='font-size:1.3rem' v-if='icon=="ico-sleep_icon"'></i><i style='font-size:1.3rem' class="path5" v-if='icon=="ico-sleep_icon"'></i></i><span :style="{color:color}">{{meta.moudle_name}}</span></div>
        <div class='detail' v-if='icon!="ico-sleep_icon"'><span class='cont' :style="{display:display}">{{meta.value}}</span><span class='unit' :style="{display:display}">{{unit}}</span></div>
        <!-- 下面是睡眠时间的显示 -->
        <div class='detail sleepdetail' v-else><span class='cont' :style="{display:display}">{{Math.floor(meta.value/60)}}<span class='unit' style='font-weight:700' :style="{display:display}">小时</span></span><span class='cont' :style="{display:display}">{{Math.floor(meta.value%60)}}<span class='unit' style='font-weight:700'  :style="{display:display}">分</span></span>
        </div>
    </div>
</template>

<script>
    import colorJudger from './color.js';
    import bus from '../eventbus.js';
    import {
        setTimeout
    } from 'timers';
    export default {
        methods: {
            toReport() {
                var that = this;
                this.goPages(this.meta)
            },
            async goPages(item) {
                var that = this;
                switch (item.moudle_name) {
                    case '体重':
                        if (window._member_id == '') { // user
                            try {
                                const result = await this.$axios.post('/api/user/info', {
                                    phone: ''
                                })
                                if (result.data.code === 'C0000') {
                                    if (result.data.data.target_weight === '' || result.data.data.target_weight === 0) { // new user
                                        this.$router.push({
                                            path: '/setTargetWeight'
                                        })
                                    } else {
                                        this.$router.push({
                                            path: '/weight'
                                        })
                                    }
                                }
                            } catch (err) {
                                this.$router.push({
                                    path: '/weight'
                                })
                            }
                        } else { // member
                            let res = this.createdList.filter(_ => {
                                return _.member_id === window._member_id
                            })
                            if (res[0].is_first_set_tw === 1) { // 未设置目标体重
                                this.$router.push({
                                    path: '/setTargetWeight'
                                })
                            } else {
                                this.$router.push({
                                    path: '/weight'
                                })
                            }
                        }
                        window._weight_selected_date = ''
                        break
                    case 'BMI':
                    case '体脂率':
                    case '基础代谢':
                    case '脂肪重量':
                    case '内脏脂肪等级':
                    case '肌肉重量':
                    case '肌肉率':
                    case '水份':
                    case '水含量':
                    case '蛋白质':
                    case '骨量':
                        window._weight_selected_date = ''
                        this.$router.push({
                            path: '/weight'
                        })
                        break
                    case '血压':
                        window._pressure_selected_date = ''
                        this.$router.push({
                            path: '/pressure'
                        })
                        break
                    case '血糖':
                        window._suger_selected_date = ''
                        this.$router.push({
                            path: '/bloodSugar'
                        })
                        break
                    case '体温':
                        window._temperature_selected_date = ''
                        this.$router.push({
                            path: '/temperature'
                        })
                        break
                    case '心电':
                        window._ecg_selected_date = ''
                        this.$router.push({
                            path: '/ecg'
                        })
                        break
                    case '血氧':
                        window._oxygen_selected_date = ''
                        this.$router.push({
                            path: '/oxygen'
                        })
                        break
                    case '睡眠':
                        this.$router.push({
                            path: '/sleepMusicList',
                            query: that.meta
                        })
                        break
                }
            },
        },
        data() {
            return {
                unit: "",
                bgcolor: "#F7F7F7",
                color: "#fff",
                tips: '',
                icon: '',
                activebox: false,
                boxW: 0
            }
        },
        props: ['meta', 'position', 'createdList'],
        computed: {
            display() {
                console.log(this.meta, this.meta.value, this.meta.value == '' || this.meta.value == 0)
                return (this.meta.value == '' || this.meta.value == 0) ? 'none!important' : 'block'
            }
        },
        watch: {
            meta() {
                var obj = colorJudger(this.meta.moudle_name, this.meta.level);
                this.tips = obj.tips;
                this.color = obj.color;
                this.bgcolor = obj.bg;
                this.unit = obj.unit;
                this.icon = obj.icon;
            }
        },
        mounted() {
            var that = this;
            const w = document.documentElement.clientWidth || document.body.clientWidth;
            this.boxW = 2.6 * (w / 375) * 20 + "px";
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
        text-align: right;
        position: absolute;
        height: 1.3rem;
        line-height: 1.5rem;
        top: 1.6rem;
        background: #ccc;
        left: 68%;
        width: 4.5rem;
        border-radius: .15rem;
        background-color: #26A6FF;
        font-weight: 600;
        color: #fff;
        font-size: 0.7rem;
        padding: 0 0.2rem;
        white-space: nowrap;
        overflow: hidden;
        -webkit-transform: perspective(150px) rotateY(-15deg);
        transform: perspective(600px) rotateY(-25deg);
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        /* Chrome 和 Safari */
        box-shadow: 0 0 1px #fff;
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
        line-height: 1.5rem;
        top: 1.6rem;
        background: #ccc;
         box-shadow: 0 0 1px #fff;
        right: 72%;
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
        transform: perspective(400px) rotateY(25deg);
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        /* Chrome 和 Safari */
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
            -webkit-transform: scale(1) translateX(0);
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
            -webkit-transform-style: preserve-3d;
            width: 0;
            opacity: 1;
        }
        20% {
            width: 8rem;
            opacity: 1;
        }
        80% {
            width: 8rem;
            opacity: 1;
        }
        100% {
            width: 0;
            opacity: 0;
        }
    }
    @-webkit-keyframes scaleTips {
        0% {
            -webkit-transform-style: preserve-3d;
            width: 0;
            opacity: 1;
        }
        20% {
            -webkit-transform-style: preserve-3d;
            width: 8rem;
            opacity: 1;
        }
        80% {
            -webkit-transform-style: preserve-3d;
            width: 8rem;
            opacity: 1;
        }
        100% {
            -webkit-transform-style: preserve-3d;
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
            transform: scale(1.4) translateX(-2px);
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
        // width: 2.56666rem;
        // height: 2.56666rem;
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
    .sleepdetail {
        span {
            display: inline!important;
        }
    }
    .cont {
        font-size: 1.2rem;
        font-weight: 600;
        font-family: 'ArialMT';
        color: #3C3939;
        line-height: 1.4rem;
    }
    .unit {
        font-size: 0.6rem;
        font-weight: 600;
        font-family: 'ArialMT';
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