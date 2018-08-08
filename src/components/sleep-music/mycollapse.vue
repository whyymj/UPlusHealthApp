<template>
    <div class='myCollapse'>
        <swiper :options="option" ref="mySwiper">
            <!-- slides -->
            <swiper-slide key='0'>
                <div style='width:100%;'>
                    <slot></slot>
                </div>
            </swiper-slide>

            <swiper-slide class='menu' key='1' v-if='havedata'>
                <div class='delete_this'>
                    <i class="el-icon-delete"></i>
                    <span class='cannt_getback'>不可恢复</span>
                </div>
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
        components: {
            swiper,
            swiperSlide
        },
        props: ['havedata'],
        methods: {
            deleteThis() {
                this.$emit('deleteThis');
            }
        },
        data() {
            return {
                option: {
                    slidesPerView: 'auto',
                    notNextTick: true,
                    // swiper configs 所有的配置同swiper官方api配置
                    autoplay: 3000,
                    resistanceRatio: 0,
                    slideToClickedSlide: true,
                    // direction : 'vertical',
                    // effect: "coverflow",
                    // loop : true,
                    initialSlide: 0,
                    grabCursor: true,
                    setWrapperSize: true,
                    spaceBetween: 0,
                    centeredSlides: false,
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
                }
            }
        },
        methods: {},
        mounted() {
            document.getElementsByTagName('body')[0].onclick=function(e){
                console.log(e.target.getAttribute('class'));

            }
        }
    }
</script>

<style lang='scss'>
    .myCollapse {
        width: 100%;
        background: #fff;
        .swiper-wrapper {
            width: 20rem;
            height: 100%;
        }
        .menu {
            width: 100px;
        }
        .swiper-slide {
            text-align: center;
            font-size: 18px;
            width: 17rem;
            background: #fff;
            /* Center slide text vertically */
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
            margin: 0!important;
        }
        .menu {
            width: 3rem;
            height: 4rem;
            background-color: #2C8DFB;
            color: #fff;
            .delete_this {
                width: 100%;
                height: 100%;
                background: #FF475D;
                text-align: center;
                color: #fff;
                font-size: 0.6rem;
                font-family: 'PingFangSC-Regular';
                i {
                    display: inline-block;
                    width: 100%;
                    font-size: 1.3rem;
                    line-height: 2.5rem;
                }
            }
        }
    }
</style>