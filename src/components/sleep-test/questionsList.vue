<template>
    <div class='myquestions'>
        <h1>{{list.title}}</h1>
        <table>
            <tr v-for='(item,index) in list.options' :key='index' :style="{background:index%2==0?'#fff':'rgba(250,250,250,1)'}">
                <td class="lefttd">{{item.lab}}</td>
                <td class='righttd' >
                    <p @click='closeReInit'>
                        <el-radio v-model="radio" :label="index" v-if='type==1'></el-radio>
                        <el-checkbox v-model="checkbox" :label="index" @change='selectcheckbox' v-else></el-checkbox>
                    </p>
                </td>
            </tr>
        </table>
        <!-- 在turnQuestions中代理触发事件 -->
        <div class="nextbut" v-if='checkbox.length>0&&id<total-1'>下一题</div>
    </div>
</template>

<script>
    import bus from '../../assets/healthSleep/bus.js'
    export default {
        props: ['list', 'id', 'total'],
        methods: {
            selectcheckbox() {
                var that = this;
                this.$emit('selectQuestion', {
                    questnum: that.id,
                    option: that.checkbox
                })
            },
            closeReInit() {

                bus.$emit('closeReInitButton',this.id);
            }
        },
        data() {
            return {
                type: 1, //1单选；2多选
                doubleclick: 0,
                radio: '',
                checkbox: [],
                value: '',
                bgcolor: 'background:rgba(250,250,250,1);'
            }
        },
        watch: {
            radio() {
                if (this.type == 1) {
                    var that = this;
                    this.$emit('selectQuestion', {
                        questnum: that.id,
                        option: [that.radio]
                    })
                }
            },
            list() {
                var that = this;
                this.type = this.list.type
                this.list.options.map(function(item, index) {
                    if (item.checked === true || item.checked === 'true') {
                        if (that.type == 1) {
                            that.radio = index;
                        } else {
                            that.checkbox.push(index);
                        }
                    }
                });
                this.type = this.list.type
            }
        },
        mounted() {
            var that = this;
            if (this.list && this.list.options) {
                this.type = this.list.type
                this.list.options.map(function(item, index) {
                    if (item.checked === true || item.checked === 'true') {
                        if (that.type == 1) {
                            that.radio = index;
                        } else {
                            that.checkbox.push(index)
                        }
                    }
                });
            }
        }
    }
</script>

<style lang='scss'>
    h1 {
        font-size: 0.9rem;
        font-family: 'PingFangSC-Regular';
        color: rgba(17, 17, 17, 1);
        line-height: 2rem;
        padding: 0 1rem;
        font-weight: 600;
    }
    .myquestions {
        width: 100%;
        overflow: hidden;
        table {
            width: 100%;
            td {
                height: 2rem;
                line-height: 2rem;
                position: relative;
                padding: 0 1rem;
                font-size: 0.75rem;
                font-family: 'PingFangSC-Regular';
                color: rgba(51, 51, 51, 1);
                p {
                    position: absolute;
                    width: 1.2rem;
                    height: 1.2rem;
                    border-radius: 50%; // border: 1px solid #32B6E6;
                    right: 1rem;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    font-size: 1rem; // box-sizing: border-box;
                    .el-radio {
                        width: 1.2rem;
                        height: 1.2rem;
                        position: absolute;
                        top: 0;
                        left: 0;
                        border-radius: 50%;
                        margin: auto;
                        bottom: 0;
                        right: 0;
                        .el-radio__input {
                            width: 100%;
                            height: 100%;
                            box-sizing: border-box;
                            border-radius: 50%;
                            border: 1px solid #32B6E6;
                        }
                        .el-radio__label {
                            display: none;
                            border: 0;
                            box-sizing: border-box;
                        }
                        span,
                        .el-radio__inner {
                            position: absolute;
                            box-sizing: border-box;
                            border: 0;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            bottom: 0;
                            right: 0;
                            margin: auto;
                            input {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                    .el-checkbox {
                        width: 1.2rem;
                        height: 1.2rem;
                        position: absolute;
                        top: 0;
                        left: 0;
                        border-radius: 50%;
                        margin: auto;
                        bottom: 0;
                        right: 0;
                        .el-checkbox__label {
                            display: none;
                        }
                        .el-checkbox__input {
                            width: 100%;
                            height: 100%;
                            box-sizing: border-box;
                            border: 1px solid #32B6E6;
                        }
                        span,
                        .el-checkbox__inner {
                            position: absolute;
                            box-sizing: border-box;
                            border: 0;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            bottom: 0;
                            right: 0;
                            margin: auto;
                            input {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .el-checkbox__inner::after {
                            width: 40%;
                            height: 60%;
                            left: 0.3rem
                        }
                    }
                }
            }
            .lefttd {
                text-align: left;
                width: 80%;
            }
            .righttd {
                text-align: right;
            }
        }
        .nextbut {
            width: 8rem;
            height: 2rem;
            background: rgba(34, 131, 226, 1);
            box-shadow: 0rem 0.4rem 0.8rem rgba(34, 131, 226, 0.4);
            border-radius: 1.18rem;
            font-size: 0.8rem;
            font-family: 'PingFangSC-Regular';
            color: rgba(255, 255, 255, 1);
            line-height: 2rem;
            text-align: center;
            position: absolute;
            bottom: 3rem;
            left: 0;
            right: 0;
            margin: auto;
        }
    }
</style>