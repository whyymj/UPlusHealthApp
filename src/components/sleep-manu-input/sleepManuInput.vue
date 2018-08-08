<template>
    <div class="sleepManuInput">
        <sleeptime :list='items' @getSleepTimes='getSleepTimes'></sleeptime>
        <sleepquality @chooseQuality='chooseQuality' @chooseFactor='chooseFactor'></sleepquality>
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
                this.$axios.post('/api/insert', {
                    member_id: "",
                    startTime: that.items[0].content,
                    sleepTime: that.items[1].content,
                    wakeTime: that.items[2].content,
                    getupTime: that.items[3].content,
                    quality: that.sleepqualityres,
                    influence: that.sleepfactors
                }).then(function() {
                    that.$router.push('/sleepMusicList');
                }).catch(function() {
                    console.log({
                        member_id: "",
                        startTime: that.items[0].content,
                        sleepTime: that.items[1].content,
                        wakeTime: that.items[2].content,
                        getupTime: that.items[3].content,
                        quality: that.sleepqualityres,
                        influence: that.sleepfactors
                    });
                    that.$router.push('/sleepMusicList');
                });
            }
        },
        data() {
            return {
                sleepqualityres: "",
                sleepfactors: "",
                items: [{
                        title: "上床",
                        url: "/static/sleep-manue-input/img1.png",
                        content: "12:30"
                    },
                    {
                        title: "睡着",
                        url: "/static/sleep-manue-input/img2.png",
                        content: "12:30"
                    },
                    {
                        title: "睡醒",
                        url: "/static/sleep-manue-input/img3.png",
                        content: "12:30"
                    },
                    {
                        title: "起床",
                        url: "/static/sleep-manue-input/img4.png",
                        content: "12:30"
                    }
                ]
            };
        },
        mounted() {}
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