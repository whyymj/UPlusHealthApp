<template>
    <div class='sleepList'>
        <h1>记录睡眠时间</h1>
        <div class='row' v-for='(item,index) in list' :key='index' @click='openPicker(index)'>
            <img :src="item.url" alt="">
            <span class="title">{{item.title}}</span>
            <span class="cont">{{item.content}}</span>
            <span></span>
        </div>
        <timepicker @confirm='confirm' :time_gap='time_gap'></timepicker>
    </div>
</template>

<script>
    import timepicker from './mytimepicker';
    import bus from '../eventbus.js';
    import {
        Toast
    } from 'mint-ui';
    export default {
        components: {
            timepicker
        },
        props: ['list'],
        data() {
            return {
                popupVisible: true,
                tips: '',
                time_gap: ['18:00-23:59', '00:00-08:00'],
                index: 0,
                pickerValue: '',
                gotobed: [0, 0],
                startsleep: [0, 0],
                wakeup: [8, 0],
                leavebed: [8, 0],
                cansub: [true, true, true], //记录是否可以提交
                today: '',
                yesterday: ''
            }
        },
        methods: {
            checkstartsleep() { //睡着时间不能早于上床时间
                var tmp1, tmp2, flag = false;
                tmp1 = this.gotobed[0] * 60 + this.gotobed[1] * 1;
                tmp2 = this.startsleep[0] * 60 + this.startsleep[1] * 1;
                if (this.gotobed[0] >= 18) {
                    if (this.startsleep[0] >= 18) {
                        if (tmp1 > tmp2) {
                            flag = true;
                        }
                    }
                } else {
                    if (this.startsleep[0] >= 18) {
                        flag = true;
                    } else {
                        if (tmp1 > tmp2) {
                            flag = true;
                        }
                    }
                }
                this.cansub[0] = true;
                if (flag) {
                    this.cansub[0] = false;
                    Toast('睡着时间不能早于上床时间...')
                }
            },
            checkwakeup() {
                var tmp1, tmp2, flag = false;
                tmp1 = this.startsleep[0] * 60 + this.startsleep[1] * 1;
                tmp2 = this.wakeup[0] * 60 + this.wakeup[1] * 1;
                if (this.startsleep[0] >= 18) {
                    if (this.wakeup[0] >= 18) {
                        if (tmp2 - tmp1 < 15) {
                            flag = true;
                        }
                    }
                } else {
                    if (this.wakeup[0] >= 18) {
                        flag = true;
                    } else {
                        if (tmp2 - tmp1 < 15) {
                            flag = true;
                        }
                    }
                }
                this.cansub[1] = true;
                if (flag) {
                    this.cansub[1] = false;
                    Toast('睡醒时间必须大于睡着时间15分钟...')
                }
            },
            checkleavebed() {
                var tmp1, tmp2, flag = false;
                tmp1 = this.wakeup[0] * 60 + this.wakeup[1] * 1;
                tmp2 = this.leavebed[0] * 60 + this.leavebed[1] * 1;
                if (this.wakeup[0] >= 18) {
                    if (this.leavebed[0] >= 18) {
                        if (tmp1 > tmp2) {
                            flag = true;
                        }
                    }
                } else {
                    if (this.leavebed[0] >= 18) {
                        flag = true;
                    } else {
                        if (tmp1 > tmp2) {
                            flag = true;
                        }
                    }
                }
                this.cansub[2] = true;
                console.log(tmp1, tmp2, ':::::');
                if (flag) {
                    this.cansub[2] = false;
                    Toast('起床时间不能早于睡醒时间...')
                }
            },
            openPicker(index) {
                this.index = index;
                var h, m, tmp;
                // this.$refs.picker.open();
                if (this.index == 0) {
                    this.time_gap = ['18:00-23:59', '00:00-08:00'];
                }
                if (this.index == 1 && this.gotobed.length) {
                    h = this.gotobed[0] * 1;
                    m = this.gotobed[1] * 1;
                    h = h > 9 ? h : '0' + h;
                    m = m > 9 ? m : '0' + m;
                    if (h * 1 >= 18) {
                        this.time_gap = [h + ':' + m + '-23:59', '00:00-08:00'];
                    } else {
                        this.time_gap = [h + ':' + m + '-08:00'];
                    }
                    console.log(this.time_gap);
                }
                if (this.index == 2) {
                    h = this.startsleep[0] * 1;
                    m = this.startsleep[1] * 1;
                    tmp = h * 60 + m + 15;
                    h = Math.floor(tmp / 60);
                    m = tmp % 60;
                    h = h > 9 ? h : '0' + h;
                    m = m > 9 ? m : '0' + m;
                    if (h * 1 >= 18) {
                        this.time_gap = [h + ':' + m + '-23:59', '00:00-17:59'];
                    } else {
                        this.time_gap = [h + ':' + m + '-18:00'];
                    }
                }
                if (this.index == 3) {
                    h = this.wakeup[0] * 1;
                    m = this.wakeup[1] * 1;
                    h = h > 9 ? h : '0' + h;
                    m = m > 9 ? m : '0' + m;
                    if (h * 1 >= 18) {
                        this.time_gap = [h + ':' + m + '-23:59', '00:00-17:59'];
                    } else {
                        this.time_gap = [h + ':' + m + '-18:00'];
                    }
                }
                bus.$emit('toggle');
            },
            confirm(data) {
                if (this.index == 0) {
                    this.gotobed = data;
                    this.checkstartsleep();
                } else if (this.index == 1) {
                    this.startsleep = data;
                    this.checkstartsleep();
                    this.checkwakeup()
                } else if (this.index == 2) {
                    this.wakeup = data;
                    this.checkleavebed();
                } else if (this.index == 3) {
                    this.leavebed = data;
                }
                this.list[this.index].content = data[0] + ":" + data[1];
                this.list = this.list;
                var cansub = true;
                this.cansub.map(function(item) {
                    if (!item) {
                        cansub = false
                    }
                })
                this.$emit('getSleepTimes', this.list, cansub);
            },
            whycannotsub() {
                this.checkstartsleep();
                this.checkwakeup();
                this.checkleavebed();
            }
        },
        mounted() {
            var that = this;
            bus.$on('whycannotsub', function() {
                that.whycannotsub();
            })
           
        }
    }
</script>

<style lang='scss' scoped>
    .sleepList {
        width: 100%;
        overflow: hidden;
        margin-bottom: 1rem;
        h1 {
            font-size: 0.9rem;
            font-family: PingFangSC-Regular;
            color: rgba(17, 17, 17, 1);
            height: 3rem;
            line-height: 3rem;
            width: 17rem;
            margin: auto;
            font-weight: 500;
        }
        .row {
            position: relative;
            height: 3rem;
            width: 17rem;
            border-bottom: 1px solid rgba(245, 245, 245, 1);
            margin: auto;
            img {
                width: 1.5rem;
                height: 1.5rem;
                margin: 0.7rem 0 0 0.5rem;
            }
            span {
                position: absolute;
                height: 3rem;
                top: 0;
                line-height: 3rem;
                font-size: 0.75rem;
                font-family: 'PingFangSC-Regular';
                color: rgba(51, 51, 51, 1);
            }
            .cont {
                right: 0;
                color: #32B6E6;
            }
            .title {
                left: 2.5rem;
            }
        }
    }
</style>