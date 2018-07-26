<template>
    <div class='mybar'>
        <div class="timer">耗时约{{time}}</div>
        <div class="shower">{{cur+' / '+total}}</div>
        <div class='bar'>
            <el-progress :percentage="per" show-text='false' stroke-width=10></el-progress>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['curnum', 'totalnum'],
        data() {
            return {
                cur: 1,
                total: 21,
                per: 1 / 21 * 100,
                time: 0
            }
        },
        mounted() {},
    }
</script>

<style lang='scss'>
    .el-progress__text {
        display: none;
    }
    .el-progress-bar__outer {
        margin: auto;
    }
    .el-progress-bar {
        padding-left: 25px;
        padding-right: 25px;
    }
    .mybar {
        position: relative;
        height: 2rem;
        .timer {
            font-size: 0.6rem;
            font-family: 'PingFangSC-Regular';
            color: rgba(179, 179, 179, 1);
            position: absolute;
            left:25px;
        }
        .shower {
            position: absolute;
            top: 0;
            right: 25px;
            font-size: 0.75rem;
            font-family: 'PingFangSC-Medium';
            color: rgba(50, 182, 230, 1);
            font-weight: 600;
        }
        .bar {
            position: absolute;
            bottom: 0;
            height:1rem;
            width:100%;
        }
    }
</style>