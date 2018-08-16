<template>
    <div class='userinfo_sex'>
        <h3>性别</h3>
        <div class='sex_box'>
            <ul>
                <li style='border-bottom:1px solid #eee;' class='sex_li' :class='{active:sextmp==0}' @click='confirm_sex(0)'>男</li>
                <li @click='confirm_sex(1)' class='sex_li' :class='{active:sextmp==1}'>女</li>
            </ul>
        </div>
        <div class="save" @click='confirm'>保存</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sex_radio: true,
                sextmp: 0,
                params: {}
            }
        },
        methods: {
            confirm_sex(sex) {
                this.sextmp = sex;
                if (sex == 0) {
                    this.tempSex = '男';
                } else {
                    this.tempSex = '女';
                }
            },
            confirm(index) {
                var that = this;
            
                this.$router.push({
                    path: that.params.from,
                    query: {
                        name: that.params.row,
                        value: that.sextmp == 0 ? '男' : "女"
                    }
                })
            },
        },
        mounted() {
            this.params = this.$route.query;
        }
    }
</script>

<style lang='scss' scoped>
    .userinfo_sex {
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
    }
    .bottomBorder {
        width: 17rem;
        border-top: 1px solid #ededed;
        margin: auto;
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
    .sex_li {
        height: 2rem;
        width: 100%;
        line-height: 2rem;
        text-align: center;
        border-top: 1px solid #f5f5f5;
        font-size: 0.8rem;
        border-bottom: 1px solid #f5f5f5;
    }
    .sex_li.active {
        color: #007aff;
        font-size: 0.9rem;
        background: #f9f9f9;
    }
</style>