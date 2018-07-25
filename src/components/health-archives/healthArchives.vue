<template>
    <div class='healthArchives' style='background:#fff; height:100;position:fixed;height:100%;top:0;left:0;width:100%;'>
        <div class="tabs">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="item.name" :name="item.name" v-for='(item,index) in list' :key='index'>
                    <mt-swipe :auto="0" :show-indicators="false" @change="handleChange" :continuous='false'>
                        <mt-swipe-item>
                            <div class=''>
                                <ul class='imgContainer'>
                                    <li class="col1">
                                        <div class='row'>
                                            <imgbox img='/static/healthArchives/index1.gif' title='体重 ' :cont='item.weight' unit='KG' bg=''></imgbox>
                                        </div>
                                        <div class='row'>
                                            <imgbox img='/static/healthArchives/index3.png' title='血氧 ' :cont='item.oxy' unit='%' bg=''></imgbox>
                                        </div>
                                        <div class='row'>
                                            <imgbox img='/static/healthArchives/index5.gif' title='温度 ' :cont='item.temp' unit='℃' bg='redBox'></imgbox>
                                        </div>
                                    </li>
                                    <li class="col2">
                                        <img src="/static/healthArchives/index7.jpg" alt="">
                                    </li>
                                    <li class="col3">
                                        <div class='row'>
                                            <imgbox img='/static/healthArchives/index2.gif' title='血压 ' :cont='item.press' unit='mmHg' bg='orangeBox'></imgbox>
                                        </div>
                                        <div class='row'>
                                            <imgbox img='/static/healthArchives/index.png' title='睡眠 ' :cont='item.sleep' unit='' bg=''></imgbox>
                                        </div>
                                        <div class='row'>
                                            <imgbox img='/static/healthArchives/index4.gif' title='血糖 ' :cont='item.bloodSug' unit='' bg='greyBox'></imgbox>
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
                                            <imgbox img='/static/healthArchives/index1.gif' title='体重 ' :cont='item.weight' unit='KG' bg=''></imgbox>
                                        </div>
                                        <div class='row'>
                                            <imgbox img='/static/healthArchives/index3.png' title='血氧 ' :cont='item.oxy' unit='%' bg=''></imgbox>
                                        </div>
                                        <div class='row'>
                                            <imgbox img='/static/healthArchives/index5.gif' title='温度 ' :cont='item.temp' unit='℃' bg='redBox'></imgbox>
                                        </div>
                                    </li>
                                    <li class="col2">
                                        <img src="/static/healthArchives/index7.jpg" alt="">
                                    </li>
                                    <li class="col3">
                                        <div class='row'>
                                            <imgbox img='/static/healthArchives/index2.gif' title='血压 ' :cont='item.press' unit='mmHg' bg='orangeBox'></imgbox>
                                        </div>
                                        <div class='row'>
                                            <imgbox img='/static/healthArchives/index.png' title='睡眠 ' :cont='item.sleep' unit='' bg=''></imgbox>
                                        </div>
                                        <div class='row'>
                                            <imgbox img='/static/healthArchives/index4.gif' title='血糖 ' :cont='item.bloodSug' unit='' bg='greyBox'></imgbox>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </mt-swipe-item>
                    </mt-swipe>
                </el-tab-pane>
            </el-tabs>
            <img class='img' src="/static/healthArchives/index6.gif" alt="">
        </div>
      
         <paginator :pagenum='pagenum' :pageindex='pageindex'></paginator>
    </div>
</template>

<script>
    import imgbox from './imgBox';
    import paginator from '../new-add-report/myPagination.vue';
    export default {
        components: {
            imgbox,
            paginator
        },
        watch: {
            list() {
                this.activeName = this.list[0].name
            }
        },
        data() {
            return {
                pagenum:2,
                pageindex:0,
                activeName: '',
                list: [{
                    name: '爸爸',
                    weight: 75,
                    oxy: 90,
                    temp: 37,
                    press: '170/82',
                    sleep: '正常',
                    bloodSug: ''
                }, {
                    name: '妈妈',
                    weight: 55,
                    oxy: 98,
                    temp: '',
                    press: '120/82',
                    sleep: '正常',
                    bloodSug: ''
                }]
            };
        },
        methods: {
            handleClick(tab, event) {//点击标签切换
               this.pageindex=tab.index
            },
            handleChange() {}
        },
        mounted() {
            this.activeName = this.list[0].name
        }
    }
</script>

<style lang='scss'>
    .healthArchives {
        .tabs {
            position: relative;
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
            .img {
                position: absolute;
                top: 0.6rem;
                right: 1rem;
                width: 1.06rem;
                height: 1.1rem;
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