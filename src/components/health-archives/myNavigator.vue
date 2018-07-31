<template>
    <div style='height:2rem;width:13rem;margin:0.4rem auto 0;'>
        <swiper :options="option" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="(item,index) in navigateList" :key='index'>
                <div style='height:2rem;width:100%;' @click='turnto(index)'>
                    <span :class='{active:active==index}'>{{item.relation_name}}</span></div>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'
    export default {
        name: 'carrousel',
        methods: {
            turnto(index) {
                this.swiper.slideTo(index, 1000, false);
                this.active = index;
                this.$emit('clickNav', index)
            }
        },
        props: ['navigateList'],
        computed: {
            swiperOption() {
                if (this.navigateList.length > 5) {
                    this.option.loop = true;
                }
                return this.option;
            }
        },
        data() {
            return {
                active: 0,
                option: {
                    // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
                    // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                    notNextTick: true,
                    // swiper configs 所有的配置同swiper官方api配置
                    autoplay: 3000,
                    // direction : 'vertical',
                    // effect: "coverflow",
                    // loop : true,
                    grabCursor: true,
                    setWrapperSize: true,
                    slidesPerView: 5,
                    spaceBetween: 20,
                    centeredSlides: true,
                    // autoHeight: true,
                    // paginationType:"bullets",
                    paginationClickable: true,
                    // scrollbar:'.swiper-scrollbar',
                    mousewheelControl: true,
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
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        // you can find current swiper instance object like this, while the notNextTick property value must be true
        // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        mounted() {
            this.swiper.slideTo(0, 1000, false)
        }
    }
</script>
<style lang='scss'scoped>
    span {
        display: inline-block;
        margin: auto;
        height: 100%;
        text-align: center;
        line-height: 2rem;
        font-size: 0.75rem;
        font-family: PingFangSC-Regular;
       color:rgba(102,102,102,1);
    }
    .active {
        border-bottom: 0.1rem solid rgba(38, 165, 253, 1);
        color: rgba(38, 165, 253, 1);
    }
</style>