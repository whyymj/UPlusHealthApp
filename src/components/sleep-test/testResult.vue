<template>
    <div>
        <h6>匹兹堡睡眠质量指数<img src="/static/sleepMusicList/img6.png" alt=""></h6>
        <score :score='testScore'></score>
        <analysis :analysis='analysis'></analysis>
        <warmTips :tips='tips'></warmTips>
        <div class="button">
            <div class="retry" :class='{saved:hadSaved}' @click='reTest'>重新测试</div>
            <div class="save" @click='save' v-if='!hadSaved'>保存结果</div>
        </div>
    </div>
</template>

<script>
    import score from './score';
    import analysis from './analysis';
    import warmTips from './warmTips.vue'
    export default {
        methods: {
            save() {
                this.hadSaved = true
            },
            reTest() {
                this.$router.push('/sleepTest?from=retest')
            }
        },
        mounted() {
            var params = this.$route.query;
            var that = this;
            this.$axios.get('/api/getUserTemplateAnalysis', { //获取用户睡眠量表分析数据
                tuId: params.tuId
            }).then(function(res) {
                if (res.data.code == 'C0000') {
                    that.testScore = res.data.data.gradesStr.split('分')[0];
                    that.analysis = {
                        title: res.data.data.scoreInfo,
                        detail: res.data.data.scoreSuggest
                    }
                }
            }).catch(function(res) {
                that.$axios.get('/static/testData/testResult.json', {
                    tuId: params.tuId
                }).then(function(res) {
                    if (res.data.code == 'C0000') {
                        that.testScore = res.data.data.gradesStr.split('分')[0];
                        that.analysis = {
                            title: res.data.data.scoreInfo,
                            detail: res.data.data.scoreSuggest
                        }
                    }
                    console.log(res)
                })
            })
        },
        components: {
            score,
            analysis,
            warmTips
        },
        data() {
            return {
                analysis: {
                    title: '',
                    detail: ''
                },
                hadSaved: false,
                testScore: 0,
                tips: [{
                    title: "身体扫描",
                    body: "关注身体的每个部位，缓解躯体不适"
                }, {
                    title: "正念呼吸",
                    body: "关注身体的每个部位，缓解躯体不适"
                }, {
                    title: "随意",
                    body: "关注身体的每个部位，缓解躯体不适"
                }]
            }
        },
    }
</script>

<style lang='scss' scoped>
    h6 {
        font-size: 0.75rem;
        font-family: 'PingFangSC-Regular';
        color: rgba(51, 51, 51, 1);
        text-align: center;
        vertical-align: middle;
        line-height: 3rem;
        img {
            vertical-align: middle;
            width: 0.75rem;
            height: 0.75rem;
            margin: 0.2rem;
        }
    }
    .button {
        width: 100%;
        height: 3rem;
        position: fixed;
        left: 0;
        bottom: 0;
        div {
            position: absolute;
            height: 100%;
            width: 50%;
            top: 0;
            font-size: 0.8rem;
            font-family: 'PingFangSC-Regular';
            color: rgba(255, 255, 255, 1);
            line-height: 3rem;
            font-weight: 500;
            text-align: center;
        }
        .retry {
            left: 0;
            background: #10D6E2;
        }
        .save {
            right: 0;
            background: #26A6FF;
        }
        div.saved {
            width: 100%;
        }
    }
</style>