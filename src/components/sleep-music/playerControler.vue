<template>
    <div class='playerController'>
        <div id="textaudio1" style="margin-top: 60px"></div>
        <h2>{{level}}</h2>
        <div class='progressBar'>
            <el-progress :percentage="percent" style='margin-top:2rem;' :show-text=false></el-progress>
            <span class='starttime'>{{getPosition}}</span><span class='endtime'>{{getDurationTime}}</span>
        </div>
        <div class="control">
            <img src="/static/musicPlayer/left.svg" id='backThirtySec' alt="" class='left'>
            <img src="/static/musicPlayer/play.svg" alt="" class='play' v-if='!playing' @click='playAudio' id="playSleepMusic">
            <div id="pauseSleepMusic" alt="" class='pause' @click='pauseAudio' v-else></div>
            <img src="/static/musicPlayer/right.svg" id='goThirtySec' alt="" class='right'>
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
            level() {
                var title = this.params.name;
                var level = '';
                if (this.params.level == 1) {
                    level = '初级'
                } else if (this.params.level == 2) {
                    level = '中级'
                } else if (this.params.level == 3) {
                    level = '高级'
                }else{
                    return title
                }
                return title + "(" + level + ")"
            },
            getPosition() {
                var h = 0,
                    m = 0,
                    str = '',
                    s = 0;
                if (this.position > 0) {
                    var tmp = Math.floor(this.position / 3600);
                    h = this.formatNum(tmp);
                    tmp = Math.floor(this.position % 3600 / 60);
                    m = this.formatNum(tmp);
                    tmp = Math.round(this.position % 3600 % 60);
                    s = this.formatNum(tmp);
                    str = ((h == '00') ? '' : (h + ':')) + m + ':' + s;
                    return str;
                } else {
                    return '00:00:00';
                }
            },
            getDurationTime() {
                var h = 0,
                    m = 0,
                    str = '',
                    s = 0;
                if (this.duration * 1 > 0) {
                    var tmp = Math.floor(this.duration / 3600);
                    h = this.formatNum(tmp);
                    tmp = Math.floor(this.duration % 3600 / 60);
                    m = this.formatNum(tmp);
                    tmp = this.duration % 3600 % 60;
                    s = this.formatNum(tmp);
                    str = '' + ((h == '00') ? '' : (h + ':')) + m + ':' + s;
                    return str;
                } else {
                    return '00:00:00';
                }
            },
            percent() {
                return Math.round(this.position / (this.duration || 1) * 100)
            }
        },
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
                duration: 0,
                loadingmodal: '',
                audioSrc: '',
            }
        },
        methods: {
            formatNum(num) {
                if (num > 0) {
                    return num > 9 ? ('' + Math.round(num)) : ('0' + Math.round(num));
                } else {
                    return '00';
                }
            },
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
                                    if (position > 0) {
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
                    that.timerDur = setInterval(function() {
                        that.duration = Math.round(that.my_media.getDuration());
                    }, 1000);
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
                    if (that.duration > 0) {
                        time = time > that.duration ? that.duration : time;
                        that.position = time;
                        that.my_media.seekTo(time * 1000);
                    }
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
            clearInterval(this.mediaTimer);
            clearInterval(this.timerDur);
        },
        mounted() { //h5实现的方式
            this.params = this.$route.query;
            var that = this;
            //初始化音频插件
            that.audioSrc = that.params.musicurl;
            document.addEventListener('deviceready', function() {
                that.receivedEvent(that.params.musicurl)
            }, false);
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
            #pauseSleepMusic {
                width: 2rem;
                height: 2rem;
                display: inline-block;
                position: relative;
                &:after,
                &:before {
                    position: absolute;
                    background: #2283E2;
                    width: 4px;
                    border-radius: 3px;
                    display: block;
                    height: 75%;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    content: '';
                    box-shadow: 0 0 1px #ddd;
                }
                &:after {
                    left: 24%;
                }
                &::before {
                    right: 24%;
                }
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