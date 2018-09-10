<template>
    <div class='scoreimg'>
        <span class="detail" :style="{left:left+'rem'}" v-if='show'>{{score}}分 <span class="yaxis"></span></span>
        <p class="bar" :style='{background:color}' :class="[type]"></p>
        <h6>{{title}}</h6>
    </div>
</template>

<script>
    export default {
        props: ['color', 'type', 'uplimit', 'downlimit', 'title', 'score', 'showUp', 'showDown'],
        data() {
            return {}
        },
        computed: {
            show() {
                if (this.score > this.downlimit && this.score < this.uplimit) {
                    return true;
                } else if (this.score == this.downlimit && this.showDown) {
                    return true;
                } else if (this.score == this.uplimit && this.showUp) {
                    return true;
                } else {
                    return false;
                }
            },
            left() {
                if (this.score >= this.downlimit && this.score <= this.uplimit) {
                    var left = -1 + (this.score - this.downlimit) / (this.uplimit - this.downlimit) * 4;
                    return left;
                } else {
                    return 0
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    .scoreimg {
        width: 4rem;
        float: left;
        height: 2.6rem;
        margin-left: 0.2rem;
        position: relative;
        .leftLimit {
            border-top-left-radius: 0.2rem;
            border-bottom-left-radius: 0.2rem;
        }
        .rightLimit {
            border-top-right-radius: 0.2rem;
            border-bottom-right-radius: 0.2rem;
        }
        .detail {
            width: 2rem;
            height: 0.9rem;
            text-align: center;
            line-height: 0.9rem;
            background: rgba(90, 174, 255, 1);
            font-size: 0.6rem;
            font-family: 'Roboto-Medium';
            color: rgba(255, 255, 255, 1);
            position: absolute;
            border-radius: 0.45rem;
            z-index: 1;
            .yaxis {
                height: 1.4rem;
                width: 1px;
                background: rgba(90, 174, 255, 1);
                position: absolute;
                top: 0.9rem;
                left: 0;
                right: 0;
                margin: auto;
            }
        }
        .bar {
            width: 100%;
            height: 0.4rem;
            position: absolute;
            top: 1.8rem;
            background: #2283E2;
        }
        h6 {
            position: absolute;
            width: 100%;
            top: 2.5rem;
            text-align: center;
            font-size: 0.5rem;
            font-family: 'NotoSansCJKsc-Regular';
            color: rgba(118, 118, 118, 1);
        }
    }
</style>