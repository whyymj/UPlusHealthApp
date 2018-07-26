<template>
    <div class='playerController'>
        <div id="textaudio1" style="margin-top: 60px"></div>
        <h2>腹式呼吸练习（初级）</h2>
        <div class="control">
            <img src="/static/musicPlayer/left.png" alt="" class='left' @click='back'>
            <img src="/static/musicPlayer/play.png" alt="" class='play' v-if='playing' @click='play'>
            <img src="/static/musicPlayer/pause.png" alt="" class='pause' v-else @click='pause'>
            <img src="/static/musicPlayer/right.png" alt="" class='right' @click='go'>
        </div>
    </div>
</template>

<script>
    import {
        setInterval,
        clearInterval
    } from 'timers';
    export default {
        components: {},
        data() {
            return {
                wxAudio: '',
                playing: true
            }
        },
        methods: {
            play() {
                this.wxAudio.audioPlay();
                this.playing = !this.playing;
            },
            pause() {
                this.wxAudio.audioPause();
                this.playing = !this.playing;
            },
            back() {
                console.log( this.wxAudio);
            },
            go() {}
        },
        mounted() {
            this.wxAudio = new Wxaudio({
                ele: '#textaudio1',
                title: 'Jar Of Love',
                disc: 'Break Me Up',
                src: 'http://jq22.qiniudn.com/ocean_drive_01.mp3',
                width: '320px'
            });
            this.play();
        }
    }
</script>

<style lang='scss'>
    .playerController {
        width: 16rem;
        position: relative;
        margin: auto;
        #textaudio1 {
            .wx-audio-content {
                border: none;
                .wx-audio-left,
                .wx-audio-title,
                .wx-audio-disc {
                    display: none;
                }
            }
            .wx-audio-right {
                width: 95%;
            }
            .wx-audio-origin {
                background: #2283E2;
            }
            .wx-voice-p {
                background: #2283E2;
            }
        }
        h2 {
            text-align: center;
            font-size: 0.8rem;
            font-family: 'PingFangSC-Medium';
            color: rgba(51, 51, 51, 1);
            font-weight: 600;
            margin-top: 1rem;
        }
        .control {
            width: 15rem;
            margin: 2rem auto 0;
            height: 2rem;
            text-align: center;
            img {
                width: 2rem;
                height: 2rem;
            }
            .left {
                float: left;
            }
            .play {
                display: inline-block;
                margin: auto;
            }
            .right {
                float: right;
            }
        }
    }
</style>