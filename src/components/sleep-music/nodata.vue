<template>
    <div class='dataDeviation' v-if='show'>
        <h6>暂无数据</h6>
        <span class="el-icon-close" @click='close'></span>
        <p>连接 Apple Health,同步睡眠数据。</p>
        <div class="button" @click='changeRecord'>立即设置</div>
        
    </div>
</template>

<script>
    import modal from './myModal.vue';
    export default {
        data() {
            return {
                show: true,
                changeNow: false
            }
        },
        components: {
            modal
        },
        methods: {
            close() {
                this.show = false;
            },
            closemodal() {
                this.changeNow = false;
            },
            changeRecord() {
                this.changeNow = true;
            }
        }
    }
</script>

<style lang='scss' scoped>
    .recordbox {
        width: 11rem;
        margin: auto;
        position: relative;
        .imgbox {
            width: 100%;
            height: 3rem;
            position: relative;
            img {
                position: absolute;
                top: 0;
                bottom: 0;
            }
            .img1 {
                left: 0;
                width: 2rem;
                height: 3rem;
            }
            .img2 {
                right: 0;
                left: 0;
                width: 1rem;
                height: 1rem;
                margin: auto;
            }
            .img3 {
                right: 0;
                width: 2rem;
                height: 3rem;
            }
        }
    }
    .dataDeviation {
        background: #fff;
        width: 17rem;
        height: 5rem;
        margin: 0.5rem auto;
        position: relative;
        h6 {
            font-size: 0.8rem;
            font-family: 'PingFangSC-Medium';
            color: rgba(17, 17, 17, 1);
            position: absolute;
            top: 1rem;
            left: 1rem;
            font-weight: 600;
        }
        span {
            position: absolute;
            top: 0;
            right: 0;
            color: #2283E2;
            margin: 1rem;
            font-size: 1rem;
        }
        p {
            position: absolute;
            left: 1rem;
            bottom: 1rem;
            font-size: 0.6rem;
            font-family: 'PingFangSC-Regular';
            color: rgba(102, 102, 102, 1);
            width: 11rem;
        }
        .button {
            position: absolute;
            width: 4rem;
            height: 1rem;
            right: 1rem;
            bottom: 1rem;
            font-size: 0.7rem;
            font-family: 'PingFangSC-Regular';
            background:rgba(38,166,255,1);
            line-height: 1rem;
            text-align: center;
            color:#fff;
            border-radius: 0.5rem;
        }
    }
</style>