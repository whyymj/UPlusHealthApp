<template>
    <div class="all">
        <img class='bg' src="../../../assets/beijing1.png" alt="">
        <div class="top">
            你的本次测量的体重为：
        </div>
        <div class="top1">75.1</div>
        <div class="top2">公斤</div>
        <div class="top3" @click='toReport'>生成健康报告</div>
    </div>

</template>
<script>
export default {
    methods:{
        toReport(){
            this.$router.push('/sleepMusicList');
        }
    }
}
</script>

<style lang="scss">
    .all {
        width: 18.75rem;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        .bg {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
        .top {
            position: absolute;
            width: 100%;
            height: 1rem;
            top: 3rem;
            text-align: center;
            height: 1rem;
            font-size: 0.8rem;
            font-family: 'PingFangSC-Regular';
            color: rgba(15, 59, 110, 1);
            line-height: 1.1rem;
        }
        .top1 {
            position: absolute;
            left: 50%;
            top: 30%;
            transform: translate(-50%, 0);
            height: 4.9rem;
            font-size: 3.5rem;
            font-family: PingFangSC-Regular;
            color: #FFFFFF;
            line-height: 4.9rem;
        }
        .top2 {
            position: absolute;
            left: 50%;
            top: 45%;
            transform: translate(-50%, 0);
            height: 1.4rem;
            font-size: 1rem;
            font-family: PingFangSC-Medium;
            color: #FFFFFF;
            line-height: 1.4rem;
        }
        .top3 {
            position: absolute;
            width: 8rem;
            height: 2rem;
            left: 50%;
            bottom: 14%;
            transform: translate(-50%, 0);
            font-size: 0.8rem;
            font-family: PingFangSC-Regular;
            color: rgba(255, 255, 255, 1);
            line-height: 2rem;
            background: rgba(34, 131, 226, 1);
            box-shadow: 0rem 0.4rem 0.8rem 0rem rgba(34, 131, 226, 0.4);
            border-radius: 1.23rem;
            text-align: center;
        }
    }
</style>
