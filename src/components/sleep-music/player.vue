<template>
    <div class='player'>
        <mt-progress :value="progress" :bar-height="barHeight"></mt-progress>
        <img :src="willPlay.imgurl" alt="" class="img1">
        <h3>{{willPlay.name}}</h3>
        <h4>剩余{{willPlay.time}}</h4>
        <img src="/static/sleepMusicList/img2.png" alt="" class="img2" v-if='pausemusic' @click='pause'>
        <img src="/static/sleepMusicList/img4.png" alt="" class="img2" v-else='pausemusic' @click='pause'>
    </div>
</template>

<script>
    import bus from './evetbus.js';
    export default {
        data() {
            return {
                barHeight: 0,
                progress: 0,
                lefttime: 0,
                pausemusic: true,
                willPlay: {
                    name: '',
                    time: 0,
                    imgurl: ''
                }
            }
        },
        computed: {
            timer() {}
        },
        methods: {
            pause() {
                this.pausemusic = !this.pausemusic;
            },
            timeFormat(second) {},
            isPlaying(data) {
                this.progress = 0;
                this.willPlay = data;
                this.lefttime = data.time
            }
        },
        mounted() {
            bus.$on('playing', this.isPlaying);
            const html = document.getElementsByTagName('html')[0];
            const w = document.documentElement.clientWidth || document.body.clientWidth;
            this.barHeight = (w / 375) * 20 * 3 - 2;
        }
    }
</script>

<style lang='scss'>
    .player {
        width: 100%;
        height: 3rem;
        padding: 14px 0;
        box-sizing: border-box;
        border-top: 1px solid rgba(245, 245, 245, 1);
        border-bottom: 1px solid rgba(245, 245, 245, 1);
        position: relative;
        .mt-progress-runway {
            background: rgba(0, 0, 0, 0);
        }
        .mt-progress-progress {
            background: #2282E3;
            opacity: 0.16;
        }
        .img1 {
            width: 1.5rem;
            height: 1.5rem;
            position: absolute;
            top: 0;
            left: 0.3rem;
            bottom: 0;
            margin: auto;
        }
        h3 {
            position: absolute;
            font-size: 0.65rem;
            font-family: 'PingFangSC-Regular';
            color: rgba(51, 51, 51, 1);
            top: 0.6rem;
            left: 2rem;
        }
        h4 {
            position: absolute;
            font-size: 0.5rem;
            font-family: PingFangSC-Regular;
            color: rgba(153, 153, 153, 1);
            bottom: 0.6rem;
            left: 2rem;
        }
        .img2 {
            width: 1.7rem;
            height: 1.7rem;
            position: absolute;
            top: 0;
            right: 1rem;
            bottom: 0;
            margin: auto;
        }
    }
</style>