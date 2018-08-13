<template>
    <div class='playerController'>
        <div id="textaudio1" style="margin-top: 60px"></div>
        <h2>{{level}}</h2>
        <div class="control">
            <img src="/static/musicPlayer/left.png" alt="" class='left' @click='back'>
            <img src="/static/musicPlayer/play.png" alt="" class='play' v-if='playing' @click='play' id="play">
            <img src="/static/musicPlayer/pause.png" id="pause" alt="" class='pause' v-else @click='pause'>
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
        computed: {
            level() {
                var title = this.params.name;
                var level = '';
                if (this.params.level == 1) {
                    level = '初级'
                } else if (this.params.level == 2) {
                    level = '中级'
                } else if (this.params.level == 3) {
                    level = '高级'
                }
                return title + "(" + level + ")"
            }
        },
        props: ['music'],
        data() {
            return {
                wxAudio: '',
                playing: true,
                audio: '',
                params: '',
                app: {
                    initialize: function() {
                        alert("进入initialize")
                        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
                    },
                    onDeviceReady: function() {
                        alert("进入deviceReady")
                        this.receivedEvent();
                    },
                    $$: function(id) {
                        return document.getElementById(id);
                    },
                    receivedEvent: function() {
                        var src = document.getElementById("audio_id").src;
                        var my_media = null;
                        var mediaTimer = null;
                        var timerDur = null;
                        function mediaSuccess() {
                            alert("Media成功")
                        }
                        function mediaError(err) {
                            alert("Media失败：" + err)
                        }
                        // 开始或恢复播放一个音频文件
                        function playAudio() {
                            alert("进入播放函数")
                            if (my_media == null) {
                                // 初始化Media对象
                                alert("playAudio函数中audio的src:" + document.getElementById("audio_id").src)
                                my_media = new Media(document.getElementById("audio_id").src, mediaSuccess, mediaError);
                            }
                            // 播放音频
                            alert("即将播放")
                            my_media.play();
                        }
                        // 暂停播放音频文件
                        function pauseAudio() {
                            if (my_media) {
                                my_media.pause();
                            }
                            // 清除定时器对象
                            clearInterval(mediaTimer);
                            mediaTimer = null;
                        }
                        // 释放操作系统底层的音频资源。
                        function releaseAudio() {
                            if (my_media) {
                                my_media.release();
                            }
                        }
                        // 停止播放音频文件
                        function stopAudio() {
                            if (my_media) {}
                            my_media.stop();
                            // 清除定时器对象
                            clearInterval(mediaTimer);
                            mediaTimer = null;
                        }
                        // 返回在音频文件的当前位置。
                        function getCurrent() {
                            if (mediaTimer == null) {
                                mediaTimer = setInterval(function() {
                                    my_media.getCurrentPosition(
                                        // success callback
                                        function(position) {
                                            if (position > -1) {
                                                alert((position) + " sec");
                                            }
                                            document.getElementById('audio_current').innerHTML = position;
                                        },
                                        // error callback
                                        function(e) {
                                            alert("getCurrent方法：Error getting pos=" + e);
                                        }
                                    );
                                }, 1000);
                            }
                        }
                        // 返回一个音频文件的持续时间。
                        function getDuration() {
                            // Get duration
                            var counter = 0;
                            var timerDur = setInterval(function() {
                                counter = counter + 100;
                                if (counter > 2000) {
                                    clearInterval(timerDur);
                                }
                                var dur = my_media.getDuration();
                                if (dur > 0) {
                                    clearInterval(timerDur);
                                    document.getElementById('audio_duration').innerHTML = (dur) + " sec";
                                }
                            }, 100);
                        }
                        this.$$("play").onclick = function() {
                            playAudio();
                            getCurrent();
                            getDuration();
                        }
                        this.$$("pause").onclick = function() {
                            pauseAudio();
                        }
                        this.$$("release").onclick = function() {
                            releaseAudio();
                        }
                        this.$$("stop").onclick = function() {
                            stopAudio();
                        }
                    }
                }
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
                var curtime = this.wxAudio.currentT;
                curtime = curtime - 30 <= 0 ? 0 : curtime - 30;
                this.wxAudio.wxAudio.currentTime = this.wxAudio.currentT = curtime;
                this.wxAudio.currentP = curtime / this.wxAudio.durationT;
                this.wxAudio.dragProgressTo = this.wxAudio.wxAudioDetail.offsetWidth * this.wxAudio.currentP;
                this.wxAudio.wxAudioCurrent.innerText = this.wxAudio.formartTime(this.wxAudio.wxAudio.currentTime);
                this.wxAudio.updatePorgress();
                this.wxAudio.audioPlay();
            },
            go() {
                var curtime = this.wxAudio.currentT;
                curtime = curtime + 30 >= this.wxAudio.durationT ? this.wxAudio.durationT : curtime + 30;
                this.wxAudio.wxAudio.currentTime = this.wxAudio.currentT = curtime;
                this.wxAudio.currentP = curtime / this.wxAudio.durationT;
                this.wxAudio.dragProgressTo = this.wxAudio.wxAudioDetail.offsetWidth * this.wxAudio.currentP;
                this.wxAudio.wxAudioCurrent.innerText = this.wxAudio.formartTime(this.wxAudio.wxAudio.currentTime);
                this.wxAudio.updatePorgress();
                this.wxAudio.audioPlay();
            }
        },
        mounted() {
            this.params = this.$route.query;
            console.log(this.params);
            var that = this;
            this.wxAudio = new Wxaudio({
                ele: '#textaudio1',
                title: 'Jar Of Love',
                disc: 'Break Me Up',
                src: that.params.musicurl,
                width: '320px'
            });
            this.play();
            this.audio = this.wxAudio.wxAudio;
            this.audio.onended = function() {
                that.playing = true;
            }
            //初始化音频插件
            // this.app.initialize();
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