<template>
    <div class="sleepManuInput">
        <sleeptime :list='items' @getSleepTimes='getSleepTimes'></sleeptime>
        <sleepquality :quality='quality' :factors='factors' @chooseQuality='chooseQuality' @chooseFactor='chooseFactor'></sleepquality>
        <div class="button" :class='{canSubmit:(cansub&&sleepqualityres!=="")}' @click='submitResult'>保存</div>
        <myLoadingModal :show='showMyLoadingModal'></myLoadingModal>
    </div>
</template>

<script>
    import sleeptime from './sleepTime';
    import sleepquality from './sleepQuality.vue';
    import bus from '../eventbus.js';
    import {
        MessageBox
    } from 'mint-ui';
    import {
        setTimeout
    } from 'timers';
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
            getSleepTimes(list, flag) {
                this.items = list;
                this.cansub = flag;
            },
            formateNumber(num) {
                return num * 1 > 9 ? num * 1 : ('0' + num * 1);
            },
            formateTime(h, m) {
                return this.formateNumber(h) + ':' + this.formateNumber(m)
            },
            submitResult() {
                var that = this;
                if (this.cansub) {
                    var startTime = that.items[0].content,
                        sleepTime = that.items[1].content,
                        wakeTime = that.items[2].content,
                        getupTime = that.items[3].content;
                    var h1 = startTime.split(':')[0],
                        h2 = sleepTime.split(':')[0],
                        h3 = wakeTime.split(':')[0],
                        h4 = getupTime.split(':')[0],
                        m1 = startTime.split(':')[1],
                        m2 = sleepTime.split(':')[1],
                        m3 = wakeTime.split(':')[1],
                        m4 = getupTime.split(':')[1];
                    startTime = this.formateTime(h1, m1);
                    sleepTime = this.formateTime(h2, m2);
                    wakeTime = this.formateTime(h3, m3);
                    getupTime = this.formateTime(h4, m4);
                    startTime = (h1 <= 8 ? that.today : that.yesterday) + ' ' + startTime;
                    if (h2 >= h1 && h2 >= 18) {
                        sleepTime = that.yesterday + ' ' + sleepTime;
                    } else {
                        sleepTime = that.today + ' ' + sleepTime;
                    }
                    if (h3 >= h2 && h3 >= 18) {
                        wakeTime = that.yesterday + ' ' + wakeTime;
                    } else {
                        wakeTime = that.today + ' ' + wakeTime;
                    }
                    if (h4 >= h3 && h4 >= 18) {
                        getupTime = that.yesterday + ' ' + getupTime;
                    } else {
                        getupTime = that.today + ' ' + getupTime;
                    }
                    if (that.sleepqualityres === '') {
                        MessageBox.alert('请选择睡眠质量', '请完成内容选择');
                    } else {
                        that.showMyLoadingModal = true;
                        if (this.sleepid) { //有sleep_id为修改，否则为添加
                            this.$axios.post('/api/updateSleepAnalysis', {
                                sleep_id: that.sleepid,
                                startTime: startTime,
                                sleepTime: sleepTime,
                                wakeTime: wakeTime,
                                getupTime: getupTime,
                                quality: that.sleepqualityres,
                                influence: that.sleepfactors
                            }).then(function(res) {
                                that.showMyLoadingModal = false;
                                if (res.data && res.data.code == 'C0000') {
                                    that.$router.go(-1);
                                } else {
                                    MessageBox.alert('请稍后重试', '请求失败');
                                }
                            }).catch(function() {
                                that.showMyLoadingModal = false;
                            });
                        } else {
                            this.$axios.post('/api/sleep/insert', {
                                member_id: window._member_id,
                                startTime: startTime,
                                sleepTime: sleepTime,
                                wakeTime: wakeTime,
                                getupTime: getupTime,
                                quality: that.sleepqualityres,
                                influence: that.sleepfactors
                            }).then(function(res) {
                                that.showMyLoadingModal = false;
                                if (res.data.code && res.data.code == 'C0000') {
                                    that.$router.go(-1);
                                } else {
                                    MessageBox.alert('请稍后重试', '请求失败');
                                }
                            }).catch(function() {
                                that.showMyLoadingModal = false;
                            });
                        }
                    }
                } else {
                    bus.$emit('whycannotsub');
                }
            }
        },
        data() {
            return {
                showMyLoadingModal: true,
                today: '',
                yesterday: '',
                cansub: true,
                quality: '', //查到的质量
                factors: '', //查到的因素
                sleepqualityres: "", //选择的质量
                sleepfactors: "", //选择的因素
                sleepid: "",
                items: [{
                        title: "上床",
                        url: "/static/sleep-manue-input/img1.svg",
                        content: "00:00"
                    },
                    {
                        title: "睡着",
                        url: "/static/sleep-manue-input/img2.svg",
                        content: "00:00"
                    },
                    {
                        title: "睡醒",
                        url: "/static/sleep-manue-input/img3.svg",
                        content: "8:00"
                    },
                    {
                        title: "起床",
                        url: "/static/sleep-manue-input/img4.svg",
                        content: "8:00"
                    }
                ]
            };
        },
        mounted() {
            var that = this;
            this.showMyLoadingModal = true;
            var date = new Date();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            this.today = date.getFullYear() + '-' + (month > 9 ? month : ('0' + month)) + '-' + (day > 9 ? day : ('0' + day));
            var lastday = new Date(date.getTime() - 24 * 3600 * 1000);
            month = lastday.getMonth() + 1;
            day = lastday.getDate();
            this.yesterday = lastday.getFullYear() + '-' + (month > 9 ? month : ('0' + month)) + '-' + (day > 9 ? day : ('0' + day));
            var sleepid = this.$route.query;
            if (sleepid.sleepid) { //有sleep_id为修改，否则为添加
                this.sleepid = sleepid.sleepid;
                this.$axios.post('/api/getAnalysisById', {
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
                    that.showMyLoadingModal = false;
                }).catch(function() {
                    that.showMyLoadingModal = false;
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
            } else {
                that.showMyLoadingModal = false;
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
            background: #ccc;
            line-height: 3rem;
            font-size: 0.8rem;
            font-family: 'PingFangSC-Regular';
            color: rgba(255, 255, 255, 1);
            text-align: center;
        }
        .canSubmit {
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