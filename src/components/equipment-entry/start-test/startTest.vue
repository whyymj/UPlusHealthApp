<template>
  <div class="start-test">
    <h-header title="健康检测" class="header-bg"></h-header>

    <!--设备链接终端，自动连接当中.......-->
    <div class="popup-model concat">
      <mt-popup
        v-model="popupVisible">
        <div class="popup-img concat-pad">
          <i class="icon-blue" ></i>
        </div>
        <p class="popup-tip">设备链接终端，自动连接当中......</p>
      </mt-popup>
    </div>

    <!--连接成功.-->
    <div class="popup-model concat">
      <mt-popup
        v-model="popupSuccess">
        <div class="popup-img popup-bg">
          <i class="icon-success popup-size"></i>
        </div>
        <p class="popup-tip">连接成功</p>
      </mt-popup>
    </div>

    <!--连接失败.-->
    <div class="popup-model defeated">
      <mt-popup
        v-model="bluetoothVisible">
        <div class="popup-defeated">
          <p class="defeated-title">连接失败</p>
          <p class="defeated-tip">未找到设备</p>
          <button>开启蓝牙</button>
          <p class="bluetooth-cancel" @click="bluetoothVisible = false"><span>取消</span></p>
        </div>
      </mt-popup>
    </div>

    <div class="container">
      <div class="test-content">
        <div class="test-character">
          <div class="character">
            <img src="" alt="">
          </div>
          <p>姥爷</p>
        </div>
        <div class="test-item">
          <div class="left">
            <div class="logo bg-blue"><span class="icon-pressure"></span></div>
            <p class="item">
              <span>48</span>
              <span>mmHg</span>
            </p>
          </div>
          <div class="right">
            <span>收缩压（高压）</span>
          </div>
        </div>
        <div class="test-item">
          <div class="left">
            <div class="logo bg-red"><span class="icon-pressure"></span></div>
            <p class="item">
              <span>121</span>
              <span>mmHg</span>
            </p>
          </div>
          <div class="right">
            <span>舒张压（低压）</span>
          </div>
        </div>
        <div class="test-item">
          <div class="left">
            <div class="logo bg-blue"><span class="icon-ecg"></span></div>
            <p class="item">
              <span>118</span>
              <span>bmp</span>
            </p>
          </div>
          <div class="right">
            <span>脉率</span>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">
      <button class="generate-report" @click="generateReport()">生成报告</button>
    </footer>
  </div>
</template>

<script type="text/javascript" src="./startTest.js"></script>

<style lang="scss">
  @import "./startTest.scss";
</style>
