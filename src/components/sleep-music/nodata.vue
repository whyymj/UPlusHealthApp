<template>
    <div class='dataDeviation' v-if='show'>
        <h6>暂无数据</h6>
        <span class="el-icon-close" @click='close'></span>
        <p v-if='isIos'>连接 Apple Health,同步睡眠数据。</p>
        <p v-else>还没有数据，快去添加吧。</p>
        <div class="button" @click='changeRecord'>{{isIos?"立即设置":"立即添加"}}</div>
        <modal :showmodal='changeNow' @closemodal='closemodal'>
            <div class='recordbox'>
                <div class='imgbox'>
                    <img src="/static/sleepMusicList/img7.png" class='img1' alt="">
                    <img src="/static/sleepMusicList/img10.png" class='img2' alt="">
                    <img src="/static/sleepMusicList/img8.png" class='img3' alt="">
                </div>
                <div class="body">
                    <div class='p'>连接<i> Apple Health </i>后，会将它的睡眠数据同步至<i> 优家App </i>睡眠报告。如果要调整它们之间的共享数据设置，请打开手机上的<i>Health</i><i>(健康)</i><i>应用 </i>，点击<i> 数据来源 </i>，找到优家App,启用或禁用共享权限。</div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
    import modal from './myModal.vue';
    export default {
        data() {
            return {
                isIos: true,
                show: true,
                changeNow: false
            }
        },
        components: {
            modal
        },
        mounted() {
            var u = navigator.userAgent
            this.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        },
        methods: {
            close() {
                this.show = false;
            },
            closemodal() {
                this.changeNow = false;
            },
            changeRecord() {
                if (this.isIos) {
                    this.changeNow = true;
                } else {
                    this.$router.push('/sleepManuInput');
                }
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
                width: 3rem;
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
                width: 3rem;
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
            background: rgba(38, 166, 255, 1);
            line-height: 1rem;
            text-align: center;
            color: #fff;
            border-radius: 0.5rem;
        }
    }
</style>