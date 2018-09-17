<template>
    <div>
        <div style='background:#fff;border:1px solid #fff;height:100;position:fixed;height:100%;top:0;left:0;width:100%;'>
            <mt-swipe :auto="0" :show-indicators="false" @change="handleChange" :continuous='false'>
                <mt-swipe-item>
                    <div class='page1'>
                        <h1>新增睡眠报告</h1>
                        <span>睡眠认知和睡眠联系帮您睡的更香</span>
                        <img src="/static/newAddReport/new-sleep-report.png" alt="">
                    </div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <div class="page2" style='top:0'>
                        <h1>新增慢病标签</h1>
                        <span>优化健康的同时，帮您规避健康隐形风险</span>
                        <img src="/static/newAddReport/new-disease-tag.png" alt="">
                        <div class="button">
                            <span class='span1' @click="jump(1)">补全慢病信息</span>
                            <span class='span2' @click="jump(2)">跳过</span>
                        </div>
                    </div>
                </mt-swipe-item>
            </mt-swipe>
            <paginator :pagenum='pagenum' :pageindex='pageindex'></paginator>
        </div>
        <privacy :show="show"></privacy>
    </div>
</template>

<script>
    import paginator from './myPagination';
    import privacy from '../common/privacy.vue';
    export default {
        name: 'newSleepReport',
        components: {
            paginator,
            privacy
        },
        data() {
            return {
                show: false,
                pagenum: 2,
                pageindex: 0
            }
        },
        methods: {
            handleChange(index) {
                this.pageindex = index;
            },
            jump(type) {
                var that = this;
                if (type == 1) {
                    this.$router.push({
                        path: '/healthEntryMy',
                        query: that.$route.query
                    })
                } else {
                    this.$router.push({
                        path: '/healthRecordsB',
                        // query: that.$route.query
                    })
                }
            }
        },
        mounted() {
            window.localStorage.uplus_sleep_user_disease = '';
            window.localStorage.uplus_sleep_user_allergy = '';
            if (window.localStorage.UPlusAPP_agree_privacyPlan && (window.localStorage.UPlusAPP_agree_privacyPlan == 'true' || window.localStorage.UPlusAPP_agree_privacyPlan == true)) {
                this.show = false;
            } else {
                this.show = true;
            }
        }
    }
</script>

<style scoped lang='scss'>
    .page1 {
        h1 {
            font-size: 1.2rem;
            font-weight: 600;
            text-align: center;
            font-family: 'PingFangSC-Medium';
            line-height: 2rem;
            margin-top: 3rem;
            color: #333;
        }
        span {
            font-size: 0.8rem;
            line-height: 1rem;
            display: block;
            text-align: center;
            font-family: 'PingFangSC-Medium';
            margin-top: 1rem;
            font-weight: 600;
            color: #999;
        }
        img {
            width: 9rem;
            height: 16rem;
            margin: 2rem auto 0;
            display: block;
        }
    }
    .page2 {
        h1 {
            font-size: 1.2rem;
            font-weight: 600;
            text-align: center;
            font-family: 'PingFangSC-Medium';
            line-height: 2rem;
            margin-top: 3rem;
            color: #333;
        }
        span {
            font-size: 0.8rem;
            line-height: 1rem;
            display: block;
            text-align: center;
            font-family: 'PingFangSC-Medium';
            margin-top: 1rem;
            font-weight: 600;
            color: #999;
        }
        img {
            width: 17rem;
            height: 10rem;
            margin: 5rem auto 0;
            display: block;
        }
        .button {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 2.6rem;
            span {
                width: 50%;
                height: 100%;
                line-height: 2.6rem;
                text-align: center;
                position: absolute;
                font-size: 0.8rem;
                font-weight: 100;
                font-family: 'PingFangSC-Regular';
                color: rgba(255, 255, 255, 1);
                top: 0;
                margin: 0;
            }
            .span1 {
                left: 0;
                background: rgba(16, 214, 226, 1)
            }
            .span2 {
                right: 0;
                background: rgba(38, 166, 255, 1);
            }
        }
    }
</style>
