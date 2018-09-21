<template>
    <div class='additionInfo'>
        <el-input type="textarea" style='border:none;' autosize placeholder="请输入备注" v-model="textarea2">
        </el-input>
        <div class="save" @click='confirm'>保存</div>
    </div>
</template>

<script>
    export default {
        name: 'additionInfo',
        data() {
            return {
                textarea2: '',
                params:''
            }
        },
        methods: {
            confirm(index) {
                var that = this;
                this.$router.push({
                    path: that.params.from,
                    query: {
                        name: that.params.row,
                        value: that.textarea2
                    }
                })
            },
        },
        mounted() {
            this.params = this.$route.query;
            this.textarea2=this.params.default;
        }
    }
</script>

<style lang='scss'>
    .additionInfo {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #fff;
        .el-textarea {
            width: 17rem;
            margin: .5rem 0.8rem;
            textarea {
                width: 17rem;
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
    }
</style>