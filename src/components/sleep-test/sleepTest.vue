<template>
    <div class='sleepTest'>
        <h1>睡眠状况测试-匹兹堡睡眠质量指数<img src="/static/sleepMusicList/img6.png" alt=""></h1>
        <list :list='questions' @turnQestion='turnQestion'></list>
        <div class="submit" v-show='canSubmit' @click='submitResult'>提交测试</div>
    </div>
</template>

<script>
    import list from './turnQuestions.vue';
    import bus from '../../assets/healthSleep/bus.js';
    import {
        Toast
    } from 'mint-ui';
    export default {
        name: 'sleepTest',
        components: {
            list
        },
        methods: {
            submitResult() {
                console.log('bus', bus);
                bus.$emit('submitResult');
            },
            turnQestion(index) {
                this.startnum = index;
                if (index >= this.questions.length) {
                    this.canSubmit = true;
                } else {
                    this.canSubmit = false;
                }
            },
        },
        data() {
            return {
                canSubmit: false,
                questions: []
            }
        },
        mounted() {
            var params = this.$route.query;
            var that = this;
            this.$axios.get('/api/setUserTemplate').then(function(res) {}).catch(function(res) {
               
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
            })
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
        z-index:1000;
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