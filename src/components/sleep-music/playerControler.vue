<template>
    <div class='playerController'>
        <div id="textaudio1" style="margin-top: 60px"></div>
        <h2>{{level}}</h2>
        <div class='progressBar'>
            <el-progress :percentage="percent" style='margin-top:2rem;' :show-text=false></el-progress>
            <span class='starttime'>{{getPosition}}</span><span class='endtime'>{{getDurationTime}}</span>
        </div>
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
            },
            getPosition() {
                var h = 0,
                    m = 0,
                    str = '',
                    s = 0;
                h = Math.floor(this.position / 3600) > 9 ? Math.floor(this.position / 3600) : ('0' + Math.floor(this.position / 3600));
                m = Math.floor(this.position % 3600 / 60) > 9 ? Math.floor(this.position % 3600 / 60) : ('0' + Math.floor(this.position % 3600 / 60));
                s = Math.round((this.position % 3600 % 60 > 9) ? (this.position % 3600 % 60) : ('0' + this.position % 3600 % 60));
                str = '' + ((h == '00') ? '' : (h + ':')) + m + ':' + s
                return str;
            },
            getDurationTime() {
                var h = 0,
                    m = 0,
                    str = '',
                    s = 0;
                h = Math.floor(this.duration / 3600) > 9 ? Math.floor(this.duration / 3600) : ('0' + Math.floor(this.duration / 3600));
                m = Math.floor(this.duration % 3600 / 60) > 9 ? Math.floor(this.duration % 3600 / 60) : ('0' + Math.floor(this.duration % 3600 / 60));
                s = (this.duration % 3600 % 60 > 9) ? (this.duration % 3600 % 60) : ('0' + this.duration % 3600 % 60);
                str = '' + ((h == '00') ? '' : (h + ':')) + m + ':' + s
                return str;
            },
            percent() {
                return Math.round(this.position / (this.duration || 1) * 100)
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
                timerDur: 0,
                duration: 0
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
                function mediaSuccess() {}
                function mediaError(err) {}
                // 开始或恢复播放一个音频文件
                function playAudio() {
                    if (!that.my_media) {
                        // 初始化Media对象
                        that.my_media = new Media(src, mediaSuccess, mediaError);
                    }
                    // 播放音频
                    that.my_media.play();
                }
                // 暂停播放音频文件
                function pauseAudio() {
                    if (that.my_media) {
                        that.my_media.pause();
                    }
                }
                // 返回在音频文件的当前位置。
                function getCurrent() {
                    if (!that.mediaTimer) {
                        that.mediaTimer = setInterval(function() {
                            that.my_media.getCurrentPosition(
                                // success callback
                                function(position) {
                                    if (position > -1) {
                                        that.position = Math.round(position);
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
                        that.duration = Math.round(that.my_media.getDuration());
                        if (that.duration > 0) {
                            clearInterval(that.timerDur);
                        }
                    }, 100);
                }
                this.$$("playSleepMusic").onclick = function() {
                    that.playing = !that.playing;
                    playAudio();
                    getDuration();
                }
                this.$$("pauseSleepMusic").onclick = function() {
                    pauseAudio();
                    that.playing = !that.playing;
                }
                this.$$("goThirtySec").onclick = function() {
                    var time = that.position + 30;
                    time = time > that.duration ? that.duration : time;
                    that.position = time;
                    that.my_media.seekTo(time * 1000);
                }

                this.$$("backThirtySec").onclick = function() {
                    var time = that.position - 30;
                    time = time < 0 ? 0.001 : time;
                    that.position = time;
                    that.my_media.seekTo(time * 1000);
                    
                }
                playAudio();
                getDuration();
                getCurrent();
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
        beforeDestroy() {
            this.my_media.stop();
            this.my_media.release();
        },
        mounted() { //h5实现的方式
            this.params = this.$route.query;
            var that = this;
            //初始化音频插件
            this.$nextTick(function() {
                that.receivedEvent(that.params.musicurl || "https://huiai.sleepeazz.com/vod/QinanSleepTraining_01.mp3");
            })
            document.addEventListener('deviceready', function() {
                that.receivedEvent(that.params.musicurl || "https://huiai.sleepeazz.com/vod/QinanSleepTraining_01.mp3")
            }, false);
        }
    }
</script>

<style lang='scss'>
    .playerController {
        width: 16rem;
        position: relative;
        margin: auto;
        .progressBar {
            position: relative;
            width: 100%;
            span {
                font-size: 0.5rem;
                font-family: 'PingFangSC-Regular';
                color: rgba(102, 102, 102, 1);
            }
        }
        .starttime {
            float: left;
        }
        .endtime {
            float: right;
        }
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