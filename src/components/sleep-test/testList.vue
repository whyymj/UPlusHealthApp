<template>
    <div class='testList'>
        <ul>
            <li v-for='(item,index) in testList' :key='index'>
                <div @click='turnToTest'>
                    <h2>{{item.title}}</h2>
                    <i class='el-icon-arrow-right'></i>
                    <h6>{{item.detail}}</h6>
                    <span class='result'>{{item.result}}</span>
                    <span class="time">{{item.time}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: [
            'testList'
        ],
        data() {
            return {}
        },
        methods: {
            turnToTest() {
                var that = this;
                this.$router.push({
                    path: '/sleepTest',
                    query: {
                        test:11|| that.testList.meta
                    }
                });
            }
        }
    }
</script>

<style lang='scss' scoped>
    .testList {
        width: 100%;
        overflow: hidden;
        ul {
            width: 100%;
            li {
                width: 100%;
                height: 4rem;
                div {
                    width: 17rem;
                    height: 100%;
                    margin: auto;
                    position: relative;
                    border-bottom: 1px solid #F5F5F5;
                    h2 {
                        font-size: 0.75rem;
                        font-family: 'PingFangSC-Regular';
                        color: rgba(51, 51, 51, 1);
                        position: absolute;
                        top: 1rem;
                        line-height: 0.75rem;
                        font-weight: 600;
                        left: 0;
                    }
                    i {
                        position: absolute;
                        right: 0;
                        top: 0;
                        color: #32B6E6;
                        font-size: 1rem;
                        line-height: 4rem;
                    }
                    h6 {
                        font-size: 0.6rem;
                        font-family: 'PingFangSC-Regular';
                        color: rgba(179, 179, 179, 1);
                        position: absolute;
                        left: 0;
                        bottom: 1rem;
                        line-height: 0.6rem;
                    }
                    .result {
                        position: absolute;
                        font-size: 0.75rem;
                        font-family: 'PingFangSC-Regular';
                        color: rgba(34, 130, 227, 1);
                        line-height: 0.75rem;
                        top: 1rem;
                        right: 1.2rem;
                    }
                    .time {
                        position: absolute;
                        font-size: 0.6rem;
                        font-family: 'HelveticaNeue';
                        color: rgba(179, 179, 179, 1);
                        line-height: 0.6rem;
                        right: 1.2rem;
                        bottom: 1rem;
                    }
                }
            }
        }
    }
</style>