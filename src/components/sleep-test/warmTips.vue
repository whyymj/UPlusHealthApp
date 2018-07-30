<template>
    <div class='warmTips'>
        <h1>温馨建议</h1>
        <mt-swipe :show-indicators="false" auto="5000">
            <mt-swipe-item v-for='(item,index) in list' :key='index'>
                <div class="container">
                    <div v-for='(val,key) in item' :key='key' :class="{left:key==0,right:key==1}">
                        <h6>{{val.title}}</h6>
                        <p class="body">{{val.body}}</p>
                    </div>
                </div>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    import _ from 'lodash'
    export default {
        props: ['tips'],
        data() {
            return {
                list: []
            }
        },
        mounted() {
            this.list = _.chunk(this.tips, 2);
        }
    }
</script>

<style lang='scss' scoped>
    .warmTips {
        width: 17.5rem;
        height: 6rem;
        margin: auto;
        position: relative;
        h1 {
            font-size: 0.8rem;
            font-family: 'PingFangSC-Medium';
            color: rgba(17, 17, 17, 1);
            line-height: 1.1rem;
            font-weight: 600;
            padding: 0 0.7rem;
            margin: 1rem 0 0.5rem;
        }
        .container {
            position: relative;
            width: 17.5rem;
            height: 5rem;
            .left,
            .right {
                width: 8.25rem;
                height: 5rem;
                background: #fff;
                position: absolute;
                top: 0;
            }
            .left {
                left: 0;
            }
            .right {
                right: 0.5rem
            }
            h6 {
                font-size: 0.7rem;
                font-family: 'PingFangSC-Regular';
                color: rgba(34, 131, 226, 1);
                width: 100%;
                padding: 0.5rem 0.5rem 0.1rem;
                box-sizing: border-box;
            }
            p {
                width: 100%;
                font-size: 0.6rem;
                font-family: 'PingFangSC-Regular';
                color: rgba(102, 102, 102, 1);
                line-height: 0.97rem;
                box-sizing: border-box;
                padding: 0 0.5rem 0.5rem;
                ;
            }
        }
    }
</style>