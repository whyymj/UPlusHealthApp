<template>
    <div class='sleepList'>
        <h1>记录睡眠质量</h1>
        <h2>睡眠质量</h2>
        <div class='row'>
            <ul>
                <li v-for='(item,index) in imgs' :key='index'>
                    <img :src="item.url" alt="">
                    <h6>{{item.title}}</h6>
                </li>
            </ul>
            <h2>睡眠影响因素</h2>
        </div>
        <div class='row row2'>
            <h6>若没有请忽略此项</h6>
            <ul style='height:12rem;'>
                <li v-for='(item,index) in imgs2' :key='index' style='width:25%;height:5rem;'>
                    <img :src="item.url" alt="">
                    <h6>{{item.title}}</h6>
                </li>
            </ul>
        </div>
        <div class="button">保存</div>
        
    </div>
</template>

<script>
    export default {
        props: ['list'],
        data() {
            return {
                imgs: [{
                    url: '/static/sleep-manue-input/img9.png',
                    title: '十分差'
                }, {
                    url: '/static/sleep-manue-input/img10.png',
                    title: '较差'
                }, {
                    url: '/static/sleep-manue-input/img11.png',
                    title: '正常'
                }, {
                    url: '/static/sleep-manue-input/img12.png',
                    title: '比较好'
                }, {
                    url: '/static/sleep-manue-input/img13.png',
                    title: '超级棒'
                }],
                imgs2: [{
                    url: '/static/sleep-manue-input/img9.png',
                    title: '十分差'
                }, {
                    url: '/static/sleep-manue-input/img10.png',
                    title: '较差'
                }, {
                    url: '/static/sleep-manue-input/img11.png',
                    title: '正常'
                }, {
                    url: '/static/sleep-manue-input/img12.png',
                    title: '比较好'
                }, {
                    url: '/static/sleep-manue-input/img13.png',
                    title: '超级棒'
                }, {
                    url: '/static/sleep-manue-input/img10.png',
                    title: '较差'
                }, {
                    url: '/static/sleep-manue-input/img11.png',
                    title: '正常'
                }, {
                    url: '/static/sleep-manue-input/img12.png',
                    title: '比较好'
                }]
            }
        },
    }
</script>

<style lang='scss' scoped>
    .sleepList {
        width: 100%;
        overflow: hidden;
        margin-bottom: 1rem;
        h1 {
            font-size: 0.9rem;
            font-family: 'PingFangSC-Regular';
            color: rgba(17, 17, 17, 1);
            height: 3rem;
            line-height: 3rem;
            width: 17rem;
            margin: auto;
            font-weight: 500;
        }
        h2 {
            font-size: 0.75rem;
            width: 17rem;
            font-family: 'PingFangSC-Regular';
            color: rgba(51, 51, 51, 1);
            margin: 0 auto 0.8rem;
        }
        .row {
            position: relative;
            width: 17rem;
            border-top: 1px solid rgba(245, 245, 245, 1);
            margin: auto;
            ul {
                width: 17rem;
                margin: auto;
                height: 5rem;
                li {
                    width: 20%;
                    height: 100%;
                    float: left;
                    img {
                        width: 1.6rem;
                        height: 1.6rem;
                        display: block;
                        margin: 1rem auto 0.6rem;
                    }
                    h6 {
                        font-size: 0.6rem;
                        font-family: 'PingFangSC-Regular';
                        color: rgba(50, 182, 230, 1);
                        text-align: center;
                    }
                }
            }
        }
        .row2 {
            height: auto;
            h6 {
                margin: 0.5rem 0 0.6rem;
                font-size: 0.6rem;
                font-family: 'PingFangSC-Regular';
                color: rgba(153, 153, 153, 1);
            }
        }
        .button {
            width: 100%;
            height: 3rem;
            background: #26A6FF;
            line-height: 3rem;
            font-size: 0.8rem;
            font-family: 'PingFangSC-Regular';
            color: rgba(255, 255, 255, 1);
            text-align: center;
        }
    }
</style>