<template>
    <div class='myCollapse2'>
        <div class='body' :style='{height:height+"rem","padding-top": pdtop+"rem"}'>
            <div class='container' :style='{"margin-top":-paddingEnd+"rem"}'>
                <slot></slot>
            </div>
        </div>
        <div class="block-control" style="left: 0px;height:30px;" @click="scale"><i class='el-icon-arrow-down' :class='{rotate:show}'></i></div>
    </div>
</template>

<script>
    export default {
        props: ['endH', 'exportP', 'animateT', 'startH'],
        data() {
            return {
                show: false,
                animateTime: 0,
                rem: 0,
                height: 2, //rem
                start: 2, //rem
                end: 18, //rem
                timeGap: 500, //ms
                animateTime: 0,
                pdtop: 0,
                paddingStart: 0,
                paddingEnd: 2
            }
        },
        methods: {
            tall() {
                var that = this;
                var v = 0;
                var p = 0;
                window.requestAnimationFrame(function(time) {
                    that.animateTime = time - that.animateTime > 200 ? time - 50 : that.animateTime;
                    if (that.height < that.end) {
                        v = (that.end - that.start) / that.timeGap * (time - that.animateTime);
                        p = (that.paddingEnd - that.paddingStart) / that.timeGap * (time - that.animateTime);
                        that.height = that.height + v;
                        that.pdtop = that.pdtop + p;
                        that.animateTime = time;
                        that.tall();
                    } else {
                        that.show = !that.show;
                        that.height = that.end;
                        that.pdtop = that.paddingEnd;
                    }
                })
            },
            shrink() {
                var that = this;
                var v = 0;
                var p = 0;
                window.requestAnimationFrame(function(time) {
                    that.animateTime = time - that.animateTime > 200 ? time - 50 : that.animateTime;
                    if (that.height > that.start) {
                        v = (that.end - that.start) / that.timeGap * (time - that.animateTime);
                        p = (that.paddingEnd - that.paddingStart) / that.timeGap * (time - that.animateTime);
                        that.height = that.height - v;
                        that.pdtop = that.pdtop - p;
                        that.animateTime = time;
                        that.shrink();
                    } else {
                        that.show = !that.show;
                        that.height = that.start;
                        that.pdtop = that.paddingStart;
                    }
                })
            },
            scale(e) {
                if (!this.show) { //开始变长
                console.log('>>>>');
                    this.tall();
                } else {
                    this.shrink();
                }
            }
        },
        mounted() {
            this.height = this.startH * 1 || 3.8;
            this.start = this.startH * 1 || 3.8;
            this.end = this.endH * 1 || 18;
            this.timeGap = this.animateT * 1 || 500; //ms
            this.paddingEnd = this.exportP * 1 || 2.7;
            window.requestAnimationFrame = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback, element) {
                    var start,
                        finish;
                    window.setTimeout(function() {
                        start = +new Date();
                        callback(start);
                        finish = +new Date();
                        self.timeout = 1000 / 60 - (finish - start);
                    }, self.timeout);
                };
            window.cancelNextRequestAnimationFrame = window.cancelRequestAnimationFrame ||
                window.webkitCancelAnimationFrame ||
                window.webkitCancelRequestAnimationFrame ||
                window.mozCancelRequestAnimationFrame ||
                window.oCancelRequestAnimationFrame ||
                window.msCancelRequestAnimationFrame ||
                clearTimeout;
            const html = document.getElementsByTagName('html')[0];
            const w = document.documentElement.clientWidth || document.body.clientWidth;
            this.rem = (w / 375) * 20;
        }
    }
</script>

<style lang='scss' scoped>
    .myCollapse2 {
        width: 100%;
        background: #fff;
        .body {
            width: 100%;
            height: 2rem;
            overflow: hidden;
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
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: height 0.5s;
    }
    .fade-enter,
    .fade-leave-to
    /* .fade-leave-active below version 2.1.8 */
    {
        height: 2rem;
    }
    .fade-enter-to,
    .fade-leave
    /* .fade-leave-active below version 2.1.8 */
    {
        height: 18rem;
    }
</style>