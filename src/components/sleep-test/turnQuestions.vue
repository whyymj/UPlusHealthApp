<template>
    <div class='turnQuestions' ref='sleepTestList'>
        <bar :totalnum='totalnum' :curnum='curnum+1' v-if='totalnum>0'></bar>
        <el-carousel class='carousels' indicator-position='none' :autoplay='autoplay' arrow='never' ref='carousel' :initial-index='initialindex' v-if='totalnum>0'>
            <el-carousel-item v-for="(item,index) in showlist" :key="index" style='height:20rem'>
                <questionlist :list='item' :id='index' :total='totalnum' @selectQuestion='getOptions'></questionlist>
            </el-carousel-item>
        </el-carousel>
        <div class="prevbutton" @click='prev' v-if='curnum>0'><i class="el-icon-back"></i>上一题</div>
        <div class='reInit' @click='reInit' v-if='reStart'>重新开始</div>
        <!-- <myLoadingModal :show='showMyLoadingModal'></myLoadingModal> -->
    </div>
</template>

<script>
    import questionlist from './questionsList';
    import bar from './progressBar';
    import bus from '../../assets/healthSleep/bus.js';
    import {
        setTimeout,
        clearTimeout
    } from 'timers';
    import {
        Toast
    } from 'mint-ui';
    export default {
        props: ['list', 'tuIdTmp'],
        components: {
            bar,
            questionlist,
        },
        data() {
            return {
                showMyLoadingModal: true,
                tmpCache: '',
                doubleclick: false,
                reStart: false,
                autoplay: false,
                totalnum: 0,
                curnum: 0,
                cacheOptions: {},
                showlist: [],
                initialindex: 0,
                bar: '',
                params: '',
                tuId: '',
                submiting: false,
                turningQuestoin: false,
                turnQuestBar: ''
            }
        },
        watch: {
            tuIdTmp() {
                if (this.tuIdTmp !== '') {
                    localStorage['saveUsersleepTemplate' + this.tuIdTmp] = localStorage['saveUsersleepTemplate' + this.tuId]
                    this.tuId = this.tuIdTmp;
                }
            },
            initialindex() {},
            list() {
                var that = this;
                this.showlist = this.list;
                this.totalnum = this.list.length;
                this.tuId = this.list[0].tuId;
                var lasttestnum = 0;
                this.list.map(function(item, index) {
                    that.cacheOptions[index] = {
                        option: [],
                        lineId: item.lineId
                    };
                    var option = [];
                    item.options.map(function(val, key) {
                        if (val.checked === true || val.checked === 'true') {
                            lasttestnum = index;
                            option.push(key);
                        }
                    });
                    that.cacheOptions[index].option = option;
                });
                this.curnum = lasttestnum == this.list.length - 1 ? 0 : lasttestnum; //是否已经全部测试完毕
                if (this.curnum > 0) {
                    this.reStart = true;
                } else {
                    this.showlist = this.showlist.map(function(item, index) {
                        var newitem = item;
                        newitem.options = item.options.map(function(val, key) {
                            var newval = val;
                            newval.checked = false;
                            return newval;
                        })
                        return newitem;
                    })
                }
                this.initialindex = this.curnum;
            }
        },
        methods: {
            reInit() {
                this.showlist = [];
                this.reStart = false;
                this.curnum = 0;
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
                    var tmpstr = localStorage['saveUsersleepTemplate' + that.tuId];
                    tmpstr.split('|').map(function(item) {
                        return item.split('&')[0]
                    }).join('|');
                    localStorage['saveUsersleepTemplate' + that.tuId] = tmpstr;
                    var result = [];
                    var finalstr = ''
                    for (var k in that.cacheOptions) {
                        result.push(that.cacheOptions[k].lineId + '&')
                    }
                    finalstr = result.join('|');
                    that.$axios.post('/api/saveUserTemplate', { //刷新
                        member_id: window._member_id,
                        tuId: that.params.tuId,
                        inputVal: finalstr
                    }).then(function(res) {})
                })
            },
            prev() {
                this.reStart = false;
                if (this.curnum > 0) {
                    this.$refs.carousel.prev();
                    this.curnum--;
                }
                // this.$emit('turnQestion', this.curnum);
            },
            next(fn) {
                if (this.curnum < this.list.length - 1) {
                    this.$refs.carousel.next();
                    this.curnum++;
                }
                if (fn) {
                    fn()
                }
                // this.$emit('turnQestion', this.curnum);
            },
            getOptions(data) {
                var that = this;
                that.cacheOptions[data.questnum] = {
                    option: data.option,
                    lineId: that.list[data.questnum].lineId
                };
                var tmp = data.option.length >= 0;
                if (!that.doubleclick && tmp) {
                    var result = [];
                    var finalstr = ''
                    for (var k in that.cacheOptions) {
                        result.push(that.cacheOptions[k].lineId + '&' + that.cacheOptions[k].option.join(','))
                    }
                    localStorage['saveUsersleepTemplate' + that.tuId] = result.join('|');
                    finalstr = result.filter(function(item) {
                        return item.split('&')[1] !== '';
                    }).join('|');
                    this.$axios.post('/api/saveUserTemplateByTime', { //实时保存结果
                        member_id: window._member_id,
                        templateId: that.params.templateId,
                        tuId: that.params.tuId,
                        inputVal: finalstr
                    }).then(function(res) {}).catch(function() {})
                    that.doubleclick = true;
                    this.bar = setTimeout(function() {
                        that.doubleclick = false;
                    }, 300);
                }
            }
        },
        mounted() {
            var that = this;
            this.params = this.$route.query;
            this.tuId = this.params.tuId;
            document.getElementsByClassName('turnQuestions')[0].onclick = function(e) {
                var item = e.target || e.srcElement;
                if (!that.turningQuestoin) {
                    that.turningQuestoin = true;
                    clearTimeout(that.turnQuestBar);
                    that.turnQuestBar = '';
                    if (item.className.indexOf('questionListRadio') != -1 || item.className.indexOf('nextbut') != -1) {
                        that.next(function() {
                            that.turnQuestBar = setTimeout(function() {
                                that.turningQuestoin = false;
                            }, 500)
                        });
                    }
                    if (!that.turnQuestBar) {
                        that.turnQuestBar = setTimeout(function() {
                            that.turningQuestoin = false;
                        }, 200)
                    }
                }
            }
            if (this.list && this.list.length) {
                this.tuId = this.list[0].tuId;
                this.showlist = this.list;
                this.totalnum = this.list.length;
                var lasttestnum = 0;
                this.list.map(function(item, index) {
                    that.cacheOptions[index] = {
                        option: [],
                        lineId: item.lineId
                    };
                    var option = [];
                    item.options.map(function(val, key) {
                        if (val.checked === true || val.checked === 'true') {
                            lasttestnum = index;
                            option.push(key);
                        }
                    });
                    that.cacheOptions[index].option = option;
                });
                this.curnum = lasttestnum == this.list.length - 1 ? 0 : lasttestnum; //是否已经全部测试完毕
                if (this.curnum > 0) {
                    this.reStart = true;
                } else {
                    this.showlist = this.showlist.map(function(item, index) {
                        var newitem = item;
                        newitem.options = item.options.map(function(val, key) {
                            var newval = val;
                            newval.checked = false;
                            return newval;
                        })
                        return newitem;
                    })
                }
                this.initialindex = this.curnum;
            }
            bus.$on('closeReInitButton', function(num) {
                that.reStart = false;
                that.$emit('turnQestion', num);
            })
            bus.$on('submitResult', function() { //这里提交答案
                if (!that.submiting && that.totalnum > 0 && that.cacheOptions['' + (that.totalnum - 1)].option.length > 0) {
                    that.submiting = true; //防止反復提交
                    that.showMyLoadingModal = true;
                    var result = [];
                    var finalstr = ''
                    for (var k in that.cacheOptions) {
                        result.push(that.cacheOptions[k].lineId + '&' + that.cacheOptions[k].option.join(','))
                    }
                    finalstr = result.join('|');
                    that.$axios.post('/api/saveUserTemplate', { //最终保存结果
                        member_id: window._member_id,
                        tuId: that.params.tuId,
                        inputVal: finalstr
                    }).then(function(res) {
                        that.showMyLoadingModal = false;
                        that.submiting = false;
                        if (res.data.code == 'C0000') {
                            that.params.totalScore = res.data.data.totalScore;
                            that.params.allResult = finalstr;
                            that.$router.push({
                                path: '/sleepTestResult',
                                query: that.params
                            });
                        }
                    }).catch(function(e) {
                        that.submiting = false;
                        that.$notify.error({
                            title: '请重试',
                            message: '提交测试结果失败',
                            showClose: false
                        });
                        that.showMyLoadingModal = false;
                        if (process.env.NODE_ENV == 'development') {
                            that.$router.push({
                                path: '/sleepTestResult',
                                query: that.params
                            });
                        }
                    })
                } else {
                    Toast({
                        message: '正在提交，请稍后',
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
        top: 2.95rem;
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
            height: 1rem;
            border-radius: 1rem;
            text-align: right;
            background: #fff;
            font-size: 0.75rem;
            font-family: 'PingFangSC-Regular';
            font-weight: 500;
            color: rgba(50, 182, 230, 1);
            position: absolute;
            top: 0;
            left: 6.5%;
            z-index: 10;
        }
    }
</style>