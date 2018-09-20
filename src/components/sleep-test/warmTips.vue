<template>
    <div class='warmTips'>
        <h1>温馨建议</h1>
        <swiper :options="option" ref="swiperOption" v-if='list.length>0'>
            <!-- slides -->
            <swiper-slide v-for='(item,index) in list' :key='index'>
                <div class="container" @click='toMusic(item)'>
                    <div v-for='(val,key) in item' :key='key' :class="{left:key==0,right:key==1}">
                        <h6>{{val.title}}</h6>
                        <p class="body">{{val.body}}</p>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import _ from 'lodash'
    export default {
        props: ['tips'],
        methods: {
            toMusic(url) {
                console.log(url);
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
                    // direction : 'vertical',
                    // effect: "coverflow",
                    speed: 1000,
                    loop: true,
                    grabCursor: true,
                    setWrapperSize: true,
                    slidesPerView: 2,
                    // spaceBetween: 20,
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
            this.list = _.chunk(this.tips, 1);
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