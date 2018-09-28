<template>
    <div class='sleepTest'>
        <h1>{{firstTitle}}-{{secondTitle}}</h1>
        <list :list='questions' :tuIdTmp='tuId' @turnQestion='turnQestion'></list>
        <div class="submit" v-show='canSubmit' @click='submitResult'>提交测试</div>
        <myLoadingModal v-show='showMyLoadingModal'></myLoadingModal>
    </div>
</template>

<script>
    import list from './turnQuestions.vue';
    import bus from '../../assets/healthSleep/bus.js';
    import {
        Toast
    } from 'mint-ui';
    import {
        Loading
    } from 'element-ui';
    import {
        setTimeout
    } from 'timers';
    export default {
        name: 'sleepTest',
        components: {
            list,
            Loading
        },
        methods: {
            submitResult() {
                bus.$emit('submitResult');
            },
            turnQestion(index) {
                this.startnum = index;
                if (index >= this.questions.length - 1) {
                    this.canSubmit = true;
                } else {
                    this.canSubmit = false;
                }
            },
        },
        data() {
            return {
                showMyLoadingModal: true,
                canSubmit: false,
                questions: [],
                tmpCache: '',
                tuId: '',
                firstTitle: '',
                secondTitle: ""
            }
        },
        mounted() {
            this.showMyLoadingModal = true
            var params = this.$route.query;
            var that = this;
            setTimeout(function() {
                that.showMyLoadingModal = false;
            }, 5000)
            this.secondTitle = params.templateSubTitle;
            this.firstTitle = params.templateTitle;
            this.tmpCache = localStorage['saveUsersleepTemplate' + params.tuId] || ''; //暂存的答题结果
            var tempArr = this.tmpCache.split('|');
            var initArr = [];
            if (params.status == 1 && !window.__retest__) { //已經完成且非重測
                window.__retest__ = false;
                that.showMyLoadingModal = false;
                this.$router.push({
                    path: '/sleepTestResult',
                    query: params
                })
            } else {
                this.$axios.post('/api/setUserTemplate', {
                    templateId: params.templateId,
                    tuId: params.tuId,
                    member_id: window._member_id,
                }).then(function(res) {
                    that.showMyLoadingModal = false;
                    if (params.status === 0 || params.status === '0') { //中途退出
                        let instance = Toast({
                            message: '正从上次退出位置继续答题',
                            position: 'bottom',
                            duration: 2000
                        });
                    }
                    if (res.data.code === 'C0000') {
                        params.tuId = res.data.data.tuId;
                        that.tuId = res.data.data.tuId;
                        that.questions = res.data.data.templateLineList.map(function(item, index) {
                            var options = item.selectItemList;
                            var tmp = tempArr[index];
                            var id = '',
                                resuilts = '',
                                arr = [];
                            if (tmp) {
                                arr = tmp.split('&')
                                id = arr[0];
                                resuilts = (typeof arr[1] == 'string') ? arr[1].split(',') : '';
                            }
                            if (id == item.lineId && resuilts !== '') { //根据缓存判断上次答题情况
                                options = options.slice().map(function(val, key) {
                                    var newitem = val;
                                    if (resuilts.indexOf('' + key) !== -1) {
                                        newitem.checked = true;
                                    } else {
                                        newitem.checked = false;
                                    }
                                    return newitem;
                                })
                            } else {
                                options = options.slice().map(function(val, key) {
                                    var newitem = val;
                                    newitem.checked = false;
                                    return newitem;
                                })
                            }
                            initArr.push(item.lineId + '&');
                            return {
                                title: index + 1 + '. ' + item.lineTitle,
                                type: item.lineType,
                                "templateId": item.templateId,
                                options: options,
                                "lineId": item.lineId,
                                tuId: params.tuId
                            }
                        });
                        if (initArr.length > 0) {
                            localStorage['saveUsersleepTemplate' + params.tuId] = initArr.join('|'); //刷新缓存
                        }
                    }
                }).catch(function(res) {
                    that.showMyLoadingModal = false;
                    console.log('what the ffff');
                    if (process.env.NODE_ENV == 'development') {
                        that.$axios.get('/static/testData/setUserTemplate.json').then(function(res) {
                            if (params.status === 0 || params.status === '0') { //中途退出
                                let instance = Toast({
                                    message: '正从上次退出位置继续答题',
                                    position: 'bottom',
                                    duration: 2000
                                });
                            }
                            if (res.data.code === 'C0000') {
                                that.questions = res.data.data.templateLineList.map(function(item, index) {
                                    return {
                                        title: index + 1 + '. ' + item.lineTitle,
                                        type: item.lineType,
                                        "templateId": item.templateId,
                                        options: item.selectItemList,
                                        "lineId": item.lineId
                                    }
                                });
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    .sleepTest {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    h1 {
        font-size: 0.75rem;
        font-family: 'PingFangSC-Regular';
        color: rgba(51, 51, 51, 1);
        text-align: center;
        font-weight: 600;
        background: #fff;
        line-height: 3rem;
        position: relative;
        vertical-align: middle;
        img {
            width: 0.75rem;
            height: 0.75rem;
            display: inline-block;
            vertical-align: middle;
            margin: 0 0.2rem
        }
    }
    .submit {
        position: fixed;
        z-index: 1000;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3rem;
        background: rgba(38, 166, 255, 1);
        font-size: 0.8rem;
        font-family: 'PingFangSC-Regular';
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 3rem;
    }
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
</style>