<template>
    <div class='wh_userinfo_tall'>
        
        <div style='width:18.75rem;' class='height_box'>
        	<h3>身高</h3>
            <mt-picker :slots="tallarr" @change="select_tall"></mt-picker>
            <span class="unit">厘米</span>
        </div>
        <div class="save" @click='confirm'>保存</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                talltmp: 180 + '厘米',
                tall: 180 + '厘米',
                tallarr: [],
                params: {}
            }
        },
        methods: {
            confirm(index) {
                this.tall = this.talltmp;
                var that = this;
                this.$router.push({
                    path: that.params.from,
                    query: {
                        name: that.params.row,
                        value: that.talltmp
                    }
                })
            },
            select_tall(picker, value) {
                this.talltmp = (value[0] || 180) + '厘米'
            },
        },
        mounted() {
            var that = this;
            this.params = this.$route.query;
            this.talltmp = this.params.val||'180厘米';
            this.tall = this.params.val||'180厘米';
            var tall = [];
            for (var i = 250; i > 100; i--) {
                tall.push(i);
            }
            this.tallarr = [{
                flex: 1,
                defaultIndex: 250 - that.params.val.split('厘米')[0],
                values: tall,
                className: "slot1",
                textAlign: "center"
            }]
        }
    }
</script>

<style lang='scss' scoped>
    .wh_userinfo_tall {
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
        .height_box {
            border-top: 1px solid #f5f5f5;
            border-bottom: 1px solid #f5f5f5;
            position: relative;
            margin-top:7rem;
            .unit {
                position: absolute;
                top: 0;
                bottom: 0;
                right:30%;
                margin: auto;
                height: 0rem;
                line-height: 2rem;
                font-size: 0.8rem;
                font-family: 'PingFangSC-Regular';
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
            }
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