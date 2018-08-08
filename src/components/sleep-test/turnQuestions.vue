<template>
    <div class='turnQuestions' refs='sleepTestList'>
        <bar :totalnum='totalnum' :curnum='curnum' v-if='totalnum>0'></bar>
        <el-carousel class='carousels' indicator-position='none' :autoplay='autoplay' arrow='never' ref='carousel' :initial-index='initialindex' v-if='totalnum>0'>
            <el-carousel-item v-for="(item,index) in showlist" :key="index" style='height:20rem'>
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
                doubleclick: false,
                reStart: false,
                autoplay: false,
                totalnum: 1,
                curnum: 1,
                cacheOptions: {},
                showlist: [],
                initialindex: 0,
                bar: '',
                params: ''
            }
        },
        watch: {
            list() {
                var that = this;
                this.showlist = this.list;
                this.totalnum = this.list.length;
                if (this.totalnum > 0) {
                    this.curnum = 1;
                } else {
                    this.curnum = 0;
                }
                var lasttestnum = 0;
                this.list.map(function(item, index) {
                    that.cacheOptions[index] = {
                        option: [],
                        lineId: item.lineId
                    };
                    item.options.map(function(val, key) {
                        var option = [];
                        if (val.checked === true || val.checked === 'true') {
                            lasttestnum = index;
                            option.push(key);
                        }
                        that.cacheOptions[index].option = option;
                    })
                });
                this.curnum = lasttestnum;
                if (this.curnum > 0) {
                    this.reStart = true;
                }
                this.initialindex = this.curnum >= 0 ? this.curnum : 0;
            }
        },
        methods: {
            reInit() {
                this.showlist = [];
                this.reStart = false;
                this.curnum = 1;
                this.initialindex = 0;
                this.cacheOptions = {};
                var that = this;
                this.$nextTick(function() {
                    that.showlist = that.list.map(function(item, index) {
                        var option = item.options.map(function(item, index) {
                            var newitem = item;
                            newitem.checked = false;
                            return newitem
                        })
                        return {
                            title: item.title,
                            type: item.type,
                            "templateId": item.templateId,
                            options: option,
                            "lineId": item.lineId
                        };
                    });
                })
            },
            prev() {
                this.reStart = false;
                if (this.curnum > 0) {
                    this.$refs.carousel.prev();
                    this.curnum--;
                }
                this.$emit('turnQestion', this.curnum);
            },
            next() {
                if (this.curnum < this.list.length) {
                    this.$refs.carousel.next();
                    this.curnum++;
                }
                this.$emit('turnQestion', this.curnum);
            },
            getOptions(data) {
                var that = this;
                that.cacheOptions[data.questnum] = {
                    option: data.option,
                    lineId: that.list[data.questnum].lineId
                };
                if (!that.doubleclick) {
                    this.$axios.post('', { //实时保存结果
                        templateId: that.params.templateId,
                        tuId: that.params.tuId,
                        inputVal: '' + that.cacheOptions[data.questnum].lineId + '&' + that.cacheOptions[data.questnum].option.join(',')
                    }).then(function() {})
                    that.doubleclick = true;
                    this.bar = setTimeout(function() {
                        that.doubleclick = false
                    }, 300);
                    this.next();
                }
            }
        },
        mounted() {
            this.params = this.$route.query;
            var swiper = this.$refs.carousel.onSlideChangeEnd;
            var that = this;
            this.showlist = this.list;
            if (this.totalnum > 0) {
                this.curnum = 1;
            } else {
                this.curnum = 0;
            }
            var lasttestnum = 0;
            if (this.list) {
                this.list.map(function(item, index) {
                    that.cacheOptions[index] = {
                        option: [],
                        lineId: item.lineId
                    };
                    var option = [];
                    if (val.checked === true || val.checked === 'true') {
                        lasttestnum = index;
                        option.push(key);
                    }
                    that.cacheOptions[index].option = option;
                });
                this.curnum = lasttestnum;
            }
            this.totalnum = this.list.length;
            if (this.curnum > 0) {
                this.reStart = true;
            }
            bus.$on('closeReInitButton', function() {
                that.reStart = false;
            })
            bus.$on('submitResult', function() { //这里提交答案
                if (that.cacheOptions['' + (that.totalnum - 1)].option.length > 0) {
                    var result = [];
                    var finalstr = ''
                    for (var k in that.cacheOptions) {
                        result.push(that.cacheOptions[k].lineId + '&' + that.cacheOptions[k].option.join(','))
                    }
                    finalstr = result.join('|');
                    that.$axios.post('/api/saveUserTemplate', { //最终保存结果
                        tuId: that.params.tuId,
                        inputVal: finalstr
                    }).then(function(res) {
                        that.$router.push({
                            path: '/sleepTestResult',
                            query: that.params
                        });
                    }).catch(function() {
                        that.$router.push({
                            path: '/sleepTestResult',
                            query: that.params
                        });
                    })
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

<style lang='scss'>
    .turnQuestions {
        position: absolute;
        top: 3rem;
        width: 100%;
        background: #fff;
        bottom: 0;
        left: 0;
        right: 0;
        .carousels {
            position: absolute;
            top: 2.5rem;
            bottom: 0;
            left: 0;
            right: 0;
        }
        .el-carousel__container {
            width: 100%;
            height: 100%;
            overflow: auto;
            .el-carousel__item {
                height: 100%!important;
                overflow: auto;
            }
        }
        .reInit {
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 1000;
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
        }
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