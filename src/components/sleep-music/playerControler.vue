<template>
    <div class='playerController'>
        <div id="textaudio1" style="margin-top: 60px"></div>
        <h2>{{level}}</h2>
        <div class="control">
            <img src="/static/musicPlayer/left.png" id='backThirtySec' alt="" class='left'>
            <img src="/static/musicPlayer/play.png" alt="" class='play' v-show='playing' id="playSleepMusic">
            <img src="/static/musicPlayer/pause.png" id="pauseSleepMusic" alt="" class='pause' v-show='!playing'>
            <img src="/static/musicPlayer/right.png" id='goThirtySec' alt="" class='right'>
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
                my_media: '',
                mediaTimer: '',
                position: 0,
                timerDur: 0
            }
        },
        methods: {
            $$(id) {
                return document.getElementById(id);
            },
            receivedEvent(src) {
                var that = this;
                this.my_media = null;
                this.mediaTimer = null;
                this.timerDur = null;
                function mediaSuccess() {
                    alert("Media成功")
                }
                function mediaError(err) {
                    alert("Media失败：" + err)
                }
                // 开始或恢复播放一个音频文件
                function playAudio() {
                    alert("进入播放函数")
                    if (!this.my_media) {
                        // 初始化Media对象
                        this.my_media = new Media(src, mediaSuccess, mediaError);
                    }
                    // 播放音频
                    this.my_media.play();
                }
                // 暂停播放音频文件
                function pauseAudio() {
                    if (this.my_media) {
                        this.my_media.pause();
                    }
                }
                // 释放操作系统底层的音频资源。
                function releaseAudio() {
                    if (this.my_media) {
                        this.my_media.release();
                    }
                }
                // 停止播放音频文件
                function stopAudio() {
                    if (this.my_media) {}
                    that.my_media.stop();
                }
                // 返回在音频文件的当前位置。
                function getCurrent() {
                    if (!this.mediaTimer) {
                        this.mediaTimer = setInterval(function() {
                            that.my_media.getCurrentPosition(
                                // success callback
                                function(position) {
                                    if (position > -1) {
                                        that.position = position;
                                        console.log('position', position);
                                    }
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
                    that.timerDur = setInterval(function() {
                        counter = counter + 100;
                        if (counter > 2000) {
                            clearInterval(that.timerDur);
                        }
                        var dur = that.my_media.getDuration();
                        if (dur > 0) {
                            clearInterval(that.timerDur);
                        }
                    }, 100);
                }
                this.$$("playSleepMusic").onclick = function() {
                    console.log('playing')
                    that.playing = true;
                    playAudio();
                }
                this.$$("pauseSleepMusic").onclick = function() {
                    pauseAudio();
                    that.playing = false;
                    console.log('pausing')
                }
                this.$$("goThirtySec").onclick = function() {
                    console.log('go 30')
                    var time = that.position + 30;
                    time = time > that.timerDur ? that.timerDur : time;
                    that.position = time;
                    that.my_media.seekTo(time * 1000);
                }
                this.$$("backThirtySec").onclick = function() {
                    console.log('back 30')
                    var time = that.position - 30;
                    time = time < 0 ? 0 : time;
                    that.position = time;
                    that.my_media.seekTo(time * 1000);
                }
            },
            // play() {
            //     this.wxAudio.audioPlay();
            //     this.playing = !this.playing;
            // },
            // pause() {
            //     this.wxAudio.audioPause();
            //     this.playing = !this.playing;
            // },
            // back() {
            //     var curtime = this.wxAudio.currentT;
            //     curtime = curtime - 30 <= 0 ? 0 : curtime - 30;
            //     this.wxAudio.wxAudio.currentTime = this.wxAudio.currentT = curtime;
            //     this.wxAudio.currentP = curtime / this.wxAudio.durationT;
            //     this.wxAudio.dragProgressTo = this.wxAudio.wxAudioDetail.offsetWidth * this.wxAudio.currentP;
            //     this.wxAudio.wxAudioCurrent.innerText = this.wxAudio.formartTime(this.wxAudio.wxAudio.currentTime);
            //     this.wxAudio.updatePorgress();
            //     this.wxAudio.audioPlay();
            // },
            // go() {
            //     var curtime = this.wxAudio.currentT;
            //     curtime = curtime + 30 >= this.wxAudio.durationT ? this.wxAudio.durationT : curtime + 30;
            //     this.wxAudio.wxAudio.currentTime = this.wxAudio.currentT = curtime;
            //     this.wxAudio.currentP = curtime / this.wxAudio.durationT;
            //     this.wxAudio.dragProgressTo = this.wxAudio.wxAudioDetail.offsetWidth * this.wxAudio.currentP;
            //     this.wxAudio.wxAudioCurrent.innerText = this.wxAudio.formartTime(this.wxAudio.wxAudio.currentTime);
            //     this.wxAudio.updatePorgress();
            //     this.wxAudio.audioPlay();
            // }
        },
        mounted() { //h5实现的方式
            this.params = this.$route.query;
            // console.log(this.params);
            var that = this;
            //初始化音频插件
            this.$nextTick(function() {
                that.receivedEvent(that.params.musicurl||"https://huiai.sleepeazz.com/vod/QinanSleepTraining_01.mp3");
            })
            document.addEventListener('deviceready', function() {
                that.receivedEvent(that.params.musicurl||"https://huiai.sleepeazz.com/vod/QinanSleepTraining_01.mp3")
            }, false);
            // this.wxAudio = new Wxaudio({
            //     ele: '#textaudio1',
            //     title: 'Jar Of Love',
            //     disc: 'Break Me Up',
            //     src: that.params.musicurl,
            //     width: '320px'
            // });
            // this.play();
            // this.audio = this.wxAudio.wxAudio;
            // this.audio.onended = function() {
            //     that.playing = true;
            // }
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