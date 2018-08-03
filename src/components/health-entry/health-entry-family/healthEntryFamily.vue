<template>
    <div class="healthEntryFamily">
        <div class="body">
            <div class="body_1">
                <div class="body_11">
                    <div class="body_11_txt">基本信息</div>
                </div>
                <div class="body_12">
                    <div class="body_121" @click='choose_nick_name'>
                        <span class="body_1211">昵称</span>
                        <span class="body_1212">&middot;</span>
                        <el-input v-model="input_nick_name" placeholder="请输入昵称（不超过16字符）" maxlength=16 @change='input_nick'></el-input>
                        <span class="body_1213"><span></span>&nbsp&nbsp<i class="el-icon-arrow-right" style='color:#DADADA;'></i></span>
                    </div>
                    <div class="body_121" @click='choose_sex'>
                        <span class="body_1211">性别</span>
                        <span class="body_1212">&middot;</span>
                        <span class="body_1213"><span>{{sex}}</span>&nbsp&nbsp<i class="el-icon-arrow-right" style='color:#DADADA;'></i></span>
                    </div>
                    <div class="body_121" @click='pick_birthday'>
                        <span class="body_1211">生日</span>
                        <span class="body_1212">&middot;</span>
                        <span class="body_1213"><span>{{birthday}}</span>&nbsp&nbsp<i class="el-icon-arrow-right" style='color:#DADADA;'></i></span>
                    </div>
                    <div class="body_121">
                        <span class="body_1211">身高</span>
                        <span class="body_1212">&middot;</span>
                        <span class="body_1213"><span>{{tall}}</span>&nbsp&nbsp<i class="el-icon-arrow-right" style='color:#DADADA;'></i></span>
                    </div>
                    <div class="body_121">
                        <span class="body_1211">体重</span>
                        <span class="body_1212">&middot;</span>
                        <span class="body_1213"><span>{{weight}}</span>&nbsp&nbsp<i class="el-icon-arrow-right" style='color:#DADADA;'></i></span>
                    </div>
                    <div class="body_122">
                        <div class="body_1221">
                            *蓝点圆点标示的为必填选项
                        </div>
                    </div>
                </div>
            </div>
            <div class="body_2">
                <div class="body_21" style='font-weight:500;'>健康信息</div>
                <div class="body_22">
                    <div class="body_221">你是否有慢病史？</div>
                    <div class="body_222">
                        <el-switch v-model="chronDiseaseHistory">
                        </el-switch>
                    </div>
                </div>
                <div class="body_122" v-show='chronDiseaseHistory'>
                    <div class="body_1221 body_231">请选择慢病标签&nbsp;&nbsp;&nbsp;(可多选)：</div>
                </div>
                <tagslist :tags='chromiclist' name='chronic' @choose='chooseChromic' v-show='chronDiseaseHistory'></tagslist>
                <div class="body_22">
                    <div class="body_221">你是否有过敏史？</div>
                    <div class="body_222">
                        <el-switch v-model="allergyHistory">
                        </el-switch>
                    </div>
                </div>
                <div class="body_122" v-show='allergyHistory'>
                    <div class="body_1221 body_231">请选择过敏源&nbsp;&nbsp;&nbsp;(可多选)：</div>
                </div>
                <tagslist :tags='allergylist' name='allergy' @choose='chooseAllergy' v-show='allergyHistory'></tagslist>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom_text">完成</div>
        </div>
        <mt-popup v-model="birthday_picker" position="bottom">
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
            <ul class='date_title'>
                <li>年</li>
                <li>月</li>
                <li>日</li>
            </ul>
        </mt-popup>
        <el-dialog title="性别" :visible.sync="sex_radio" :modal-append-to-body='false' width='95%'>
            <div class='sex_box'>
                <ul>
                    <li style='border-bottom:1px solid #eee;'>男</li>
                    <li>女</li>
                </ul>
            </div>
            <div class="button">确定</div>
        </el-dialog>
    </div>
</template>
<script>
    import tagslist from './tagsList';
    export default {
        components: {
            tagslist
        },
        data() {
            return {
                birthday_picker: false,
                slots: [{
                    flex: 1,
                    values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                    className: 'slot1',
                    textAlign: 'right'
                }, {
                    divider: true,
                    content: ':',
                    className: 'slot2'
                }, {
                    flex: 1,
                    values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                    className: 'slot3',
                    textAlign: 'left'
                }, {
                    divider: true,
                    content: ':',
                    className: 'slot2'
                }, {
                    flex: 1,
                    values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                    className: 'slot3',
                    textAlign: 'left'
                }],
                nick_name_pop: false,
                input_nick_name: "",
                sex_radio: false,
                sex: '男',
                chronDiseaseHistory: true, //慢病史
                allergyHistory: true, //过敏史
                birthday: '1992年02月16日', //生日
                tall: '166厘米', //身高
                weight: "58.5公斤", //体重
                chromicListResult: [],
                allergyListResult: [],
                chromiclist: [{
                    name: '心脏病',
                    selected: false
                }, {
                    name: '鼻炎',
                    selected: false
                }, {
                    name: '痛风',
                    selected: false
                }, {
                    name: '糖尿病',
                    selected: true
                }, {
                    name: '关节炎',
                    selected: false
                }, {
                    name: '高血压',
                    selected: true
                }, {
                    name: '偏头痛',
                    selected: false
                }, {
                    name: '低血糖',
                    selected: false
                }],
                allergylist: [{
                    name: '水果',
                    selected: false
                }, {
                    name: '海鲜',
                    selected: false
                }, {
                    name: '奶制品',
                    selected: false
                }, {
                    name: '糖尿病',
                    selected: false
                }, {
                    name: '坚果类',
                    selected: false
                }, {
                    name: '豆类',
                    selected: true
                }, {
                    name: '芝麻',
                    selected: false
                }, {
                    name: '葵花籽',
                    selected: false
                }],
            }
        },
        methods: {
            input_nick(input) {},
            pick_birthday() {
                this.birthday_picker = !this.birthday_picker
            },
            onValuesChange(picker, values) {
                console.log(picker,values);
                if (values[0] > values[1]) {
                    picker.setSlotValue(1, values[0]);
                }
            },
            chooseChromic(data) {
                console.log(data);
            },
            chooseAllergy(data) {
                console.log(data);
            },
            choose_nick_name() {
                this.nick_name_pop = !this.nick_name_pop;
            },
            choose_sex() {
                this.sex_radio = true;
            },
            handleClose(done) {
                done();
                // this.$confirm('确认关闭？')
                //     .then(_ => {
                //         done();
                //     })
                //     .catch(_ => {});
            }
        }
    }
</script>
 
<style lang="scss">
    @import "./healthEntryFamily.scss";
    .nick_name,
    .sex_radio {
        width: 17.15rem;
        margin: auto;
        border-bottom: 0.05rem solid whitesmoke;
        height: 3rem;
        overflow: hidden;
        position: relative;
        .input_nick_name {
            position: absolute;
            width: 14rem;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            height: 2rem;
            border-radius: 0.2rem;
            display: block;
            margin: auto;
            border: 1px solid #eee;
            box-sizing: border-box;
            padding: 0 0.5rem;
            font-size: 0.7rem;
            font-family: 'PingFangSC-Regular';
            color: #666;
            line-height: 2rem;
        }
    }
    .sex_radio {
        padding: 0.5rem 5rem;
        .el-radio__input {
            width: 0.8rem;
            height: 0.8rem;
            span,
            input {
                width: 0.8rem;
                height: 0.8rem;
            }
            .el-radio__label {
                font-size: 0.8rem;
            }
        }
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: height .5s;
    }
    .fade-enter,
    .fade-leave-to
    /* .fade-leave-active below version 2.1.8 */
    {
        height: 0;
    }
    .fade-enter-to,
    .fade-leave
    /* .fade-leave-active below version 2.1.8 */
    {
        height: 3rem;
    }
    .picker {
        width: 18.75rem;
        div {
            text-align: center;
        }
    }
    .body_121 {
        position: relative;
        .el-input {
            // height: 1.5rem;
            // margin-top: 0.6rem;
            // text-align: right;
            width: 14rem;
            position: absolute;
            top: 0.4rem;
            right: 0.5rem;
            input {
                border: none;
                color: #32b6e6;
                font-size: 0.75rem;
                text-align: right;
                font-family: 'PingFangSC-Regular';
            }
        }
    }
    .sex_box {
        width: 100%;
        border: 1px solid #eee;
        height: 4rem;
        background: #fff;
        margin: 0 0 0.5rem 0;
        border-bottom-left-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem;
        ul {
            width: 100%;
            height: 100%;
            overflow: hidden;
            li {
                width: 100%;
                height: 50%;
                box-sizing: border-box
            }
        }
    }
    .el-dialog {
        background: rgba(0, 0, 0, 0)
    }
    .button {
        width: 100%;
        height: 2rem;
        background: #32b6e6;
        font-size: 1rem;
        color: #fff;
        font-weight: 500;
        line-height: 2rem;
        text-align: center;
        background: #32b6e6;
        border-radius: 0.3rem;
    }
    .el-dialog__header {
        border-top-left-radius: 0.3rem;
        border-top-right-radius: 0.3rem;
        background: #fff;
        text-align: center;
        padding: 0;
        height: 2rem;
        line-height: 2rem;
        .el-dialog__headerbtn {
            top: 0.6rem;
        }
    }
    .el-dialog__body {
        padding: 0
    }
    .el-dialog {
        position: absolute;
        bottom: 0.5rem;
        left: 0;
        right: 0;
        margin: auto;
    }
    .date_title {
        height: 2rem;
        width: 100%;
        li {
            width: 33.3%;
            height: 100%;
            text-align: center;
            float: left;
            line-height: 2rem;
            font-size: 0.7rem;
            font-weight: 600;
            font-family: 'PingFangSC-Regular';
        }
    }
</style>
