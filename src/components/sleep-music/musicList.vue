<template>
    <div class='musiclist'>
        <div class="row" v-for='(item,index) in musiclist' :key='index' @click='play(index)'>
            <div class="img">
                <img src="/static/sleepMusicList/img1.png" alt="" class="tab" v-if='playindex==index'>
                <span class="tab" v-else>{{index+1}}</span>
            </div>
            <div class="content">
                <div class="title">{{item.name}}</div>
                <div class="time">耗时约{{item.time}}分钟</div>
                <div class="level">{{level(item.level)}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import bus from './evetbus.js';
    export default {
        props: ['musiclist'],
        methods: {
            level(index) {
                if (index == 0) {
                    return '初级'
                } else {
                    return '中级'
                }
            },
            play(index) {
                this.playindex = index;
                bus.$emit('playing',this.musiclist[index])
            }
        },
        data() {
            return {
                playindex: -1,
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
                width: 16.8rem;
                height: 100%;
                padding-left: 2rem;
                position: absolute;
                top: 0;
                left: 2rem;
                box-sizing: border-box;
                border-bottom: 1px solid rgba(245, 245, 245, 1);
                .title {
                    font-size: 0.75rem;
                    font-family: 'PingFangSC-Regular';
                    color: rgba(51, 51, 51, 1);
                    position: absolute;
                    top: 0.4rem;
                    left: 0;
                    font-weight: 500;
                }
                .time {
                    font-size: 0.6rem;
                    font-family: 'PingFangSC-Regular';
                    color: rgba(153, 153, 153, 1);
                    position: absolute;
                    bottom: 0.4rem;
                    left: 0;
                }
                .level {
                    position: absolute;
                    right: 1rem;
                    height: 0.9rem;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    background: rgba(34, 131, 226, 1);
                    border-radius: 0.2rem;
                    padding: 0 0.2rem;
                    font-size: 0.6rem;
                    font-family: 'PingFangSC-Regular';
                    color: rgba(255, 255, 255, 1);
                }
            }
        }
    }
</style>