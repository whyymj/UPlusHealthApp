<template>
    <div class="healthEntryFamily">
        <div class="body">
            <div class="body_1">
                <div class="body_11">
                    <div class="body_11_txt">基本信息</div>
                </div>
                <div class="body_12">
                    <!--<div class="body_121" @click='choose_nick_name'>
                                                                <span class="body_1211">昵称</span>
                                                                <span class="body_1212">&middot;</span>
                                                                <el-input v-model="input_nick_name" placeholder="请输入昵称（不超过16字符）" maxlength=16 @change='input_nick'></el-input>
                                                                <span class="body_1213"><span></span>&nbsp&nbsp<i class="el-icon-arrow-right" style='color:#DADADA;'></i></span>
                                                            </div>-->
                    <div class="body_121" @click='choose_sex'>
                        <span class="body_1211">性别</span>
                        <span class="body_1212">&middot;</span>
                        <el-input v-model="sex" placeholder="请选择性别" readonly></el-input>
                        <span class="body_1213"><span></span>&nbsp&nbsp<i class="el-icon-arrow-right" style='color:#DADADA;'></i></span>
                    </div>
                    <div class="body_121" @click='pick_birthday'>
                        <span class="body_1211">生日</span>
                        <span class="body_1212">&middot;</span>
                        <el-input v-model="birthday" placeholder="请选择生日" readonly></el-input>
                        <span class="body_1213"><span></span>&nbsp&nbsp<i class="el-icon-arrow-right" style='color:#DADADA;'></i></span>
                    </div>
                    <div class="body_121" @click='pick_height'>
                        <span class="body_1211">身高</span>
                        <span class="body_1212">&middot;</span>
                        <el-input v-model="tall" placeholder="请选择身高" readonly></el-input>
                        <span class="body_1213"><span></span>&nbsp&nbsp<i class="el-icon-arrow-right" style='color:#DADADA;'></i></span>
                    </div>
                    <div class="body_121" @click='pick_weight'>
                        <span class="body_1211">体重</span>
                        <span class="body_1212">&middot;</span>
                        <el-input v-model="weight" placeholder="请选择体重" readonly></el-input>
                        <span class="body_1213"><span></span>&nbsp&nbsp<i class="el-icon-arrow-right" style='color:#DADADA;'></i></span>
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
            <input type='button' :class="{ 'bottom_text':true, 'bottom_text_bg': !isSave}" @click="save" v-bind:disabled="isSave" value="完成">
        </div>
        <!-- 生日选择 -->
        <mt-popup v-model="birthday_picker" position="bottom">
            <div style='width:18.75rem;'>
                <ul class=' confirmbutton confirm_birthday'>
                    <li @click="cancel('birthday')">取消</li>
                    <li @click="confirm('birthday')">确认</li>
                </ul>
                <mt-picker :slots="slots1" @change="changeYears"></mt-picker>
                <mt-picker :slots="slots2" @change="changeMonths"></mt-picker>
                <mt-picker :slots="slots3" @change="changeDates"></mt-picker>
                <ul class='date_title'>
                    <li>年</li>
                    <li>月</li>
                    <li>日</li>
                </ul>
            </div>
        </mt-popup>
        <!-- 性别选择 -->
        <el-dialog title="性别" :visible.sync="sex_radio" :modal-append-to-body='false' width='95%'>
            <div class='sex_box'>
                <ul>
                    <li style='border-bottom:1px solid #eee;' class='sex_li' :class='{active:sextmp==0}' @click='confirm_sex(0)'>男</li>
                    <li @click='confirm_sex(1)' class='sex_li' :class='{active:sextmp==1}'>女</li>
                </ul>
            </div>
            <div class="button" @click="confirm('sex')">确定</div>
        </el-dialog>
        <!-- 身高选择 -->
        <mt-popup v-model="height_picker" class='height_picker' position="bottom">
            <div style='width:18.75rem;'>
                <ul class=' confirmbutton confirm_birthday'>
                    <li @click="cancel('height')">取消</li>
                    <li @click="confirm('height')">确认</li>
                </ul>
                <mt-picker :slots="tallarr" @change="select_tall"></mt-picker>
            </div>
        </mt-popup>
        <mt-popup v-model="weight_picker" class='weight_picker' position="bottom">
            <div style='width:18.75rem;'>
                <ul class=' confirmbutton confirm_birthday'>
                    <li @click="cancel('weight')">取消</li>
                    <li @click="confirm('weight')">确认</li>
                </ul>
                <mt-picker :slots="weightarr1" @change="select_weight1"></mt-picker>
                <mt-picker :slots="weightarr2" @change="select_weight2"></mt-picker>
            </div>
        </mt-popup>
    </div>
</template>
<script>
    import tagslist from "../health-entry-family/tagsList";
    import axios from "axios";
    import myloading from '../../global/Loading.vue';
    export default {
        components: {
            tagslist
        },
        mixins: [myloading],
        data() {
            return {
                weight_picker: false,
                height_picker: false,
                birthday_picker: false,
                birthdayarr: ['', '', ''],
                weightarr1: [],
                weightarr2: [{
                    flex: 1,
                    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    className: "slot3",
                    textAlign: "center"
                }],
                weightWhole: [75, 0],
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
                tallarr: [],
                nick_name_pop: false,
                //              input_nick_name: "",
                sex_radio: false,
                sex: "",
                sextmp: '',
                chronDiseaseHistory: false, //慢病史
                allergyHistory: false, //过敏史
                birthday: "", //生日
                tall: "", //身高
                talltmp: '',
                weight: "", //体重
                chromicListResult: [],
                allergyListResult: [],
                tempSex: '男',
                chromiclist: [], //慢病标签
                allergylist: [], //过敏标签
                isSave: true, //保存按钮
            };
        },
        watch: {
            birthday(value) {
                if (this.birthday && this.tall && this.weight && this.sex) {
                    this.isSave = false
                } else {
                    this.isSave = true
                }
            },
            tall(value) {
                if (this.birthday && this.tall && this.weight && this.sex) {
                    this.isSave = false
                } else {
                    this.isSave = true
                }
            },
            weight(value) {
                if (this.birthday && this.tall && this.weight && this.sex) {
                    this.isSave = false
                } else {
                    this.isSave = true
                }
            },
            sex(value) {
                if (this.birthday && this.tall && this.weight && this.sex) {
                    this.isSave = false
                } else {
                    this.isSave = true
                }
            }
        },
        mounted() {
            var that = this;
            var years = [];
            var months = [];
            var tall = [];
            var days = [];
            var thisYear = new Date().getFullYear();
            var thisMonth = new Date().getMonth() + 1;
            var today = new Date().getDate();
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
            for (var i = thisYear; i >= 1900; i--) {
                years.push(i);
            }
            for (var i = thisMonth; i > 0; i--) {
                months.push(i > 9 ? i : '0' + i);
            }
            for (var i = today; i > 0; i--) {
                days.push(i > 9 ? i : '0' + i)
            }
            for (var i = 250; i > 100; i--) {
                tall.push(i);
            }
            this.tallarr = [{
                flex: 1,
                defaultIndex: 70,
                values: tall,
                className: "slot1",
                textAlign: "center"
            }]
            this.slots1 = [{
                flex: 1,
                values: years,
                className: "slot1",
                textAlign: "center"
            }];
            this.slots2 = [{
                flex: 1,
                values: months,
                className: "slot2",
                textAlign: "center"
            }];
            this.slots3 = [{
                flex: 1,
                values: days,
                className: "slot3",
                textAlign: "center"
            }];
            this.birthdayarr = [thisYear, thisMonth, today];
            this.tall = '';
            this.weight = '';
            this.birthday = ''
            this.$axios.post('/api/getDiseaseList').then(function(res) {
                that.loadingmodal.close();
                if (res.data.code == 'C0000') {
                    that.chromiclist = res.data.data.map(function(item) {
                        return {
                            name: item.dict_name,
                            selected: false,
                            "dict_id": item.dict_id,
                            "dict_name": item.dict_name,
                            "dict_name_en": item.dict_name_en,
                            "dict_type_id": item.dict_type_id,
                            "status": item.status,
                            "note": item.note
                        }
                    })
                }
            }).catch(function(res) { //慢病标签
                that.$axios.get('/static/testData/getDiseaseList.json').then(function(res) {
                    that.loadingmodal.close();
                    if (res.data.code == 'C0000') {
                        that.chromiclist = res.data.data.map(function(item) {
                            return {
                                name: item.dict_name,
                                selected: false,
                                "dict_id": item.dict_id,
                                "dict_name": item.dict_name,
                                "dict_name_en": item.dict_name_en,
                                "dict_type_id": item.dict_type_id,
                                "status": item.status,
                                "note": item.note
                            }
                        })
                    }
                })
            })
            this.$axios.post('/api/getAllergyList').then(function(res) {
                that.loadingmodal.close();
                if (res.data.code == 'C0000') {
                    that.allergylist = res.data.data.map(function(item) {
                        return {
                            name: item.dict_name,
                            selected: false,
                            "dict_id": item.dict_id,
                            "dict_name": item.dict_name,
                            "dict_name_en": item.dict_name_en,
                            "dict_type_id": item.dict_type_id,
                            "status": item.status,
                            "note": item.note
                        }
                    })
                }
            }).catch(function(res) { //过敏标签
                that.$axios.get('/static/testData/getAllergyList.json').then(function(res) {
                    that.loadingmodal.close();
                    if (res.data.code == 'C0000') {
                        that.allergylist = res.data.data.map(function(item) {
                            return {
                                name: item.dict_name,
                                selected: false,
                                "dict_id": item.dict_id,
                                "dict_name": item.dict_name,
                                "dict_name_en": item.dict_name_en,
                                "dict_type_id": item.dict_type_id,
                                "status": item.status,
                                "note": item.note
                            }
                        })
                    }
                })
            })
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
            cancel() {
                this.weight_picker = false;
                this.height_picker = false;
                this.birthday_picker = false;
                this.sex_radio = false;
            },
            confirm(index) {
                if (index == 'sex') {
                    this.sex = this.tempSex || '男';
                } else if (
                    index == 'birthday'
                ) {
                    this.birthday = this.birthdayarr[0] + '年' + this.birthdayarr[1] + '月' + this.birthdayarr[2] + '日'
                } else if (
                    index == 'weight'
                ) {
                    this.weight = this.weightWhole[0] + '.' + this.weightWhole[1] + '公斤'
                } else if (
                    index == 'height'
                ) {
                    this.tall = this.talltmp;
                }
                this.cancel();
            },
            pick_weight() {
                this.weight_picker = !this.weight_picker;
            },
            pick_height() {
                this.height_picker = !this.height_picker
            },
            select_weight1(picker, value) {
                this.weightWhole[0] = value[0] || 75;
            },
            select_weight2(picker, value) {
                this.weightWhole[1] = value[0] || 0;
            },
            select_tall(picker, value) {
                this.talltmp = value[0] || 180 + '厘米'
            },
            input_nick(input) {},
            pick_birthday() {
                this.birthday_picker = !this.birthday_picker;
            },
            getMonthDate(year, month) {
                var firstDay = new Date(year, month - 1, 1);
                var lastDay = new Date(year, month, 0);
                var firday = firstDay.getDate();
                var lasday = lastDay.getDate();
                var date = [];
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
            changeYears(picker, values) {
                this.birthdayarr[0] = values[0];
                var days = this.getMonthDate(this.birthdayarr[0], this.birthdayarr[1] * 1).reverse().map(function(item, index) {
                    return item.date > 9 ? item.date : '0' + item.date;
                })
                this.slots3 = [{
                    flex: 1,
                    values: days,
                    className: "slot3",
                    textAlign: "center"
                }];
            },
            changeMonths(picker, values) {
                this.birthdayarr[1] = values[0];
                var days = this.getMonthDate(this.birthdayarr[0], this.birthdayarr[1] * 1).reverse().map(function(item, index) {
                    return item.date > 9 ? item.date : '0' + item.date;
                })
                this.slots3 = [{
                    flex: 1,
                    values: days,
                    className: "slot3",
                    textAlign: "center"
                }];
            },
            changeDates(picker, values) {
                this.birthdayarr[2] = values[0];
            },
            chooseChromic(data) {
                var dataSelected = []
                for (var i = 0; i < data.tags.length; i++) {
                    if (data.tags[i].selected == true) {
                        dataSelected.push(data.tags[i].name)
                    }
                }
                this.chromicListResult = dataSelected
            },
            chooseAllergy(data) {
                var dataSelected1 = []
                for (var j = 0; j < data.tags.length; j++) {
                    if (data.tags[j].selected == true) {
                        dataSelected1.push(data.tags[j].name)
                    }
                }
                this.allergyListResult = dataSelected1
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
            },
            save() {
                var that = this;
                let saveData = {
                    height: parseFloat(this.tall),
                    weight: parseFloat(this.weight),
                    sex: this.sex == '男' ? "male" : "female",
                    birthday: this.birthday.replace('年', '-').replace('月', '-').replace('日', ''),
                    //				    nick_name: this.input_nick_name,
                    disease: this.chromicListResult[0] ? this.chromicListResult.join(",") : "",
                    allergy: this.allergyListResult[0] ? this.allergyListResult.join(',') : '',
                }
                axios.post('/api/user', saveData)
                    .then(function(res) {
                        console.log(res);
                        that.$router.push({
                            path: '/healthArchives'
                        })
                    })
                    .catch(function(err) {
                        // that.$router.push({
                        //     path: '/healthArchives'
                        // })
                    })
            }
        }
    };
</script>
 
<style lang="scss">
    @import "./healthEntryMy.scss";
    .healthEntryFamily {
        .nick_name,
        .sex_radio {
            width: 17.15rem;
            margin: auto;
            border-bottom: 0.05rem solid whitesmoke;
            height: 3rem;
            overflow: hidden;
            position: relative;
            /*.input_nick_name {
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
                                                        font-family: "PingFangSC-Regular";
                                                        color: #666;
                                                        line-height: 2rem;
                                                    }*/
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
            transition: height 0.5s;
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
            width: 33.3%;
            float: left;
            div {
                text-align: center;
            }
        }
        .height_picker {
            width: 18.75rem;
            .picker {
                width: 100%;
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
                    font-family: "PingFangSC-Regular";
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
                    box-sizing: border-box;
                }
            }
        }
        .el-dialog {
            background: rgba(0, 0, 0, 0);
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
            height: 2rem!important;
            line-height: 2rem;
            .el-dialog__headerbtn {
                top: 0.6rem;
            }
        }
        .el-dialog__body {
            padding: 0;
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
            float: left;
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
        .weight_picker {
            width: 18.75rem;
            .picker {
                width: 50%;
                float: left;
            }
        }
        .confirmbutton {
            width: 100%;
            height: 2rem;
            li {
                width: 50%;
                height: 100%;
                float: left;
                text-align: center;
                line-height: 2rem;
                font-size: 0.7rem;
                color: #32b6e6;
                font-weight: 500;
                box-sizing: border-box;
                border: 1px solid #eee;
            }
        }
        .sex_li {
            line-height: 2rem;
            font-size: 0.7rem;
            padding: 0 1rem;
        }
        .sex_li.active {
            color: #32b6e6;
            font-weight: 600;
        }
    }
</style>
