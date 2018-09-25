<template>
    <div class='warmTips'>
        <h1 v-show='list.length>0'>温馨建议</h1>
        <swiper :options="option" ref="swiperOption" v-if='list.length>0'>
            <!-- slides -->
            <swiper-slide v-for='(item,index) in list' :key='index'>
                <div class="container" @click='toMusic(item)' v-if='item.type!=-1'>
                    <img :src="item.img" alt="">
                    <h6 v-if='item.type==2'>{{item.title}}</h6>
                    <p v-if='item.type==2'>{{item.body}}</p>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import _ from 'lodash'
    export default {
        props: ['tips'],
        watch: {
            tips() {
                this.list = this.tips;
                if (this.list.length % 2 == 1) { //填補一個无效的凑数用
                    this.list.push({
                        type: -1
                    })
                }
            }
        },
        methods: {
            toMusic(url) {
                if (url.type == 2) { //跳百科
                    this.$router.push({
                        path: '/getSleepWiki',
                        query: {
                            postId: url.audio || '',
                            title: url.title || ''
                        }
                    })
                } else if (url.type == 1) { //跳转音乐播放
                    this.$router.push({
                        path: '/sleepMusicPlayerPanel',
                        query: {
                            musicurl: url.audio || '',
                            name: url.title || ''
                        }
                    })
                }
                console.log('-----------------', url);
            }
        },
        data() {
            return {
                option: {
                    // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
                    // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                    notNextTick: true,
                    // swiper configs 所有的配置同swiper官方api配置
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                        // stopOnLastSlide: true
                    },
                    // autoplay: false,
                    // direction : 'vertical',
                    // effect: "coverflow",
                    speed: 1000,
                    // loop: true,
                    grabCursor: true,
                    setWrapperSize: true,
                    slidesPerView: 2,
                    spaceBetween: 10,
                    centeredSlides: false,
                    // centeredSlides: true,
                    // autoHeight: true,
                    // paginationType:"bullets",
                    paginationClickable: true,
                    // scrollbar:'.swiper-scrollbar',
                    mousewheelControl: true,
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true,
                    // if you need use plugins in the swiper, you can config in here like this
                    // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
                    // debugger: true,
                    // swiper callbacks
                    // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
                    // onTransitionStart(swiper){
                    //   console.log(swiper)
                    // },
                    // more Swiper configs and callbacks...
                    // ...
                },
                auto: 5000,
                list: []
            }
        },
        mounted() {
            this.list = this.tips;
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
            height: 5rem;
            overflow: hidden;
            padding: 0;
            img {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
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
                font-size: 0.6rem;
                font-family: 'PingFangSC-Regular';
                color: #fff;
                padding: 0.5rem 0.3rem 0 0.3rem;
                width: 100%;
                position: relative;
                z-index: 10;
                line-height: 0.8rem;
                box-sizing: border-box;
                font-weight: 100;
            }
            p {
                position: relative;
                z-index: 10;
                width: 5rem;
                padding: 0.2rem 0 0 0.3rem;
                font-size: 0.4rem;
                font-family: 'PingFangSC-Regular';
                color: #fff;
                font-weight: 100;
                line-height: 0.7rem;
                box-sizing: border-box;
            }
        }
    }
</style>