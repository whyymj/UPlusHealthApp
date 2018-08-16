<template>
    <div class='wh_userinfo_weight'>
        <h3>体重</h3>
        <div class='weight_box weight_picker' style='width:18.75rem;'>
            <mt-picker :slots="weightarr1" @change="select_weight1"></mt-picker>
            <mt-picker :slots="weightarr2" @change="select_weight2"></mt-picker>
        </div>
        <div class="save" @click='confirm'>保存</div>
    </div>
</template>

<script>
    export default {
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
                this.weightWhole[0] = value[0] || 75;
            },
            select_weight2(picker, value) {
                this.weightWhole[1] = value[0] || 0;
            },
        },
        mounted() {
            this.params = this.$route.query;
            var weightarr = [];
            for (var i = 200; i > 1; i--) {
                weightarr.push(i)
            }
            this.weightarr1 = [{
                flex: 1,
                values: weightarr,
                className: "slot3",
                textAlign: "center",
                defaultIndex: 125
            }];
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
        h3 {
            width: 100%;
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            font-size: 0.8rem;
            font-weight: 500;
        }
        .weight_box {
            border-top: 1px solid #f5f5f5;
            border-bottom: 1px solid #f5f5f5;
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
        border: 1px solid #f5f5f5;
        font-weight: 500;
    }
</style>