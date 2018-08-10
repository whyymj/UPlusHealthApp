<template>
    <div class="sleepManuInput">
        <sleeptime :list='items' @getSleepTimes='getSleepTimes'></sleeptime>
        <sleepquality :quality='quality' :factors='factors' @chooseQuality='chooseQuality' @chooseFactor='chooseFactor'></sleepquality>
        <div class="button" @click='submitResult'>保存</div>
    </div>
</template>

<script>
    import sleeptime from './sleepTime';
    import sleepquality from './sleepQuality.vue';
    export default {
        components: {
            sleeptime,
            sleepquality
        },
        methods: {
            chooseFactor(list) {
                this.sleepfactors = list;
            },
            chooseQuality(index) {
                this.sleepqualityres = index;
            },
            getSleepTimes(list) {
                this.items = list;
            },
            submitResult() {
                var that = this;
                if (this.sleepid) { //有sleep_id为修改，否则为添加
                    this.$axios.post('/api/updateSleepAnalysis', {
                        sleep_id: that.sleepid,
                        startTime: that.items[0].content,
                        sleepTime: that.items[1].content,
                        wakeTime: that.items[2].content,
                        getupTime: that.items[3].content,
                        quality: that.sleepqualityres,
                        influence: that.sleepfactors
                    }).then(function(res) {
                        that.$router.push('/sleepMusicList');
                    }).catch(function() {
                        that.$router.push('/sleepMusicList');
                    });
                } else {
                    this.$axios.post('/api/sleep/insert', {
                        member_id: "",
                        startTime: that.items[0].content,
                        sleepTime: that.items[1].content,
                        wakeTime: that.items[2].content,
                        getupTime: that.items[3].content,
                        quality: that.sleepqualityres,
                        influence: that.sleepfactors
                    }).then(function(res) {
                        that.$router.push('/sleepMusicList');
                    }).catch(function() {
                      
                        that.$router.push('/sleepMusicList');
                    });
                }
            }
        },
        data() {
            return {
                quality: '', //查到的质量
                factors: '', //查到的因素
                sleepqualityres: "", //选择的质量
                sleepfactors: "", //选择的因素
                sleepid: "",
                items: [{
                        title: "上床",
                        url: "/static/sleep-manue-input/img1.png",
                        content: ""
                    },
                    {
                        title: "睡着",
                        url: "/static/sleep-manue-input/img2.png",
                        content: ""
                    },
                    {
                        title: "睡醒",
                        url: "/static/sleep-manue-input/img3.png",
                        content: ""
                    },
                    {
                        title: "起床",
                        url: "/static/sleep-manue-input/img4.png",
                        content: ""
                    }
                ]
            };
        },
        mounted() {
            var that = this;
            var sleepid = this.$route.query;
            if (sleepid.sleepid) {
                this.sleepid = sleepid.sleepid;
                this.$axios.get('/api/getAnalysisById', {
                    sleep_id: sleepid
                }).then(function(res) {
                    var data;
                    if (res.data.code == 'C0000') {
                        data = res.data.data;
                        that.items[0].content = data.startTime;
                        that.items[1].content = data.sleepTime;
                        that.items[2].content = data.wakeTime;
                        that.items[3].content = data.getupTime;
                        that.sleepqualityres = that.quality = data.quality
                        that.sleepfactors = that.factors = data.influence;
                    }
                }).catch(function() {
                    that.$axios.get('/static/testData/getAnalysisById.json').then(function(res) {
                        var data;
                        if (res.data.code == 'C0000') {
                            data = res.data.data;
                            that.items[0].content = data.startTime;
                            that.items[1].content = data.sleepTime;
                            that.items[2].content = data.wakeTime;
                            that.items[3].content = data.getupTime;
                            that.sleepqualityres = that.quality = data.quality
                            that.sleepfactors = that.factors = data.influence;
                        }
                    })
                })
            }
        }
    };
</script>

<style lang='scss' scoped>
    .sleepManuInput {
        /* position: fixed; */
        height: 100%;
        width: 100%;
        background: #fff;
        /* overflow: auto; */
        .button {
            width: 100%;
            height: 3rem;
            background: #26A6FF;
            line-height: 3rem;
            font-size: 0.8rem;
            font-family: 'PingFangSC-Regular';
            color: rgba(255, 255, 255, 1);
            text-align: center;
        }
    }
</style>