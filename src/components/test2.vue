<template>
  <div>

    音频测试：
    <div>
      <div style="margin-top: 30px">
        <button type="button" id="play" style="margin-left: 20px">播放</button>
        <button type="button" id="pause">暂定</button>
        <button type="button" id="release">停止</button>
        <button type="button" id="stop">释放</button>
      </div>

    </div>
    <audio id="audio_id" preload="none" crossorigin="anonumous"
           src="https://huiai.sleepeazz.com/vod/QinanSleepTraining_02.mp3">
    </audio>
    <div id="audio_current"></div>
    <div id="audio_duration"></div>
  </div>
</template>

<script>
  export default {
    name: "test1",
    data() {
      return {
        app: {
          initialize: function () {
            alert("进入initialize")
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
          },

          onDeviceReady: function () {
            alert("进入deviceReady")
            this.receivedEvent();
          },
          $$: function (id) {
            return document.getElementById(id);
          },
          receivedEvent: function () {
            var src = document.getElementById("audio_id").src;
            var my_media = null;
            var mediaTimer = null;
            var timerDur = null;

            function mediaSuccess() {
              alert("Media成功")
            }

            function mediaError(err) {
              alert("Media失败："+err)
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
              if (my_media) {

              }
              my_media.stop();
              // 清除定时器对象
              clearInterval(mediaTimer);
              mediaTimer = null;
            }

            // 返回在音频文件的当前位置。
            function getCurrent() {
              if (mediaTimer == null) {
                mediaTimer = setInterval(function () {
                  my_media.getCurrentPosition(
                    // success callback
                    function (position) {
                      if (position > -1) {
                        alert((position) + " sec");
                      }
                      document.getElementById('audio_current').innerHTML = position;
                    },
                    // error callback
                    function (e) {
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
              var timerDur = setInterval(function () {
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

            this.$$("play").onclick = function () {
              playAudio();
              getCurrent();
              getDuration();
            }
            this.$$("pause").onclick = function () {
              pauseAudio();
            }
            this.$$("release").onclick = function () {
              releaseAudio();
            }
            this.$$("stop").onclick = function () {
              stopAudio();
            }

          }

        }

      }
    },
    methods: {},
    created() {
      //初始化音频插件
      this.app.initialize();
      
    }

  }
</script>
