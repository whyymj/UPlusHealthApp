<template>
    <div class='mybar'>
        <div class="timer">耗时约{{time}}</div>
        <div class="shower">{{cur+' / '+total}}</div>
        <div class='bar'>
            <el-progress :percentage="per" :show-text='showText' :stroke-width='strokeWidth'></el-progress>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['curnum', 'totalnum'],
        watch: {
            curnum() {
                this.cur = this.curnum;
                this.per = this.cur / this.total * 100;
            },
            totalnum() {
                this.total = this.totalnum;
                this.cur = this.curnum;
                this.per = this.cur / this.total * 100;
            }
        },
        data() {
            return {
                cur: 1,
                total: 1,
                per: 0,
                time: 0,
                showText: false,
                strokeWidth: 10
            }
        },
        mounted() {
            this.cur = this.curnum;
            this.total = this.totalnum;
            this.per = this.cur / this.total * 100;
        },
    }
</script>

<style lang='scss'>
    .el-progress__text {
        display: none;
    }
    .el-progress-bar__outer {
        margin: auto;
    }
    .el-progress--without-text .el-progress-bar {
        padding-left: 25px;
        padding-right: 25px;
    }
    .mybar {
        position: relative;
        height: 2.5rem;
        background: #fff;
        .timer {
            font-size: 0.6rem;
            font-family: 'PingFangSC-Regular';
            color: rgba(179, 179, 179, 1);
            position: absolute;
            left: 25px;
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
            height: 1rem;
            width: 100%;
        }
    }
</style>