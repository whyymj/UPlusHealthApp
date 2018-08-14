<template>
    <div class='sleepList'>
        <h1>记录睡眠时间</h1>
        <div class='row' v-for='(item,index) in list' :key='index' @click='openPicker(index)'>
            <img :src="item.url" alt="">
            <span class="title">{{item.title}}</span>
            <span class="cont">{{item.content}}</span>
        </div>
        <!-- <mt-datetime-picker ref="picker" type="time" v-model="pickerValue" @confirm='confirm'>
                </mt-datetime-picker> -->
        <timepicker :startTime='startTime' :endTime='endTime'></timepicker>
    </div>
</template>

<script>
    import timepicker from './mytimepicker';
    import bus from './bus.js';
    export default {
        components: {
            timepicker
        },
        props: ['list'],
        data() {
            return {
                tips: '',
                popupVisible: false,
                startTime: ['18:00', '00:00'],
                endTime: ['23:59', '08:00'],
                index: 0,
                pickerValue: '',
                gotobed: [],
                startsleep: [],
                wakeup: [],
                leavebed: []
            }
        },
        methods: {
            openPicker(index) {
                this.index = index;
                bus.$emit('toggle');
                // this.$refs.picker.open();
            },
            confirm(data) {
                var hour = data.split(':')[0];
                var minute = data.split(':')[1];
                if (this.index == 0) {
                    this.gotobed = [hour, minute];
                    if (hour < 18 && hour >= 8) {
                        this.popupVisible = true;
                    }
                } else if (this.index == 1) {
                    this.startsleep = [hour, minute];
                } else if (this.index == 2) {
                    this.wakeup = [hour, minute];
                } else if (this.index == 3) {
                    this.leavebed = [hour, minute];
                }
                this.list[this.index].content = data;
                this.list = this.list;
                this.$emit('getSleepTimes', this.list);
            }
        }
    }
</script>

<style lang='scss' scoped>
    .sleepList {
        width: 100%;
        overflow: hidden;
        margin-bottom: 1rem;
        h1 {
            font-size: 0.9rem;
            font-family: PingFangSC-Regular;
            color: rgba(17, 17, 17, 1);
            height: 3rem;
            line-height: 3rem;
            width: 17rem;
            margin: auto;
            font-weight: 500;
        }
        .row {
            position: relative;
            height: 3rem;
            width: 17rem;
            border-bottom: 1px solid rgba(245, 245, 245, 1);
            margin: auto;
            img {
                width: 1.5rem;
                height: 1.5rem;
                margin: 0.7rem 0 0 0.5rem;
            }
            span {
                position: absolute;
                height: 3rem;
                top: 0;
                line-height: 3rem;
                font-size: 0.75rem;
                font-family: 'PingFangSC-Regular';
                color: rgba(51, 51, 51, 1);
            }
            .cont {
                right: 0;
                color: #32B6E6;
            }
            .title {
                left: 2.5rem;
            }
        }
    }
</style>