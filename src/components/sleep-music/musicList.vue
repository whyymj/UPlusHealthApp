<template>
    <div class='musiclist'>
        <div class="row" v-for='(item,index) in musiclist' :key='index' @click='play(index,item)'>
            <div class="img">
                <!-- <img src="/static/sleepMusicList/img1.png" alt="" class="tab" v-if='playindex==index'> -->
                <span class="tab">{{index+1}}</span>
            </div>
            <div class="content" @click='play(index,item)'>
                <div class="title">{{item.name}}</div>
                <div class="time">约{{getTime(item.time)}}分钟</div>
                <div class="level" :style='{background:colorArr[item.level-1]}'>{{level(item.level)}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import bus from '../eventbus.js';
    export default {
        props: ['musiclist'],
        methods: {
            getTime(str) {
                if (typeof str == 'string') {
                    var arr = str.split(':');
                    return arr[0] * 1 + Math.round(arr[1] / 60)
                } else {
                    return 0
                }
            },
            level(index) {
                if (index == 1) {
                    return '初级'
                } else if (index == 2) {
                    return '中级'
                } else if(index == 3) {
                    return '高级'
                }
            },
            play(index, item) {
                this.playindex = index;
                bus.$emit('playing', this.musiclist[index]);
                this.$router.push({
                    path: '/sleepMusicPlayerPanel',
                    query: item
                });
            }
        },
        data() {
            return {
                showaudio: false,
                playindex: -1,
                colorArr:['#5DA2C5','#26A5FD','#F65261']
            }
        },
    }
</script>

<style lang='scss' scoped>
    .musiclist {
        width: 100%;
        margin-bottom: 3rem;
        .row {
            width: 100%;
            height: 3rem;
            position: relative;
            .img {
                width: 2rem;
                height: 3rem;
                position: absolute;
                top: 0;
                left: 0;
                .tab {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    width: 1rem;
                    height: 1rem;
                    font-size: 0.8rem;
                    font-family: 'PingFangSC-Regular';
                    color: rgba(153, 153, 153, 1);
                    text-align: center;
                    line-height: 1rem;
                }
            }
            .content {
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                right:0;
                box-sizing: border-box;
                border-bottom: 1px solid rgba(245, 245, 245, 1);
                .title {
                    font-size: 0.75rem;
                    font-family: 'PingFangSC-Regular';
                    color: rgba(51, 51, 51, 1);
                    position: absolute;
                    top: 0.4rem;
                    left: 2rem;
                    font-weight: 500;
                }
                .time {
                    font-size: 0.6rem;
                    font-family: 'PingFangSC-Regular';
                    color: rgba(153, 153, 153, 1);
                    position: absolute;
                    bottom: 0.4rem;
                    left: 2rem;
                }
                .level {
                    position: absolute;
                    right: 1rem;
                    height: 0.9rem;
                    line-height: 1.0rem;
                    box-sizing: border-box;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    background: rgba(34, 131, 226, 1);
                    border-radius: 0.1rem;
                    padding: 0 0.2rem;
                    font-size: 0.6rem;
                    font-family: 'PingFangSC-Regular';
                    color: rgba(255, 255, 255, 1);
                }
            }
        }
    }
</style>