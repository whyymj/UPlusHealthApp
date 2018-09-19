<template>
    <div class='userinfo_nickname'>
        <el-input style='border:none;' v-model="input" maxlength=16 placeholder="请输入昵称（不超过16字符）"></el-input>
        <i class='el-icon-circle-close-outline' @click='input=""'></i>
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
                console.log(this.$router);
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
            this.input = this.params.val || ''
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

        .el-icon-circle-close-outline {
            position: absolute;
            top:1rem;
            font-size: 1rem;right:1rem;
            color:#ccc;
        }
        .el-input {
            border: none;
            input {
                border: none;
                padding:0 1.0rem;
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