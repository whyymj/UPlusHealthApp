<template>
    <div class='userinfo_nickname'>
        <el-input style='border:none;' v-model="input" maxlength=16 placeholder="请输入昵称（不超过16字符）"></el-input>
        <div class='bottomBorder'></div>
        <div class="save" @click='save'>保存</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                input: "",
                params: {}
            };
        },
        methods: {
            save() {
                var that = this;
                this.$router.push({
                    path: that.params.from,
                    query: {
                        name: that.params.row,
                        value: that.input
                    }
                })
            }
        },
        mounted() {
            this.params = this.$route.query;
        }
    };
</script>

<style lang='scss'>
    .userinfo_nickname {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        .el-input {
            border: none;
            input {
                border: none;
                margin: 0.5rem 0.2rem;
                font-size: 0.7rem;
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
    }
</style>