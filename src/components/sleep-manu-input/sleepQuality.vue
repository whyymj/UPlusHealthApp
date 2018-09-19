<template>
    <div class='sleepList'>
        <h1 style='width:17rem;padding:0;text-aligin:left;margin:auto;'>记录睡眠质量</h1>
        <h2>睡眠质量</h2>
        <div class='row'>
            <ul>
                <li v-for='(item,index) in imgs' :key='index' @click='chooseQuality(index)'>
                    <img :src="item.url" alt="" v-if='sleepQuality[index]!=0'>
                    <img :src="item.url_null" alt="" v-else>
                    <h6 :style='{color:sleepQuality[index]!=0?"rgba(50, 182, 230, 1)":"rgba(153,153,153,1)"}'>{{item.title}}</h6>
                </li>
            </ul>
            <h2>睡眠影响因素</h2>
        </div>
        <div class='row row2'>
            <h6>若没有请忽略此项</h6>
            <ul style='height:12rem;'>
                <li v-for='(item,index) in imgs2' :key='index' style='width:25%;height:5rem;' @click='chooseFactor(index)'>
                    <img :src="item.url" alt="" v-if='sleepFactor[index]!=0'>
                    <img :src="item.url_null" alt="" v-else>
                    <h6 :style='{color:sleepFactor[index]!=0?"rgba(50, 182, 230, 1)":"rgba(153,153,153,1)"}'>{{item.title}}</h6>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['list', 'quality', 'factors'],
        watch: {
            quality() {
                if (this.quality) {
                    this.sleepQuality.splice(this.quality, 1, 1);
                }
            },
            factors() {
                if (this.factors) {
                    var that = this;
                    var arr = this.factors.split(';');
                    var tmp = that.imgs2.map(function(item) {
                        return item.title
                    })
                    arr.map(function(item) {
                        that.sleepFactor.splice(tmp.indexOf(item), 1, 1)
                    })
                }
            }
        },
        methods: {
            chooseQuality(index) {
                this.sleepQuality = this.sleepQuality.map(function(item) {
                    return 0;
                })
                this.sleepQuality.splice(index, 1, 1);
                this.$emit('chooseQuality', index);
            },
            chooseFactor(index) {
                var that = this;
                this.sleepFactor.splice(index, 1, this.sleepFactor[index] == 0 ? 1 : 0);
                this.$emit('chooseFactor', this.sleepFactor.map(function(item, index) {
                    if (item) {
                        return that.imgs2[index].title;
                    }
                }).filter(function(item) {
                    return item
                }).join(';'));
            }
        },
        data() {
            return {
                imgs: [{
                    url: '/static/sleep-manue-input/img9.svg',
                    url_null: '/static/sleep-manue-input/img9_null.svg',
                    title: '十分差',
                    level: 1
                }, {
                    url: '/static/sleep-manue-input/img10.svg',
                    url_null: '/static/sleep-manue-input/img10_null.svg',
                    title: '较差',
                    level: 2
                }, {
                    url: '/static/sleep-manue-input/img11.svg',
                    url_null: '/static/sleep-manue-input/img11_null.svg',
                    title: '正常',
                    level: 3
                }, {
                    url: '/static/sleep-manue-input/img12.svg',
                    url_null: '/static/sleep-manue-input/img12_null.svg',
                    title: '比较好',
                    level: 4
                }, {
                    url: '/static/sleep-manue-input/img13.svg',
                    url_null: '/static/sleep-manue-input/img13_null.svg',
                    title: '超级棒',
                    level: 5
                }],
                imgs2: [{
                    url: '/static/sleep-manue-input/img5.svg',
                    url_null: '/static/sleep-manue-input/img5_null.svg',
                    title: '光亮',
                    level: 1
                }, {
                    url: '/static/sleep-manue-input/img15.svg',
                    url_null: '/static/sleep-manue-input/img15_null.svg',
                    title: '噪音',
                    level: 2
                }, {
                    url: '/static/sleep-manue-input/img16.svg',
                    url_null: '/static/sleep-manue-input/img16_null.svg',
                    title: '温度',
                    level: 3
                }, {
                    url: '/static/sleep-manue-input/img6.svg',
                    url_null: '/static/sleep-manue-input/img6_null.svg',
                    title: '不适',
                    level: 4
                }, {
                    url: '/static/sleep-manue-input/img7.svg',
                    url_null: '/static/sleep-manue-input/img7_null.svg',
                    title: '压力',
                    level: 5
                }, {
                    url: '/static/sleep-manue-input/img14.svg',
                    url_null: '/static/sleep-manue-input/img14_null.svg',
                    title: '认床',
                    level: 6
                }, {
                    url: '/static/sleep-manue-input/img8.svg',
                    url_null: '/static/sleep-manue-input/img8_null.svg',
                    title: '床伴',
                    level: 7
                }, {
                    url: '/static/sleep-manue-input/img17.svg',
                    url_null: '/static/sleep-manue-input/img17_null.svg',
                    title: '饱餐',
                    level: 8
                }],
                sleepQuality: [0, 0, 0, 0, 0],
                sleepFactor: [0, 0, 0, 0, 0, 0, 0, 0]
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
    }
</style>