<template>
    <div style='width:100%; height:100%;position:relative;padding:1rem 0;'>
        <div class='box ' :class='bgcolor'><img :src="imgUrl" alt=""><span :style="{color:color}">{{title}}</span></div>
        <div class='detail'><span class='cont' :style="{fontSize:fontsize}">{{cont}}</span><span class='unit' :style="{display:display}">{{unit}}</span></div>
    </div>
</template>

<script>
    export default {
        props: ['img', 'title', 'cont', 'bg', 'unit'],
        computed: {
            bgcolor() {
                return this.cont != '' ? this.bg : "greyBox"
            },
            color() {
                return (this.bg == 'orangeBox' || this.bg == 'redBox') ? '#fff' : '#26A5FD'
            },
            fontsize() {
                return (this.cont == '正常' || this.title == '睡眠') ? '0.7rem' : '1.2rem'
            },
            display() {
                return this.cont != '' ? 'block' : 'none'
            },
            imgUrl() {
                var arr = this.img.split('.');
                return this.cont != '' ? this.img : arr[0] + '_null.' + arr[1]
            }
        }
    }
</script>

<style scoped lang='scss'>
    .box {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        position: relative;
        margin: auto;
        background: rgba(38, 165, 253, 0.2);
        span {
            color: #26A5FD;
            font-size: 0.5rem;
            position: absolute;
            left: 0;
            right: 0;
            text-align: center;
            margin: auto;
            bottom: 0.2rem;
        }
        img {
            position: absolute;
            width: 1rem;
            height: 1rem;
            left: 0;
            right: 0;
            margin: auto;
            top: 0.35rem;
        }
    }
    .detail {
        word-wrap: break-word;
        word-break: normal;
        width: 4.2rem;
        text-align: center;
        margin: auto;
        padding-top: 0.2rem;
    }
    .cont {
        font-size: 1.2rem;
        font-weight: 500;
        font-family: 'ArialMT';
        color: #3C3939;
        line-height: 1.4rem;
    }
    .unit {
        font-size: 0.6rem;
        font-weight: 500;
        font-family: ArialMT;
        color: #B3B3B3;
        line-height: 0.7rem;
    }
    .orangeBox {
        background: #FF6E00;
    }
    .redBox {
        background: #FF475D;
    }
    .greyBox {
        background: #f7f7f7;
        color: #26A5FD;
    }
</style>