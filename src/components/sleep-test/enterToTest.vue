<template>
    <div class='enterToTest'>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="睡眠评估" name="first">
                <testlist :testList='sleepList'></testlist>
            </el-tab-pane>
            <el-tab-pane label="相关疾病" name="second">
                <testlist :testList='sickList'></testlist>
            </el-tab-pane>
            <el-tab-pane label="精神状况" name="third">
                <testlist :testList='spiritList'></testlist>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import testlist from './testList';
    export default {
        components: {
            testlist
        },
        data() {
            return {
                activeName: 'first',
                sleepList: [{
                    title: '严重程度测试',
                    detail: '失眠严重程度值数量表',
                    meta: '1',
                    time: '',
                    result: ''
                }, {
                    title: '睡眠状况测试',
                    detail: '失眠严重程度值数量表',
                    meta: '2',
                    time: '',
                    result: ''
                }, {
                    title: '睡眠习惯测试',
                    detail: '失眠严重程度值数量表',
                    meta: '3',
                    time: '',
                    result: ''
                },{
                    title: '严重程度测试',
                    detail: '失眠严重程度值数量表',
                    meta: '4',
                    time: '',
                    result: ''
                }, {
                    title: '睡眠状况测试',
                    detail: '失眠严重程度值数量表',
                    meta: '5',
                    time: '2017-05-12 12:35',
                    result: '未完成'
                }, {
                    title: '睡眠习惯测试',
                    detail: '失眠严重程度值数量表',
                    meta: '6',
                    time: '2017-05-12 12:35',
                    result: '中度夜晚型'
                }],
                sickList: [],
                spiritList: []
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
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