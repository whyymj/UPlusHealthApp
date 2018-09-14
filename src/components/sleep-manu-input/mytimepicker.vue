<template>
    <div class='wh_mytimepicker'>
        <mt-popup v-model="popupVisible" position="bottom">
            <div class='buttons' style='width：18.75rem;height:2.5rem;'>
                <span style='float:left;width:50%;box-sizing:border-box;height:100%;text-align:center;line-height:2rem;border:1px solid #F5F5F5;' @click='cancel'>取消</span>
                <span style='float:left;width:50%;box-sizing:border-box;height:100%;text-align:center;line-height:2rem;border:1px solid #F5F5F5;border-left:none;' @click='sure'>确认</span>
            </div>
            <div style='width:18.75rem' v-if='popupVisible'>
                <mt-picker style='width:50%;float:left;' :slots="slots1" @change="onValuesChange1"></mt-picker>
                <mt-picker style='width:50%;float:left;' :slots="slots2" @change="onValuesChange2"></mt-picker>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import bus from '../eventbus.js';
    export default {
        props: ['time_gap'],
        watch: {
            time_gap() {
                this.refresh();
            }
        },
        methods: {
            refresh() {
                if (typeof this.time_gap == 'object' && this.time_gap.length) {
                    this.startTime = this.time_gap.map(function(item) {
                        return item.split('-')[0].trim()
                    });
                    this.endTime = this.time_gap.map(function(item) {
                        return item.split('-')[1].trim()
                    });
                    this.area = [];
                    var that = this;
                    var arr = [];
                    this.hourArr = [];
                    var sh, sm, eh, em;
                    for (var i = 0; i < this.startTime.length; i++) {
                        sh = this.startTime[i].split(':')[0] * 1 || 0;
                        sm = this.startTime[i].split(':')[1] * 1 || 0;
                        eh = this.endTime[i].split(':')[0] * 1 || 0;
                        em = this.endTime[i].split(':')[1] * 1 || 0;
                        arr = [sh * 60 + sm, eh * 60 + em]; //化为分钟数的区间
                        this.area.push(arr);
                        for (var j = sh; j <= eh; j++) {
                            this.hourArr.push(j > 9 ? j : '0' + j);
                        }
                    }
                    this.hourArr = this.hourArr.sort(function(a, b) {
                        return a - b
                    })
                    console.log('area>', this.hourArr, this.area);
                    this.startHour = this.startTime[0].split(':')[0] * 1 || 0; //默认的值
                    this.startMin = this.startTime[0].split(':')[1] * 1 || 0; //默认的值
                    this.endHour = this.endTime[0].split(':')[0] * 1; //默认的值
                    this.endMin = this.endTime[0].split(':')[1] * 1; //默认的值
                    arr = [];
                    var curTime = this.hourArr[0] * 60;
                    var flag;
                    var tmp;
                    for (var i = curTime; i < curTime + 60; i++) {
                        flag = false;
                        this.area.map(function(item) {
                            if (i >= item[0] && i <= item[1]) {
                                flag = true;
                            }
                        })
                        if (flag) {
                            tmp = i % 60;
                            arr.push(tmp > 9 ? tmp : '0' + tmp);
                        }
                    }
                    var slots1 = [{
                        flex: 1,
                        values: that.hourArr,
                        className: 'slot1',
                        textAlign: 'center'
                    }, {
                        divider: true,
                        content: ':',
                        className: 'slot2'
                    }];
                    var slots2 = [{
                        flex: 1,
                        values: arr,
                        className: 'slot3',
                        textAlign: 'center',
                    }];
                    this.slots1 = slots1;
                    this.slots2 = slots2;
                    console.log('slots>', this.slots1, this.slots2);
                }
            },
            cancel() {
                this.popupVisible = !this.popupVisible;
            },
            sure() {
                this.popupVisible = !this.popupVisible;
                var h = this.curHour * 1;
                var m = this.curMinu * 1;
                this.$emit('confirm', [h > 9 ? h : '0' + h, m > 9 ? m : '0' + m])
            },
            onValuesChange1(picker, values) {
                if (this.area && this.area.length) {
                    var curHour = values[0] || this.hourArr[0];
                    var startmin = curHour * 60;
                    var flag;
                    var arr = [];
                    var tmp;
                    for (var i = startmin; i < startmin + 60; i++) {
                        flag = false;
                        this.area.map(function(item) {
                            if (i >= item[0] && i <= item[1]) {
                                flag = true;
                            }
                        })
                        if (flag) {
                            tmp = i % 60;
                            arr.push(tmp > 9 ? tmp : '0' + tmp);
                        }
                    }
                    var slots2 = [{
                        flex: 1,
                        values: arr,
                        className: 'slot3',
                        textAlign: 'center'
                    }];
                    this.slots2 = slots2;
                    this.curHour = values[0];
                }
            },
            onValuesChange2(picker, values) {
                this.curMinu = values[0] * 1 || (this.curHour == this.startHour ? this.startMin : 0);
            }
        },
        data() {
            return {
                startTime: [],
                endTime: [],
                curHour: -1,
                curMinu: -1,
                popupVisible: false,
                startHour: '',
                startMin: '',
                endHour: '',
                endMin: '',
                hourArr: [],
                area: [], //时间区间
                slots1: [{
                    flex: 1,
                    values: ['00'],
                    className: 'slot1',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: ':',
                    className: 'slot2'
                }],
                slots2: [{
                    flex: 1,
                    values: ['00', '01'],
                    className: 'slot3',
                    textAlign: 'center'
                }]
            }
        },
        mounted() {
            var that = this;
            this.refresh();
            bus.$on('toggle', function() {
                that.popupVisible = !that.popupVisible;
            })
        }
    }
</script>

<style lang='scss' scoped>
    .wh_mytimepicker {
        .buttons {
            span {
                font-size: 0.8rem;
                font-family: 'PingFangSC-Regular';
                color: rgba(34, 131, 226, 1);
            }
        }
    }
</style>