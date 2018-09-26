<template>
    <!-- 生日选择 -->
    <div style='width:18.75rem;' class='my_userinfo_birthday'>
        <h3>生日</h3>
        <div class='birthday_container'>
            <mt-picker :slots="slots1" @change="changeYears"></mt-picker>
            <mt-picker :slots="slots2" @change="changeMonths" v-if='refreshmonth'></mt-picker>
            <mt-picker :slots="slots3" @change="changeDates" v-if='refreshdate'></mt-picker>
        </div>
        <ul class='date_title'>
            <li>年</li>
            <li>月</li>
            <li>日</li>
        </ul>
        <div class="save" @click='confirm'>保存</div>
         <myLoadingModal :show='showMyLoadingModal'></myLoadingModal>
    </div>
</template>

<script>
    export default {
        
        methods: {
            getMonthDate(year, month) {
                var firstDay = new Date(year, month - 1, 1);
                var lastDay = new Date(year, month, 0);
                var firday = firstDay.getDate();
                var lasday = lastDay.getDate();
                var date = [];
                if (year == this.thisyear && month == this.thismonth) {
                    lasday = this.thisdate;
                }
                for (var i = firday; i <= lasday; i++) {
                    date.push({
                        year: year,
                        month: month,
                        date: i,
                        day: new Date(year, month - 1, i).getDay()
                    });
                }
                return date;
            },
            confirm(index) {
                this.birthday = this.birthdayarr[0] + '年' + this.birthdayarr[1] + '月' + this.birthdayarr[2] + '日'
                var that = this;
                this.$router.push({
                    path: that.params.from,
                    query: {
                        name: that.params.row,
                        value: that.birthday
                    }
                })
            },
            changeYears(picker, values) {
                var that = this;
                this.birthdayarr[0] = values[0];
                this.refreshmonth = false;
                this.refreshdate = false;
                var days = this.getMonthDate(this.birthdayarr[0], this.birthdayarr[1] * 1).reverse().map(function(item, index) {
                    return item.date > 9 ? item.date : '0' + item.date;
                })
                if (this.birthdayarr[0] != this.thisyear) {
                    this.slots2 = [{
                        flex: 1,
                        defaultIndex: that.loading ? (12 - that.defaultM) : 0,
                        values: [12, 11, 10, '09', '08', '07', '06', '05', '04', '03', '02', '01'],
                        className: "slot2",
                        textAlign: "center"
                    }]
                } else {
                    var arr = [];
                    for (var i = this.thismonth; i > 0; i--) {
                        arr.push(i > 9 ? i : ('0' + i));
                        this.slots2 = [{
                            flex: 1,
                            defaultIndex: that.loading ? (that.thismonth - that.defaultM) : 0,
                            values: arr,
                            className: "slot2",
                            textAlign: "center"
                        }]
                    }
                }
                this.slots3 = [{
                    flex: 1,
                    values: days,
                    className: "slot3",
                    textAlign: "center"
                }];
                this.$nextTick(function() {
                    that.refreshmonth = true;
                    that.refreshdate = true;
                });
            },
            changeMonths(picker, values) {
                var that = this;
                this.birthdayarr[1] = values[0];
                this.refreshdate = false;
                var days = this.getMonthDate(this.birthdayarr[0], this.birthdayarr[1] * 1).reverse().map(function(item, index) {
                    return item.date > 9 ? item.date : '0' + item.date;
                })
                this.slots3 = [{
                    flex: 1,
                    values: days,
                    defaultIndex: that.loading ? (days[0] - that.defaultD) : 0,
                    className: "slot3",
                    textAlign: "center"
                }];
                this.$nextTick(function() {
                    that.refreshdate = true;
                });
            },
            changeDates(picker, values) {
                this.birthdayarr[2] = values[0];
            },
        },
        data() {
            return {
                refreshmonth: true,
                refreshdate: true,
                birthday_picker: true,
                birthdayarr: ['', '', ''],
                slots1: [{
                    flex: 1,
                    values: [],
                    className: "slot1",
                    textAlign: "center"
                }],
                slots2: [{
                    flex: 1,
                    values: [],
                    className: "slot2",
                    textAlign: "center"
                }],
                slots3: [{
                    flex: 1,
                    values: [],
                    className: "slot3",
                    textAlign: "center"
                }],
                thisyear: '',
                thismonth: "",
                thisdate: "",
                defaultY: 0,
                defaultM: 0,
                defaultD: 0,
                params: {},
                loading: true,
                loadingmodal: '',
                showMyLoadingModal:true
            }
        },
        mounted() {
            this.showMyLoadingModal = true;
            var that = this;
            var years = [];
            var months = [];
            var tall = [];
            var days = [];
            var thisYear = new Date().getFullYear();
            var thisMonth = new Date().getMonth() + 1;
            var today = new Date().getDate();
            this.thisyear = thisYear;
            this.thismonth = thisMonth;
            this.thisdate = today;
            this.params = this.$route.query;
            var tmp = '';
            this.defaultY = this.params.val.split('年')[0] || thisYear;
            tmp = this.params.val.split('年')[1] || '';
            this.defaultM = tmp.split('月')[0] || thisMonth;
            tmp = tmp.split('月')[1] || '';
            this.defaultD = tmp.split('日')[0] || today;
            for (var i = thisYear; i >= 1900; i--) {
                years.push(i);
            }
            for (var i = thisMonth; i > 0; i--) {
                months.push(i > 9 ? i : '0' + i);
            }
            for (var i = today; i > 0; i--) {
                days.push(i > 9 ? i : '0' + i)
            }
            this.slots1 = [{
                flex: 1,
                defaultIndex: that.thisyear - that.defaultY || 0,
                values: years,
                className: "slot1",
                textAlign: "center"
            }];
            this.slots2 = [{
                flex: 1,
                defaultIndex: that.thismonth - that.defaultM || 0,
                values: months,
                className: "slot2",
                textAlign: "center"
            }];
            this.slots3 = [{
                flex: 1,
                values: days,
                defaultIndex: that.thisdate - that.defaultD || 0,
                className: "slot3",
                textAlign: "center"
            }];
            this.birthdayarr = [thisYear, thisMonth, today];
            setTimeout(function() {
                that.showMyLoadingModal=false;
                that.loading = false;
            }, 1000)
        },
    }
</script>

<style lang='scss' scoped>
    .my_userinfo_birthday {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        h3 {
            width: 100%;
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            font-size: 0.8rem;
            font-weight: 500;
            border-bottom: 1px solid #f5f5f5;
        }
        .picker {
            width: 33.3%;
            float: left;
            div {
                text-align: center;
            }
        }
        .birthday_container {
            position: relative;
            overflow: hidden;
            .unit1,
            .unit2,
            .unit3 {
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
                height: 2rem;
                line-height: 1.9rem;
                font-size: 0.8rem;
                font-family: 'PingFangSC-Regular';
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
            }
            .unit1 {
                left: 25%;
            }
            .unit2 {
                left: 55%
            }
            .unit3 {
                left: 88%
            }
        }
        .save {
            position: absolute;
            bottom: 0;
            width: 18.75rem;
            background: #007aff;
            height: 3rem;
            text-align: center;
            line-height: 3rem;
            font-size: 0.8rem;
            font-family: "PingFangSC-Regular";
            color: #fff;
            /*border: 1px solid #f5f5f5;*/
            font-weight: 500;
        }
        .date_title {
            height: 2rem;
            width: 100%;
            float: left;
            border-top: 1px solid #f5f5f5;
            border-bottom: 1px solid #f5f5f5;
            li {
                width: 33.3%;
                height: 100%;
                text-align: center;
                float: left;
                line-height: 2rem;
                font-size: 0.7rem;
                font-weight: 600;
                font-family: "PingFangSC-Regular";
            }
        }
    }
</style>