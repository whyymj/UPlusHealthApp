<template>
  <div>
    音频测试：
    <div>
      <button type="button" id="play">播放</button>
      <button type="button" id="pause">暂定</button>
      <button type="button" id="release">停止</button>
      <button type="button" id="stop">释放</button>
    </div>

    <div id="audio_current"></div>
    <div id="audio_duration"></div>
  </div>
</template>

<script>
  export default {
    name: "test1",
    data() {
      return {
        app : {
          initialize: function() {
            console.log('init>>');
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
          },

          onDeviceReady: function() {
            console.log('has ready')
            this.receivedEvent();
          },
          $$: function(id) {
            return document.getElementById(id);
          },
          receivedEvent: function() {
            var src = "http://ws.stream.qqmusic.qq.com/C1000031Ecjg1tdNzL.m4a?fromtag=38";
            var my_media = null;
            var mediaTimer = null;
            var timerDur = null;

            function mediaSuccess() {
              console.log("Media成功")
            }

            function mediaError(err) {
              console.log("Media失败")
            }

            // 开始或恢复播放一个音频文件
            function playAudio() {
              if(my_media == null) {
                // 初始化Media对象
                my_media = new Media(src, mediaSuccess, mediaError);
              }
              // 播放音频
              my_media.play();
            }

            // 暂停播放音频文件
            function pauseAudio() {
              if(my_media) {
                my_media.pause();
              }
              // 清除定时器对象
              clearInterval(mediaTimer);
              mediaTimer = null;
            }

            // 释放操作系统底层的音频资源。
            function releaseAudio() {
              if(my_media) {
                my_media.release();
              }

            }

            // 停止播放音频文件
            function stopAudio() {
              if(my_media) {

              }my_media.stop();
              // 清除定时器对象
              clearInterval(mediaTimer);
              mediaTimer = null;
            }

            // 返回在音频文件的当前位置。
            function getCurrent() {
              if(mediaTimer == null){
                mediaTimer = setInterval(function() {
                  my_media.getCurrentPosition(
                    // success callback
                    function(position) {
                      if(position > -1) {
                        console.log((position) + " sec");
                      }
                      document.getElementById('audio_current').innerHTML = position;
                    },
                    // error callback
                    function(e) {
                      console.log("Error getting pos=" + e);
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
                if(counter > 2000) {
                  clearInterval(timerDur);
                }
                var dur = my_media.getDuration();
                if(dur > 0) {
                  clearInterval(timerDur);
                  document.getElementById('audio_duration').innerHTML = (dur) + " sec";
                }
              }, 100);
            }
            this.$$("play").onclick = function() {
              debugger;
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

    },
    mounted() {
      //初始化音频插件
      this.app.initialize();
    }

  }
</script>
