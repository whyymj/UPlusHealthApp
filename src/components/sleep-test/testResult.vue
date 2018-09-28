<template>
    <div>
        <h6>{{firstTitle}}-{{secondTitle}}</h6>
        <score :score='testScore' :totalscore='totalscore' :scoreSet='scoreSet'></score>
        <analysis :analysis='analysis'></analysis>
        <warmTips :tips='tips'></warmTips>
        <div class="button">
            <div class="retry" :class='{saved:hadSaved}' @click='reTest'>重新测试</div>
            <div class="save" @click='save' v-if='!hadSaved'>保存测试</div>
        </div>
        <myLoadingModal :show='showMyLoadingModal'></myLoadingModal>
    </div>
</template>

<script>
    import score from './score';
    import analysis from './analysis';
    import warmTips from './warmTips.vue'
    export default {
        methods: {
            save() {
                this.hadSaved = true;
                this.$router.go(-2);
            },
            reTest() {
                var that = this;
                this.params.from = 'retest';
                var str = this.allResult.split('|').map(function(item) {
                    var newitem = item.split('&')[0] + '&';
                    return newitem;
                }).join('|');
                localStorage['saveUsersleepTemplate' + that.params.tuId] = str; //刷新记录
                window.__retest__ = true;
                that.$router.go(-1);
            }
        },
        mounted() {
            var that = this;
            this.showMyLoadingModal = true;
            setTimeout(function() {
                that.showMyLoadingModal = false;
            }, 5000)
            window.__retest__ = false;
            var params = this.$route.query;
            this.secondTitle = params.templateSubTitle;
            this.firstTitle = params.templateTitle;
            this.params = params;
            this.allResult = params.allResult || localStorage['saveUsersleepTemplate' + that.params.tuId] || '';
            this.$axios.post('/api/getUserTemplateAnalysis', { //获取用户睡眠量表分析数据
                tuId: params.tuId,
                member_id: window._member_id
            }).then(function(res) {
                that.showMyLoadingModal = false;
                if (res.data.code == 'C0000') {
                    that.testScore = res.data.data.gradesStr.split('分')[0];
                    that.scoreSet = res.data.data.scoreNormal;
                    that.totalscore = res.data.data.total;
                    that.analysis = {
                        title: res.data.data.scoreInfo,
                        detail: res.data.data.scoreSuggest
                    }
                    that.tips = res.data.data.ttLineAudioSubList.map(function(item) {
                        return {
                            title: item.lineTitle,
                            body: "关注身体的每个部位，缓解躯体不适",
                            audio: item.audioUrl,
                            img: item.imgUrl,
                            type: item.resourceType
                        }
                    })
                } else {}
            }).catch(function(res) {
                that.showMyLoadingModal = false;
                console.log('false');
                that.$axios.get('/static/testData/getUserTemplateAnalysis.json').then(function(res) {
                    if (res.data.code == 'C0000') {
                        that.testScore = res.data.data.gradesStr.split('分')[0];
                        that.scoreSet = res.data.data.scoreNormal;
                        that.totalscore = res.data.data.total;
                        that.analysis = {
                            title: res.data.data.scoreInfo,
                            detail: res.data.data.scoreSuggest
                        }
                        that.tips = res.data.data.ttLineAudioSubList.map(function(item) {
                            return {
                                title: item.lineTitle,
                                body: "关注身体的每个部位，缓解躯体不适",
                                audio: item.audioUrl,
                                img: item.imgUrl,
                                type: item.resourceType
                            }
                        })
                    } else {}
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
                scoreSet: '',
                firstTitle: '',
                secondTitle: '',
                allResult: '',
                params: '',
                analysis: {
                    title: '',
                    detail: ''
                },
                totalscore: 0,
                hadSaved: false,
                testScore: 0,
                tips: [],
                showMyLoadingModal: true
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