<template>
    <div class='playerController'>
        <div id="textaudio1" style="margin-top: 60px"></div>
        <img src="/static/musicPlayer/bigImg.jpg" alt="" class='bigImg'>
        <div class='progressBar'>
            <el-progress :percentage="percent" style='margin-top:2rem;' :show-text=false></el-progress>
            <span class='starttime'>{{getPosition}}</span><span class='endtime'>{{getDurationTime}}</span>
        </div>
        <div class="control">
            <img src="/static/musicPlayer/left.png" id='backThirtySec' alt="" class='left'>
            <img src="/static/musicPlayer/play.png" alt="" class='play' v-if='!playing' @click='playAudio' id="playSleepMusic">
            <img src="/static/musicPlayer/pause.png" id="pauseSleepMusic" alt="" class='pause' @click='pauseAudio' v-else>
            <img src="/static/musicPlayer/right.png" id='goThirtySec' alt="" class='right'>
        </div>
    </div>
</template>

<script>
    import {
        setInterval,
        clearInterval,
        setTimeout
    } from 'timers';
    import {
        Loading
    } from 'element-ui';
    export default {
        components: {
            Loading
        },
        computed: {
            getPosition() {
                var h = 0,
                    m = 0,
                    str = '',
                    s = 0;
                h = Math.floor(this.position / 3600) > 9 ? Math.floor(this.position / 3600) : ('0' + Math.floor(this.position / 3600));
                m = Math.floor(this.position % 3600 / 60) > 9 ? Math.floor(this.position % 3600 / 60) : ('0' + Math.floor(this.position % 3600 / 60));
                s = Math.round(this.position % 3600 % 60);
                s = s > 9 ? s : ('0' + s);
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
        data() {
            return {
                playing: true,
                audio: '',
                params: '',
                my_media: '',
                mediaTimer: '',
                position: 0,
                timerDur: 0,
                duration: 0,
                loadingmodal: '',
                audioSrc: ''
            }
        },
        methods: {
            $$(id) {
                return document.getElementById(id);
            },
            playAudio() {
                this.playing = true;
                var that = this;
                if (!that.my_media) {
                    // 初始化Media对象
                    that.my_media = new Media(that.audioSrc, function() {}, function() {});
                }
                // 播放音频
                if (that.my_media && that.my_media.play) {
                    that.my_media.play();
                }
            },
            pauseAudio() {
                var that = this;
                if (that.my_media) {
                    that.my_media.pause();
                }
                that.playing = false;
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
                    if (that.my_media && that.my_media.play) {
                        that.my_media.play();
                        that.playing = true;
                    }
                }
                // 暂停播放音频文件
                function pauseAudio() {
                    if (that.my_media && that.my_media.pause) {
                        that.my_media.pause();
                        that.playing = false;
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
                                        that.loadingmodal.close()
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
                // this.$$("playSleepMusic").onclick = function() {
                //     that.playing = !that.playing;
                //     playAudio();
                //     getDuration();
                // }
                // this.$$("pauseSleepMusic").onclick = function() {
                //     pauseAudio();
                //     that.playing = !that.playing;
                // }
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
        },
        beforeDestroy() {
            this.my_media.stop();
            this.my_media.release();
        },
        props: ['musicparams'],
        watch: {
            musicparams() {
                if (this.my_media) {
                    this.my_media.stop();
                    this.my_media.release();
                }
                this.params = this.musicparams;
                var that = this;
                //初始化音频插件
                that.audioSrc = that.params.musicurl;
                if (typeof that.audioSrc == 'string' && that.audioSrc !== '') {
                    this.$nextTick(function() {
                        that.receivedEvent(that.params.musicurl)
                    })
                }
            }
        },
        mounted() { //h5实现的方式
            this.params = this.musicparams;
            var that = this;
            //初始化音频插件
            that.audioSrc = that.params.musicurl;
            if (typeof that.audioSrc == 'string' && that.audioSrc !== '') {
                document.addEventListener('deviceready', function() {
                    that.receivedEvent(that.params.musicurl)
                }, false);
            }
            this.loadingmodal = Loading.service({
                fullscreen: true,
                background: 'rgba(0, 0, 0, 0.7)',
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
            });
            setTimeout(function() {
                that.loadingmodal.close();
            }, 10000)
        }
    }
</script>

<style lang='scss'>
    .playerController {
        width: 16rem;
        position: relative;
        margin: auto;
        .bigImg {
            width: 15rem;
            height: 15rem;
            margin: 2rem auto 1rem;
            display: block;
            box-shadow: 0.3rem 0.3rem 2rem #bbb;
        }
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