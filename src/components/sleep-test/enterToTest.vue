<template>
    <div class='enterToTest'>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="item" :name="'title'+index" v-for='(item,index) in titlelist' :key='index'>
                <testlist :testList='showlist'></testlist>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import testlist from './testList';
    import {
        Loading
    } from 'element-ui';
    export default {
        components: {
            testlist,
            Loading
        },
        data() {
            return {
                loadingmodal: '',
                activeName: 'title0',
                titlelist: [],
                questionslist: {},
                showlist: []
            };
        },
        methods: {
            handleClick(tab, event) {
                this.loadingmodal = Loading.service({
                    fullscreen: true,
                    background: 'rgba(0, 0, 0, 0.7)',
                    lock: true,
                    text: 'loading',
                    spinner: 'el-icon-loading',
                });
                this.getTemplateList(this.titlelist[tab.index]);
            },
            getTemplateList(title) {
                var that = this;
                if (!that.questionslist[title]) {
                    this.$axios.post('/api/getTemplateList', {
                        member_id: window._member_id,
                        templateTerm: title
                    }).then(function(res) {
                        that.loadingmodal.close();
                        if (res.data.code == 'C0000') {
                            that.showlist = that.questionslist[title] = res.data.data.map(function(item, index) {
                                return {
                                    title: item.templateTitle,
                                    detail: item.templateSubTitle,
                                    meta: item,
                                    time: item.createTime,
                                    result: (item.status === null || item.status === 'null') ? '' : (item.status == '0' ? '未完成' : (item.status == '1' ? (item.result || '已完成') : "未知")),
                                    status: item.status //null未答题，0答一半，1完成
                                }
                            });
                        } else {
                            that.$notify.error({
                                title: '错误',
                                message: 'getTemplateList接口无数据',
                                showClose: false
                            });
                        }
                    }).catch(function() {
                        that.$notify.error({
                            title: '错误',
                            message: '请求试题列表出错了',
                            showClose: false
                        });
                        that.loadingmodal.close();
                        if (process.env.NODE_ENV == 'development') {
                            that.$axios.get('/static/testData/getTemplateList.json').then(function(res) {
                                if (res.data.code == 'C0000') {
                                    that.showlist = that.questionslist[title] = res.data.data.map(function(item, index) {
                                        return {
                                            title: item.templateTitle,
                                            detail: item.templateSubTitle,
                                            meta: item,
                                            time: item.createTime,
                                            result: (item.status === null || item.status === 'null') ? '' : (item.status == '0' ? '未完成' : (item.status == '1' ? (item.result || '已完成') : "未知")),
                                            status: item.status //null未答题，0答一半，1完成
                                        }
                                    });
                                }
                            })
                        }
                    });
                } else {
                    this.showlist = that.questionslist[title];
                    that.loadingmodal.close();
                }
            }
        },
        mounted() {
            var that = this;
            that.loadingmodal = Loading.service({
                fullscreen: true,
                background: 'rgba(0, 0, 0, 0.7)',
                lock: true,
                text: 'loading',
                spinner: 'el-icon-loading',
            });
            this.$axios.post('/api/getTemplateTerms', {
                member_id: window._member_id,
            }).then(function(res) {
                that.loadingmodal.close();
                if (res.data.code == 'C0000') {
                    that.titlelist = res.data.data;
                    that.getTemplateList(that.titlelist[0])
                }
            }).catch(function() {
                that.loadingmodal.close();
                if (process.env.NODE_ENV == 'development') {
                    that.$axios.get('/static/testData/getTemplateTerms.json').then(function(res) {
                        if (res.data.code == 'C0000') {
                            that.titlelist = res.data.data;
                            that.getTemplateList(that.titlelist[0])
                        }
                    })
                }
            });
        }
    }
</script>

<style lang='scss'>
    .enterToTest {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        .el-tabs__nav-scroll {
            position: relative;
            height: 2rem;
            .el-tabs__nav {
                position: absolute;
                left: 50%;
                transform: translate(-50%, 0)!important;
            }
            .el-tabs__item {
                text-align: center;
            }
        }
        .el-tabs__nav-wrap::after {
            background: #fff;
        }
    }
</style>