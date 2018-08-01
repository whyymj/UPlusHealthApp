<template>
    <div class='healthArchives' style='background:#fff; height:100;position:fixed;height:100%;top:0;left:0;width:100%;'>
        <div class="tabs">
            <mynav :navigateList='list' @clickNav='clickNav'></mynav>
            <mt-swipe :auto="0" :show-indicators="false" @change="handleChange" :continuous='false'>
                <mt-swipe-item>
                    <div class=''>
                        <ul class='imgContainer'>
                            <li class="col1">
                                <div class='row'>
                                    <imgbox img='/static/healthArchives/index1.gif' title='体重 ' :cont='showdata.weight' unit='KG' bg=''></imgbox>
                                </div>
                                <div class='row'>
                                    <imgbox img='/static/healthArchives/index3.png' title='血氧 ' :cont='showdata.oxy' unit='%' bg=''></imgbox>
                                </div>
                                <div class='row'>
                                    <imgbox img='/static/healthArchives/index5.gif' title='温度 ' :cont='showdata.temp' unit='℃' bg='redBox'></imgbox>
                                </div>
                            </li>
                            <li class="col2">
                                <img src="/static/healthArchives/bg-human.png" alt="" v-if='maleShow'>
                                <img src="/static/healthArchives/bg-woman.png" alt="" v-else>
                                <span :style='blink(showdata.weight)' :class='{"weight-circle-female":!maleShow,"weight-circle":!maleShow}' @click='scalebox(showdata.weight)'></span>
                                <span :style='blink(showdata.bloodSug)' :class='{"sugar-circle":maleShow,"sugar-circle-female":!maleShow}' @click='scalebox(showdata.bloodSug)'></span>
                                <span :style='blink(showdata.temp)' :class='{"temperature-circle":maleShow,"temperature-circle-female":!maleShow}' @click='scalebox(showdata.temp)'></span>
                                <span :style='blink(showdata.press)' :class='{"pressure-circle":maleShow,"pressure-circle-female":!maleShow}' @click='scalebox(showdata.press)'></span>
                                <span :style='blink(showdata.sleep)' :class='{"ecg-circle":maleShow,"ecg-circle-female":!maleShow}' @click='scalebox(showdata.sleep)'></span>
                                <span :style='blink(showdata.oxy)' :class='{"oxygen-circle":maleShow,"oxygen-circle-female":!maleShow}' @click='scalebox(showdata.oxy)'></span>
                            </li>
                            <li class="col3">
                                <div class='row'>
                                    <imgbox img='/static/healthArchives/index2.gif' title='血压 ' :cont='showdata.press' unit='mmHg' bg='orangeBox'></imgbox>
                                </div>
                                <div class='row'>
                                    <imgbox img='/static/healthArchives/index.png' title='睡眠 ' :cont='showdata.sleep' unit='' bg=''></imgbox>
                                </div>
                                <div class='row'>
                                    <imgbox img='/static/healthArchives/index4.gif' title='血糖 ' :cont='showdata.bloodSug' unit='' bg='greyBox'></imgbox>
                                </div>
                            </li>
                        </ul>
                    </div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <div class="">
                        <ul class='imgContainer'>
                            <li class="col1">
                                <div class='row'>
                                    <imgbox img='/static/healthArchives/index1.gif' title='心电 ' :cont='showdata.heartele' unit='KG' bg=''></imgbox>
                                </div>
                            </li>
                            <li class="col2">
                                <img src="/static/healthArchives/bg-human.png" alt="" v-if='maleShow'>
                                <img src="/static/healthArchives/bg-woman.png" alt="" v-else>
                                <span :style='blink(showdata.heartele)' :class='{"temperature-circle":maleShow,"temperature-circle-female":!maleShow}' @click='scalebox(showdata.heartele)'></span>
                            </li>
                        </ul>
                    </div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <div class="">
                        <healthmodal></healthmodal>
                    </div>
                </mt-swipe-item>
            </mt-swipe>
            <p class='floatButton'><img class='img' src="/static/healthArchives/index8.png" alt=""></p>
        </div>
        <paginator :pagenum='pagenum' :pageindex='pageindex'></paginator>
    </div>
</template>

<script>
    import imgbox from './imgBox';
    import bus from './bus.js';
    import mynav from './myNavigator.vue';
    import myreq from '../../assets/healthSleep/myreq.js';
    import paginator from '../new-add-report/myPagination.vue';
    import config from '../../../config/global.config'
    import healthmodal from './healthRecordsB.vue';
    import colorJudger from './color.js'
    import {
        Indicator
    } from 'mint-ui';
    export default {
        components: {
            imgbox,
            paginator,
            mynav,
            healthmodal
        },
        watch: {
            list() {
                this.activeName = this.list[0].name
            },
            healthProResult() {}
        },
        data() {
            return {
                maleShow: false,
                pagenum: 0,
                memberID: '',
                pageindex: 0,
                activeName: '',
                showdata: { //健康参数整理，供显示
                    weight: {
                        "moudle_name_en": "",
                        "value": "80", //value值为"0"时表示此健康模块暂无健康数据
                        "moudle_name": "体重",
                        "moudle_name_en": "",
                        "level": "1"
                    },
                    oxy: {
                        "value": "50.5",
                        "moudle_name": "血氧",
                        "moudle_name_en": "basal_metabolic",
                        "level": "1"
                    },
                    temp: {
                        "value": "37",
                        "moudle_name": "体温",
                        "moudle_name_en": "temperature",
                        "level": "2"
                    },
                    press: {
                        "value": "135/97",
                        "moudle_name": "血压",
                        "moudle_name_en": "bloodpressure",
                        "level": "3"
                    },
                    sleep: {
                        "value": "8.2",
                        "moudle_name": "睡眠",
                        "moudle_name_en": "sleep",
                        "level": "3"
                    },
                    bloodSug: {
                        "moudle_name_en": "",
                        "value": "80", //value值为"0"时表示此健康模块暂无健康数据
                        "moudle_name": "血糖",
                        "moudle_name_en": "",
                        "level": "1"
                    },
                    heartele: {
                        "moudle_name_en": "",
                        "value": "0", //value值为"0"时表示此健康模块暂无健康数据
                        "moudle_name": "心电",
                        "moudle_name_en": "",
                        "level": "1"
                    }
                },
                healthProResult: [{ //请求到的健康参数
                        "value": "135/97",
                        "moudle_name": "血压",
                        "moudle_name_en": "bloodpressure",
                        "level": "3"
                    },
                    {
                        "value": "8.2",
                        "moudle_name": "睡眠",
                        "moudle_name_en": "sleep",
                        "level": "1"
                    },
                    {
                        "value": "37",
                        "moudle_name": "体温",
                        "moudle_name_en": "temperature",
                        "level": "2"
                    },
                    {
                        "value": "50.5",
                        "moudle_name": "血氧",
                        "moudle_name_en": "basal_metabolic",
                        "level": "1"
                    },
                    {
                        "moudle_name_en": "",
                        "value": "0", //value值为"0"时表示此健康模块暂无健康数据
                        "moudle_name": "心电",
                        "moudle_name_en": "",
                        "level": "1"
                    },
                    {
                        "moudle_name_en": "",
                        "value": "80", //value值为"0"时表示此健康模块暂无健康数据
                        "moudle_name": "体重",
                        "moudle_name_en": "",
                        "level": "1"
                    },
                    {
                        "moudle_name_en": "",
                        "value": "80", //value值为"0"时表示此健康模块暂无健康数据
                        "moudle_name": "血糖",
                        "moudle_name_en": "",
                        "level": "1"
                    }
                ],
                list: [{
                        "member_id": "",
                        "login_code": 15153125386,
                        "relation": "1",
                        "relation_name": "我",
                        "height": 170,
                        "weight": 65,
                        "birthday": "1966-11-27",
                        "head_pic": "http://healthapp.haier.net/image/father.png",
                        "sex": "male",
                        "create_date": "2018-04-12 10:34:57",
                        "nick_name": "爸爸",
                        "target_weight": 65,
                        "is_first_set_tw": 1,
                        "age": 52
                    }, {
                        "member_id": "58",
                        "login_code": 15153125386,
                        "relation": "1",
                        "relation_name": "爸爸",
                        "height": 170,
                        "weight": 65,
                        "birthday": "1966-11-27",
                        "head_pic": "http://healthapp.haier.net/image/father.png",
                        "sex": "male",
                        "create_date": "2018-04-12 10:34:57",
                        "nick_name": "爸爸",
                        "target_weight": 65,
                        "is_first_set_tw": 1,
                        "age": 52
                    },
                    {
                        "member_id": "42",
                        "login_code": 15153125386,
                        "relation": "13",
                        "relation_name": "朋友",
                        "height": 180,
                        "weight": 70,
                        "birthday": "1989-8-30",
                        "head_pic": "http://healthapp.haier.net/image/husband.png",
                        "sex": "male",
                        "create_date": "2018-01-26 16:12:57",
                        "nick_name": "朋友2",
                        "target_weight": 70,
                        "is_first_set_tw": 1,
                        "age": 29
                    }
                ]
            };
        },
        methods: {
            scalebox(item) {
                bus.$emit('scalebox', item.moudle_name)
            },
            blink(item) {
                var obj = colorJudger(item.moudle_name, item.level)
                return {
                    background: obj.bg,
                    animation: 's-red-animation 1s infinit'
                }
            },
            handleChange() {},
            clickNav(index) {
                this.pageindex = index;
                this.showdata = this.list[index];
            },
            getIndex(node) {
                let elems = node.parentNode.children;
                for (let i = 0; i < elems.length; i++) {
                    if (elems[i] == node) {
                        return i;
                    }
                }
            },
            switchTab(e, id) {
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                clearTimeout(window.animateBubble);
                let target = e.target;
                let parent = target.parentNode;
                let liList = parent.children;
                let index = this.getIndex(target);
                let needScrollLeft = (index - 2) * 72 + 27;
                for (let k = 0; k < liList.length; k++) {
                    liList[k].classList.remove('active');
                }
                target.classList.add('active');
                if (parent.parentNode.scrollLeft > needScrollLeft && needScrollLeft > 0 && (index != liList.length - 1 && index != liList.length - 2)) {
                    let setIntervalTab1 = setInterval(function() {
                        parent.parentNode.scrollLeft -= 10;
                        if (parent.parentNode.scrollLeft <= needScrollLeft) {
                            parent.parentNode.scrollLeft = needScrollLeft;
                            clearInterval(setIntervalTab1)
                        }
                    }, 20)
                } else if (parent.parentNode.scrollLeft < needScrollLeft && needScrollLeft > 0 && (index != liList.length - 1 && index != liList.length - 2)) {
                    let setIntervalTab2 = setInterval(function() {
                        parent.parentNode.scrollLeft += 10;
                        if (parent.parentNode.scrollLeft >= needScrollLeft) {
                            parent.parentNode.scrollLeft = needScrollLeft;
                            clearInterval(setIntervalTab2)
                        }
                    }, 20)
                }
                window._member_id = id
                if (id === '') {
                    this.getUserInfo()
                } else {
                    this.getMemberInfo()
                }
            },
            twinkleBubble(e, item, index) {
                let target = e.target;
                window.animateBubble = window.animateBubble || 0;
                let allBody = document.getElementsByClassName('body');
                let allBodyLen = allBody.length;
                let allBubble = document.getElementsByClassName('bubble-icon');
                let allBubbleLen = allBubble.length;
                let allTips = document.getElementsByClassName('tips');
                let allTipsLen = allTips.length;
                let targetClassName = target.className;
                clearTimeout(window.animateBubble);
                for (let i = 0; i < allBodyLen; i++) {
                    allBody[i].classList.remove('s-normal-animate');
                }
                for (let j = 0; j < allBubbleLen; j++) {
                    allBubble[j].classList.remove('b-animate');
                }
                for (let k = 0; k < allTipsLen; k++) {
                    allTips[k].classList.remove('tips-open');
                }
                if (targetClassName.indexOf('normal') > -1) {
                    target.classList.add('s-normal-animate');
                }
                //big bubble and tips
                switch (item.moudle_name) {
                    case '体重':
                        this.$refs.weight[0].classList.add('b-animate')
                        if (item.level === '') { // empty
                            this.$refs.weightEmpty[0].classList.add('tips-open')
                        } else if (item.level === '1') { // normal
                            this.$refs.weightNormal[0].classList.add('tips-open')
                        } else { // abnormal
                            this.$refs.weightAbnormal[0].classList.add('tips-open')
                        }
                        break
                    case '血糖':
                        this.$refs.sugar[0].classList.add('b-animate')
                        if (item.level === '') { // empty
                            this.$refs.sugarEmpty[0].classList.add('tips-open')
                        } else if (item.level === '1') { // normal
                            this.$refs.sugarNormal[0].classList.add('tips-open')
                        } else { // abnormal
                            this.$refs.sugarAbnormal[0].classList.add('tips-open')
                        }
                        break
                    case '体温':
                        this.$refs.temperature[0].classList.add('b-animate')
                        if (item.level === '') { // empty
                            this.$refs.temperatureEmpty[0].classList.add('tips-open')
                        } else if (item.level === '1') { // normal
                            this.$refs.temperatureNormal[0].classList.add('tips-open')
                        } else { // abnormal
                            this.$refs.temperatureAbnormal[0].classList.add('tips-open')
                        }
                        break
                    case '血压':
                        this.$refs.pressure[0].classList.add('b-animate')
                        if (item.level === '') {
                            this.$refs.pressureEmpty[0].classList.add('tips-open')
                        } else if (item.level === '1') {
                            this.$refs.pressureNormal[0].classList.add('tips-open')
                        } else {
                            this.$refs.pressureAbnormal[0].classList.add('tips-open')
                        }
                        break
                    case '心电':
                        this.$refs.ecg[0].classList.add('b-animate')
                        if (item.level === '') {
                            this.$refs.ecgEmpty[0].classList.add('tips-open')
                        } else if (item.level === '1') {
                            this.$refs.ecgNormal[0].classList.add('tips-open')
                        } else {
                            this.$refs.ecgAbnormal[0].classList.add('tips-open')
                        }
                        break
                    case '血氧':
                        this.$refs.oxygen[0].classList.add('b-animate')
                        if (item.level === '') {
                            this.$refs.oxygenEmpty[0].classList.add('tips-open')
                        } else if (item.level === '1') {
                            this.$refs.oxygenNormal[0].classList.add('tips-open')
                        } else {
                            this.$refs.oxygenAbnormal[0].classList.add('tips-open')
                        }
                        break
                }
                window.animateBubble = setTimeout(function() {
                    for (let j = 0; j < allBubbleLen; j++) {
                        allBubble[j].classList.remove('b-animate');
                    }
                    for (let k = 0; k < allTipsLen; k++) {
                        allTips[k].classList.remove('tips-open');
                    }
                }, 1500);
            },
            async getUserInfo() {
                try {
                    const result = await axios.post('/api/user/info', {
                        phone: ''
                    })
                    if (result.data.code === 'C0000') {
                        this.initList()
                        this.$refs.footer.style.display = 'block'
                        if (result.data.data.sex === 'male') {
                            this.BGSVGIMG = {
                                src: require('../../assets/BG-human.svg')
                            }
                            this.maleShow = true
                        } else {
                            this.BGSVGIMG = {
                                src: require('../../assets/BG-woman.svg')
                            }
                            this.maleShow = false
                        }
                    }
                } catch (err) {
                    console.log(err)
                }
            },
            async getMemberInfo() {
                try {
                    const result = await axios.get(`/api/member?member_id=${window._member_id}`)
                    if (result.data.code === 'C0000') {
                        this.initList()
                        this.$refs.footer.style.display = 'block'
                        if (result.data.data.sex === 'male') {
                            this.BGSVGIMG = {
                                src: require('../../assets/BG-human.svg')
                            }
                            this.maleShow = true
                        } else {
                            this.BGSVGIMG = {
                                src: require('../../assets/BG-woman.svg')
                            }
                            this.maleShow = false
                        }
                    }
                } catch (err) {
                    console.log(err)
                }
            },
            async getFamilyList() {
                try {
                    const result = await axios.get('/api/family')
                    if (result.data.code === 'C0000') {
                        this.createdList = result.data.data[0]
                    }
                } catch (err) {
                    console.log(err)
                }
            },
            async initList() {
                try {
                    const result = await axios.get(`/api/health/result?member_id=${window._member_id}`)
                    if (result.data.code === 'C0000') {
                        console.log(result)
                        this.healthProResult = result.data.data.healthProResult
                        // 新用户引导页
                        if (!window.localStorage.getItem('fEntry')) {
                            this.isModel = true;
                            window.localStorage.setItem('fEntry', '1');
                        } else {
                            this.isModel = false;
                        }
                        Indicator.close();
                    }
                } catch (err) {
                    console.log('err: ', err)
                    Indicator.close();
                }
            },
            async goPages(item) {
                switch (item.moudle_name) {
                    case '体重':
                        if (window._member_id === '') { // user
                            try {
                                const result = await axios.post('/api/user/info', {
                                    phone: ''
                                })
                                if (result.data.code === 'C0000') {
                                    if (result.data.data.target_weight === '' || result.data.data.target_weight === 0) { // new user
                                        this.$router.push({
                                            path: '/setTargetWeight'
                                        })
                                    } else {
                                        this.$router.push({
                                            path: '/weight'
                                        })
                                    }
                                }
                            } catch (err) {
                                console.log(err)
                            }
                        } else { // member
                            let res = this.createdList.filter(_ => {
                                return _.member_id === window._member_id
                            })
                            if (res[0].is_first_set_tw === 1) { // 未设置目标体重
                                this.$router.push({
                                    path: '/setTargetWeight'
                                })
                            } else {
                                this.$router.push({
                                    path: '/weight'
                                })
                            }
                        }
                        window._weight_selected_date = ''
                        break
                    case 'BMI':
                    case '体脂率':
                    case '基础代谢':
                    case '脂肪重量':
                    case '内脏脂肪等级':
                    case '肌肉重量':
                    case '肌肉率':
                    case '水份':
                    case '水含量':
                    case '蛋白质':
                    case '骨量':
                        window._weight_selected_date = ''
                        this.$router.push({
                            path: '/weight'
                        })
                        break
                    case '血压':
                        window._pressure_selected_date = ''
                        this.$router.push({
                            path: '/pressure'
                        })
                        break
                    case '血糖':
                        window._suger_selected_date = ''
                        this.$router.push({
                            path: '/bloodSugar'
                        })
                        break
                    case '体温':
                        window._temperature_selected_date = ''
                        this.$router.push({
                            path: '/temperature'
                        })
                        break
                    case '心电':
                        window._ecg_selected_date = ''
                        this.$router.push({
                            path: '/ecg'
                        })
                        break
                    case '血氧':
                        window._oxygen_selected_date = ''
                        this.$router.push({
                            path: '/oxygen'
                        })
                        break
                }
            },
            goRecordsList() {
                this.$router.push({
                    path: '/healthRecordsL'
                })
            },
            edit() {
                this.$router.push({
                    path: '/addProject'
                })
            },
            manualEntry() {
                this.$router.push({
                    path: '/manualEntry'
                })
            },
            goFamilyManage() {
                this.$router.push({
                    path: '/familyManagement'
                })
            }
        },
        mounted() {
            this.pagenum = this.list.length;
            (async() => {
                let obj = {
                    code: window.location.href.substring(window.location.href.indexOf('=') + 1, window.location.href.indexOf('&')),
                    url: config.url
                }
                if (obj.code !== '') {
                    try {
                        const result = await axios.post('/api/info', obj)
                        if (result.data.data.user_flag === 'Y') { // new user
                            this.$router.replace({
                                path: '/introduction'
                            }) // 介绍页面
                        } else {
                            this.memberID = window._member_id
                            if (window._member_id === '') {
                                this.getUserInfo()
                            } else {
                                this.getMemberInfo()
                            }
                            this.getFamilyList()
                        }
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    this.memberID = window._member_id
                    if (window._member_id === '') {
                        this.getUserInfo()
                    } else {
                        this.getMemberInfo()
                    }
                    this.getFamilyList()
                }
            })()
            this.$nextTick(function() {
                let winH = document.documentElement.clientHeight || document.body.clientHeight;
                let pageTag = document.querySelector('.health-records')
                pageTag.style.minHeight = winH + 'px'
            })
        },
    }
</script>

<style lang='scss'>
    .healthArchives {
        .tabs {
            position: relative;
            .floatButton {
                position: fixed;
                width: 2.5rem;
                height: 2.5rem;
                background: rgba(34, 131, 226, 1);
                box-shadow: 0rem 0.4rem 0.8rem 0rem rgba(34, 131, 226, 0.32);
                right: 1rem;
                bottom: 2rem;
                border-radius: 50%;
                .img {
                    width: 1.5rem;
                    height: 1.5rem;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                }
            }
            .navigations {
                width: 100%;
                height: 2rem;
                li {
                    width: 20%;
                }
            }
            .mint-swipe {
                overflow: hidden;
                height: 25rem;
            }
            .el-tabs__nav-wrap::after {
                background: #fff;
            }
            .el-tabs__nav {
                display: inline-block;
                margin: auto;
                float: unset;
                text-align: center;
                left: 50%;
                transform: translate(-50%, 0)!important
            }
            .el-tabs__item {
                display: inline-block;
            }
        }
        .imgContainer {
            height: 19.12rem;
            width: 100%;
            position: relative;
            margin: 2rem 0;
            li {
                position: absolute;
                width: 33.33%;
                height: 100%;
                top: 0;
            }
            .col1 {
                left: 0;
            }
            .col2 {
                left: 33.33%;
                position: relative;
                span {
                    position: absolute;
                    width: 0.5rem;
                    height: 0.5rem;
                    background: rgba(51, 51, 51, .17);
                    box-shadow: 0 0 0 8px rgba(51, 51, 51, .05);
                    border-radius: 50%;
                }
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .col3 {
                left: 66.66%;
            }
            .row {
                height: 33.33%;
                width: 100%;
            }
        }
    }
    .weight-circle {
        top: 17.5rem;
        left: 3.5rem;
        animation: s-red-animation 2s linear infinite;
    }
    .weight-circle-female {
        top: 17rem;
        left: 3.5rem;
        animation: s-red-animation 2s linear infinite;
    }
    .sugar-circle {
        top: 11rem;
        left: 0.2rem;
        animation: s-red-animation 2s linear infinite;
    }
    .sugar-circle-female {
        top: 10.5rem;
        left: 0.5rem;
        animation: s-red-animation 2s linear infinite;
    }
    .temperature-circle {
        top: 5.5rem;
        left: 1.2rem;
        animation: s-red-animation 2s linear infinite;
    }
    .temperature-circle-female {
        top: 4.6rem;
        left: 1.2rem;
        animation: s-red-animation 2s linear infinite;
    }
    .pressure-circle {
        top: 9rem;
        left: 5.6rem;
        animation: s-red-animation 2s linear infinite;
    }
    .pressure-circle-female {
        top: 9rem;
        left: 5.5rem;
        animation: s-red-animation 2s linear infinite;
    }
    .ecg-circle {
        top: 4.5rem;
        left: 4rem;
        animation: s-red-animation 2s linear infinite;
    }
    .ecg-circle-female {
        top: 4.5rem;
        left: 4rem;
        animation: s-red-animation 2s linear infinite;
    }
    .oxygen-circle {
        top: 14rem;
        left: 2rem;
        animation: s-red-animation 2s linear infinite;
    }
    .oxygen-circle-female {
        top: 14rem;
        left: 2rem;
        animation: s-red-animation 2s linear infinite;
    }
    @keyframes s-red-animation {
        0% {
            box-shadow: 0 0 0 0 rgba(255, 71, 93, .1);
        }
        50% {
            box-shadow: 0 0 0 8px rgba(255, 71, 93, .1);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(255, 71, 93, .1);
        }
    }
    @-webkit-keyframes s-normal-animation {
        0% {
            box-shadow: 0 0 0 0 rgba(38, 166, 255, .1);
        }
        50% {
            box-shadow: 0 0 0 8px rgba(38, 166, 255, .1);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(38, 166, 255, .1);
        }
    }
    @keyframes s-normal-animation {
        0% {
            box-shadow: 0 0 0 0 rgba(38, 166, 255, .1);
        }
        50% {
            box-shadow: 0 0 0 8px rgba(38, 166, 255, .1);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(38, 166, 255, .1);
        }
    }
    @-webkit-keyframes s-red-animation {
        0% {
            box-shadow: 0 0 0 0 rgba(255, 71, 93, .1);
        }
        50% {
            box-shadow: 0 0 0 8px rgba(255, 71, 93, .1);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(255, 71, 93, .1);
        }
    }
</style>