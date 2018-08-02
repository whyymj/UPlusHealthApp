<template>
    <div class='turnQuestions' refs='sleepTestList'>
        <bar :totalnum='totalnum' :curnum='curnum'></bar>
        <el-carousel indicator-position='none' :autoplay='autoplay' arrow='never' ref='carousel' :initial-index='curnum-1'>
            <el-carousel-item v-for="(item,index) in showlist" :key="index">
                <questionlist :list='item' :id='index' @selectQuestion='getOptions'></questionlist>
            </el-carousel-item>
        </el-carousel>
        <div class="prevbutton" @click='prev' v-if='curnum>1'><i class="el-icon-back"></i>上一题</div>
        <!-- <div class="nextbutton" @click='next' v-if='curnum<totalnum'>下一题</div> -->
        <div class='reInit' @click='reInit' v-if='reStart'>重新开始</div>
    </div>
</template>

<script>
    import questionlist from './questionsList';
    import bar from './progressBar';
    import bus from '../../assets/healthSleep/bus.js';
    import {
        setTimeout
    } from 'timers';
    import {
        Toast
    } from 'mint-ui';
    export default {
        props: ['list'],
        components: {
            bar,
            questionlist
        },
        data() {
            return {
                reStart: true,
                autoplay: false,
                totalnum: 1,
                curnum: 1,
                cacheOptions: {},
                showlist: []
            }
        },
        watch: {
            list() {
                this.totalnum = this.list.length;
                if (this.totalnum > 0) {
                    this.curnum = 1;
                } else {
                    this.curnum = 0;
                }
            }
        },
        methods: {
            reInit() {
                this.showlist = [];
                this.reStart = false;
                this.curnum = 1;
                this.cacheOptions = {};
                var that = this;
                this.$nextTick(function() {
                    that.showlist = that.list.map(function(item, index) {
                        var newItem = item;
                        newItem.default = '';
                        return newItem;
                    });
                })
            },
            prev() {
                this.$refs.carousel.prev();
                this.curnum = this.curnum - 1;
                this.reStart = false;
                this.$emit('turnQestion', this.curnum);
            },
            next() {
                this.$refs.carousel.next();
                this.curnum = this.curnum + 1;
                this.$emit('turnQestion', this.curnum);
            },
            getOptions(data) {
                var that = this;
                that.cacheOptions[data.questnum] = data.option;
                if (data.questnum < this.list.length - 1) {
                    this.next();
                }
            }
        },
        mounted() {
            var that = this;
            this.totalnum = this.list.length;
            if (this.totalnum > 0) {
                this.curnum = 1;
            }
            this.showlist = this.list;
            bus.$on('closeReInitButton', function() {
                that.reStart = false
            })
            bus.$on('submitResult', function() { //这里提交答案
                if (that.cacheOptions['' + (that.totalnum - 1)]) {
                    that.$router.push('/sleepTestResult');
                } else {
                    Toast({
                        message: '请先选择答案',
                        position: 'bottom',
                        duration: 2000
                    });
                }
            })
        }
    }
</script>

<style lang='scss' scoped>
    .reInit {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        background: rgba(38, 166, 255, 1);
        line-height: 2.6rem;
        height: 2.6rem;
        font-size: 0.8rem;
        font-family: 'PingFangSC-Regular';
        text-align: center;
        color: rgba(255, 255, 255, 1);
    }
    .turnQuestions {
        width: 100%;
        overflow: hidden;
        background: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
        top: 3rem;
    }
    .prevbutton {
        width: 5rem;
        height: 1rem;
        border-radius: 1rem;
        text-align: right;
        padding: 0 0.5rem;
        background: #fff;
        font-size: 0.75rem;
        font-family: 'PingFangSC-Regular';
        font-weight: 500;
        color: rgba(50, 182, 230, 1);
        position: absolute;
        top: 0;
        z-index: 10;
    } // .nextbutton {
    //     width: 5rem;
    //     height: 1.7rem;
    //     border-radius: 1rem;
    //     text-align: left;
    //     padding: 0 0.5rem;
    //     line-height: 1.7rem;
    //     color: #fff;
    //     font-size: 0.75rem;
    //     font-family: 'PingFangSC-Regular';
    //     font-weight: 500;
    //     background: rgba(50, 182, 230, 1);
    //     position: absolute;
    //     right: -2rem;
    //     bottom: 4rem;
    // }
</style>