<template>
    <div class='turnQuestions'>
        <bar :totalnum='totalnum' :curnum='curnum'></bar>
        <el-carousel indicator-position='none' :autoplay='autoplay' arrow='never' ref='carousel'>
            <el-carousel-item v-for="(item,index) in list" :key="index">
                <questionlist :list='item' :id='index' @selectQuestion='getOptions'></questionlist>
            </el-carousel-item>
        </el-carousel>
        <div class="prevbutton" @click='prev' v-if='curnum>1'>上一题</div>
        <div class="nextbutton" @click='next' v-if='curnum<totalnum'>下一题</div>
    </div>
</template>

<script>
    import questionlist from './questionsList';
    import bar from './progressBar';
    export default {
        props: ['list'],
        components: {
            bar,
            questionlist
        },
        data() {
            return {
                autoplay: false,
                totalnum: 0,
                curnum: 0,
                cacheOptions: {}
            }
        },
        methods: {
            prev() {
                this.$refs.carousel.prev();
                this.curnum = this.curnum - 1;
            },
            next() {
                this.$refs.carousel.next();
                this.curnum = this.curnum + 1;
            },
            getOptions(data) {
                var that = this;
                that.cacheOptions[data.questnum] = data.option;
                localStorage.UPlusHealthCache = that.cacheOptions;
                console.log(localStorage);
            }
        },
        mounted() {
            this.totalnum = this.list.length;
            if (this.totalnum > 0) {
                this.curnum = 1;
            }
        }
    }
</script>

<style lang='scss' scoped>
    .turnQuestions {
        width: 100%;
        overflow: hidden;
        background: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
        top: 3rem;
    }
    .prevbutton {
        width: 5rem;
        height: 1.7rem;
        border-radius: 1rem;
        text-align: right;
        padding: 0 0.5rem;
        line-height: 1.7rem;
        color: #fff;
        font-size: 0.75rem;
        font-family: 'PingFangSC-Regular';
        font-weight: 500;
        background: rgba(50, 182, 230, 1);
        position: absolute;
        left: -2rem;
        bottom: 4rem;
    }
    .nextbutton {
        width: 5rem;
        height: 1.7rem;
        border-radius: 1rem;
        text-align: left;
        padding: 0 0.5rem;
        line-height: 1.7rem;
        color: #fff;
        font-size: 0.75rem;
        font-family: 'PingFangSC-Regular';
        font-weight: 500;
        background: rgba(50, 182, 230, 1);
        position: absolute;
        right: -2rem;
        bottom: 4rem;
    }
</style>