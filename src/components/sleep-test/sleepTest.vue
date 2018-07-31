<template>
    <div>
        <h1>睡眠状况测试-匹兹堡睡眠质量指数<img src="/static/sleepMusicList/img6.png" alt=""></h1>
        <list :list='questions' @turnQestion='turnQestion'></list>
        <div class="submit" v-if='canSubmit' @click='submitResult'>提交测试</div>
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
                bus.$emit('submitResult');
            },
            turnQestion(index) {
                this.startnum = index;
                if (index == this.questions.length) {
                    this.canSubmit = true;
                } else {
                    this.canSubmit = false;
                }
            },
        },
        data() {
            return {
                canSubmit: false,
                questions: [{
                    title: '题1',
                    options: [1, 2, 3, 4, 5],
                    default: ''
                }, {
                    title: '题2',
                    options: [1, 2, 3, 4, 5],
                    default: 0
                }, {
                    title: '题3',
                    options: [1, 2, 3, 4, 5],
                    default: 1
                }, {
                    title: '题4',
                    options: [1, 2, 3, 4, 5],
                    default: 2
                }, {
                    title: '题5',
                    options: [1, 2, 3, 4, 5],
                    default: 3
                }, {
                    title: '题6',
                    options: [1, 2, 3, 4, 5],
                    default: ''
                }, {
                    title: '题7',
                    options: [1, 2, 3, 4, 5],
                    default: ''
                }, {
                    title: '题8',
                    options: [1, 2, 3, 4, 5],
                    default: ''
                }, {
                    title: '题9',
                    options: [1, 2, 3, 4, 5],
                    default: ''
                }, {
                    title: '题10',
                    options: [1, 2, 3, 4, 5, 6, 7],
                    default: ''
                }, ]
            }
        },
        mounted() {
            if (true) { //中途退出
                let instance = Toast({
                    message: '正从上次退出位置继续答题',
                    position: 'bottom',
                    duration: 2000
                });
            }
        }
    }
</script>

<style lang='scss' scoped>
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