<template>
    <div style='background:#fff;'>
        <div>
            <slot name='main'></slot>
        </div>
        <!-- <transition name="slide-fade"> -->
        <div class='slider' ref='slider'>
            <div>
                <slot name='slider'></slot>
            </div>
        </div>
        <!-- </transition> -->
        <div class="block-control" style="left: 0px;height:30px;" @click="showSlider"><i class='el-icon-arrow-down' :class='{rotate:show}'></i></div>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                show: false,
                animateTime: 0,
                rem: 0
            }
        },
        computed: {
            setIcon() { //设置箭头向上向下转换
                return this.show ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
            }
        },
        methods: {
            showSlider() {
                this.animateTime = 0;
                this.funTransitionHeight(this.$refs.slider, 300);
                this.show = !this.show;
                this.$emit('showDetail', this.show)
            },
            // 高度无缝动画方法
            funTransitionHeight(element, transTime) { // time, 数值，可缺省
                var that = this;
                function myanim(start, end, timeGap) { //(起始高度，终点高度，时间间隔)
                    var v = 0;
                    window.requestAnimationFrame(function(time) {
                        that.animateTime = that.animateTime || time;
                        v = (start - end) / timeGap * (time - that.animateTime);
                        element.style.height = start
                        if (start < end) {
                            if (start - v >= end) {
                                element.style.height = end + 'px';
                            } else {
                                myanim(start - v, end, timeGap + that.animateTime - time)
                            }
                        } else {
                            if (start - v <= 0) {
                                element.style.height = 0;
                            } else {
                                myanim(start - v, end, timeGap + that.animateTime - time)
                            }
                        }
                    })
                }
                if (typeof window.getComputedStyle == "undefined") return;
                var height = window.getComputedStyle(element).height.split('px')[0]; //初始值
                var targetHeight = 0; //目标
                if (height > 0) {
                    targetHeight = 0;
                } else {
                    element.style.height = 'auto';
                    targetHeight = window.getComputedStyle(element).height.split('px')[0];
                    element.style.height = 0;
                }
                this.$nextTick(function() {
                    myanim(height, targetHeight, transTime)
                });
            }
        },
        mounted() {
            const html = document.getElementsByTagName('html')[0];
            const w = document.documentElement.clientWidth || document.body.clientWidth;
            this.rem = (w / 375) * 20;
        }
    }
</script>

<style lang='scss' scoped>
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slider {
        overflow: hidden;
        transition: height 500ms;
        height: 0;
    }
    .block-control {
        padding-top: 0.5rem;
        height: 1.5rem;
        i {
            display: block;
            width: 0.6rem;
            height: 0.25rem;
            margin: auto;
        }
        i.rotate {
            transform: rotate(180deg);
            transform-origin: 50% 100%;
        }
    }
</style>