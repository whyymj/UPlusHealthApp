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
                                <img src="/static/healthArchives/index7.jpg" alt="">
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
                                <img src="/static/healthArchives/index7.jpg" alt="">
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
            </mt-swipe>
            <p class='floatButton'><img class='img' src="/static/healthArchives/index8.png" alt=""></p>
        </div>
        <paginator :pagenum='pagenum' :pageindex='pageindex'></paginator>
    </div>
</template>

<script>
    import imgbox from './imgBox';
    import mynav from './myNavigator.vue';
    import myreq from '../../assets/healthSleep/myreq.js';
    import paginator from '../new-add-report/myPagination.vue';
    export default {
        components: {
            imgbox,
            paginator,
            mynav
        },
        watch: {
            list() {
                this.activeName = this.list[0].name
            }
        },
        data() {
            return {
                pagenum: 0,
                pageindex: 0,
                activeName: '',
                showdata: {},
                alldata: {
                    "pro_item": "[{\"id\":\"2\",\"projectIcon\":\"icon-temperature\",\"projectName\":\"体温\"},{\"id\":\"5\",\"projectIcon\":\"icon-ecg\",\"projectName\":\"心电\"},{\"id\":\"1\",\"projectIcon\":\"icon-weight\",\"projectName\":\"体重\"},{\"id\":\"6\",\"projectIcon\":\"icon-oxygen\",\"projectName\":\"血氧\"},{\"id\":\"3\",\"projectIcon\":\"icon-pressure\",\"projectName\":\"血压\"},{\"id\":\"4\",\"projectIcon\":\"icon-blood-sugar\",\"projectName\":\"血糖\"}]",
                    "user_id": "18354298551",
                    "custom_id": "22"
                },
                list: [{
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
            handleChange() {},
            clickNav(index) {
                this.pageindex = index;
                this.showdata = this.list[index];
            }
        },
        mounted() {
            myreq();
            this.$axois.get('/api/user/getHealthPro')
            this.showdata = this.list[0]
            this.pagenum = this.list.length;
        }
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
                right:1rem;
                bottom:2rem;
                border-radius: 50%;
                .img{
width:1.5rem;
height:1.5rem;
position: absolute;
top:0;
left:0;
right:0;
bottom: 0;
margin:auto;
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
</style>