<template>
    <div class='wh_userinfo_weight'>
        <div class='css_center'>
            <h3>体重</h3>
            <div class='weight_box weight_picker' style='width:18.75rem;'>
                <mt-picker :slots="weightarr1" @change="select_weight1"></mt-picker>
                <mt-picker :slots="weightarr2" @change="select_weight2"></mt-picker>
                <span class="unit">公斤</span>
                <span class=" unit unit2">.</span>
            </div>
        </div>
        <div class="save" @click='confirm'>保存</div>
    </div>
</template>

<script>
    import {
        Loading
    } from 'element-ui';
    export default {
        components: {
            Loading
        },
        data() {
            return {
                weightarr1: [],
                weightarr2: [{
                    flex: 1,
                    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    className: "slot3",
                    textAlign: "center"
                }],
                weightWhole: [75, 0],
                loading: true,
                loadingmodal: '',
                floatnum: 0
            }
        },
        methods: {
            confirm(index) {
                this.weight = this.weightWhole[0] + '.' + this.weightWhole[1] + '公斤'
                var that = this;
                this.$router.push({
                    path: that.params.from,
                    query: {
                        name: that.params.row,
                        value: that.weight
                    }
                })
            },
            select_weight1(picker, value) {
                var that = this;
                this.weightWhole[0] = value[0] || 75;
                this.weightarr2 = [{
                    flex: 1,
                    defaultIndex: that.loading ? that.floatnum * 1 : 0,
                    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    className: "slot3",
                    textAlign: "center"
                }]
            },
            select_weight2(picker, value) {
                this.weightWhole[1] = value[0] || 0;
            },
        },
        mounted() {
            this.loadingmodal = Loading.service({ //遮罩
                fullscreen: true,
                background: 'rgba(0, 0, 0, 0.7)',
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
            });
            var that = this;
            this.params = this.$route.query;
            this.weightWhole[0] = Math.floor((typeof that.params.val == 'string') ? (that.params.val.split('公斤')[0]) : 75);
            var tmp = (typeof that.params.val == 'string' && that.params.val != '') ? (that.params.val.split('公斤')[0]) : '75.0';
            this.weightWhole[1] = tmp.split('.')[1] || 0;
            this.floatnum = this.weightWhole[1];
            var weightarr = [];
            for (var i = 200; i > 1; i--) {
                weightarr.push(i)
            }
            this.weightarr1 = [{
                flex: 1,
                values: weightarr,
                defaultIndex: 200 - Math.floor((typeof that.params.val == 'string' && that.params.val != '') ? (that.params.val.split('公斤')[0]) : 75),
                className: "slot3",
                textAlign: "center"
            }];
            this.weightarr2 = [{
                flex: 1,
                defaultIndex: that.floatnum * 1,
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                className: "slot3",
                textAlign: "center"
            }]
            setTimeout(function() {
                that.loadingmodal.close();
                that.loading = false;
            }, 500)
        }
    }
</script>

<style lang='scss' scoped>
    .wh_userinfo_weight {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        .css_center {
            position: fixed;
            overflow: hidden;
            top: 40%;
            left: 0;
            transform: translate(0, -50%)
        }
        h3 {
            width: 100%;
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            font-size: 0.8rem;
            font-weight: 500;
        }
        .weight_box {
            overflow: hidden;
            position: relative;
            border-top: 1px solid #f5f5f5;
            border-bottom: 1px solid #f5f5f5;
            .unit {
                position: absolute;
                top: 0;
                bottom: 0;
                right: 2rem;
                margin: auto;
                height: 2rem;
                line-height: 2rem;
                font-size: 0.8rem;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                &.unit2 {
                    font-weight: 700;
                    left: 49%;
                }
            }
        }
    }
    .weight_picker {
        width: 18.75rem;
        .picker {
            width: 50%;
            float: left;
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
</style>