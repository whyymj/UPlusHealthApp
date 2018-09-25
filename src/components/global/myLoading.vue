<template>
    <div class='myLoadingModal' @touchmove.prevent v-show='show'>
        <div>
            <img src="/static/healthArchives/heart.svg" alt="">
            <h6>加载中...</h6>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['show'],
      
        data() {
            return {
                showMyLoadingModal: true,
                bar: ''
            }
        },
        methods: {
            showLoadingModal() {
                this.showMyLoadingModal = true;
            },
            hideLoadingModal() {
                this.showMyLoadingModal = false;
            }
        },
        mounted() {
            var that = this;
            this.showMyLoadingModal=this.show;
        }
    }
</script>

<style lang='scss' scoped>
    .myLoadingModal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 100000;
        div {
            width: 4.8rem;
            height: 3.8rem;
            background: rgba(0, 0, 0, 0.8);
            box-shadow: 0rem 0.8rem 1.2rem 0rem rgba(0, 0, 0, 0.24);
            border-radius: 0.16rem;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            h6 {
                width: 100%;
                text-align: center;
                height: 1rem;
                font-size: 0.7rem;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: 1rem;
                position: absolute;
                bottom: 0.4rem;
            }
            img {
                position: absolute;
                top: 0.2rem;
                left: 0;
                right: 0;
                margin: auto;
                width: 2rem;
                height: 2rem;
            }
        }
    }
</style>