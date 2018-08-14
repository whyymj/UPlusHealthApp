<template>
    <div>
        <mt-popup v-model="popupVisible" position="bottom">
            <div style='width:18.75rem'>
                <mt-picker style='width:50%;float:left;' :slots="slots1" @change="onValuesChange1"></mt-picker>
                <mt-picker style='width:50%;float:left;' :slots="slots2" @change="onValuesChange2"></mt-picker>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import bus from './bus.js';
    export default {
        props: ['startTime', 'endTime'],
        watch: {
            startTime() {
                var arr = [];
                var sh, sm, eh, em;
                for (var i = 0; i < this.startTime.length; i++) {
                    sh = this.startTime[i].split(':')[0] * 1 || 0;
                    sm = this.startTime[i].split(':')[1] * 1 || 0;
                    eh = this.endTime[i].split(':')[0] * 1 || 0;
                    em = this.endTime[i].split(':')[1] * 1 || 0;
                    arr = [sh * 60 + sm, eh * 60 + em];
                    this.area.push(arr);
                }
            },
            endTime() {
                var arr = [];
                var sh, sm, eh, em;
                for (var i = 0; i < this.startTime.length; i++) {
                    sh = this.startTime[i].split(':')[0] * 1 || 0;
                    sm = this.startTime[i].split(':')[1] * 1 || 0;
                    eh = this.endTime[i].split(':')[0] * 1 || 0;
                    em = this.endTime[i].split(':')[1] * 1 || 0;
                    arr = [sh * 60 + sm, eh * 60 + em];
                    this.area.push(arr);
                }
            }
        },
        methods: {
            onValuesChange1(picker, values) {
                if (this.area && this.area.length) {
                    var h = values[0] || this.hourArr[0];
                    var m = this.curMinu;
                    var curHour = h * 1;
                    var curTime = h * 60 + m * 1;
                    var arr = [];
                    if (this.curHour * 1 != curHour) {
                        this.curHour = curHour;
                        var index = 0;
                        var tmp = '';
                        for (var i = 0; i < this.area.length; i++) {
                            if (curTime >= this.area[i][0] && curTime <= this.area[i][1]) {
                                index = i;
                                for (var j = curTime; j < this.area[i][1]; j++) {
                                    if (j % 60 == 0 && j != curTime) {
                                        break;
                                    }
                                    tmp = j % 60
                                    arr.push(tmp > 9 ? tmp : '0' + tmp);
                                }
                            } else {
                                continue;
                            }
                        }
                        for (var i = curTime - 1; i >= this.area[index][0]; i--) {
                            tmp = i % 60
                            arr.unshift(tmp > 9 ? tmp : '0' + tmp)
                            if (i % 60 == 0) {
                                break;
                            }
                        }
                        if (this.curHour * 1 == this.startHour * 1) {
                            arr = [];
                            for (var i = this.startMin; i <= this.area[0][1]; i++) {
                                if (i % 60 == 0 && i != this.startMin) {
                                    break;
                                }
                                arr.push(i % 60);
                            }
                        }
                        this.slots2 = [{
                            flex: 1,
                            values: arr,
                            className: 'slot3',
                            textAlign: 'center'
                        }]
                    }
                }
            },
            onValuesChange2(picker, values) {
                this.curMinu = values[0] * 1 || (this.curHour == this.startHour ? this.startMin : 0);
            }
        },
        data() {
            return {
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
            this.area = [];
            var that = this;
            var arr = [];
            var sh, sm, eh, em;
            for (var i = 0; i < this.startTime.length; i++) {
                sh = this.startTime[i].split(':')[0] * 1 || 0;
                sm = this.startTime[i].split(':')[1] * 1 || 0;
                eh = this.endTime[i].split(':')[0] * 1 || 0;
                em = this.endTime[i].split(':')[1] * 1 || 0;
                arr = [sh * 60 + sm, eh * 60 + em];
                this.area.push(arr);
                for (var j = sh; j <= eh; j++) {
                    this.hourArr.push(j > 9 ? j : '0' + j);
                }
            }
            this.startHour = this.startTime[0].split(':')[0] * 1 || 0;
            this.startMin = this.startTime[0].split(':')[1] * 1 || 0;
            this.endHour = this.endTime[0].split(':')[0] * 1;
            this.endMin = this.endTime[0].split(':')[1] * 1;
            arr = [];
            var curTime = this.area[0][0];
            for (var i = curTime; i < this.area[0][1]; i++) {
                if (i % 60 == 0 && i != curTime) {
                    break;
                }
                arr.push(i % 60);
            }
            var slots1 = [{
                flex: 1,
                values: that.hourArr.sort(function(a, b) {
                    return a - b
                }),
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
                textAlign: 'center'
            }];
            this.slots1 = slots1;
            this.slots2 = slots2;
            console.log(this.slots1, this.slots2, this.area);
            bus.$on('toggle', function() {
                that.popupVisible = !that.popupVisible;
            })
        }
    }
</script>

<style scoped>

</style>