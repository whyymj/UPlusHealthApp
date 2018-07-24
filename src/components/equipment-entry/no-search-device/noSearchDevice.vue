<template>
  <div class="page no-search-page">
    <!--未扫描到设备？-->
    <div class="popup-model">
      <mt-popup
        v-model="popupVisible">
        <div class="popup-no-search">
          <p class="no-search-title">未扫描到设备？</p>
          <p class="no-search-tip">请稍等一会儿，蓝牙搜索需要一定时间<br/>请将设备开机，并尽量靠近手机</p>
          <button @click="popupVisible = false">我知道了</button>
        </div>
      </mt-popup>
    </div>

    <!--请开启手机蓝牙.-->
    <div class="popup-model bluetooth">
      <mt-popup
        v-model="bluetoothVisible">
        <div class="popup-bluetooth">
          <div class="bluetooth-flg">
            <div>
              <span class="icon-blue"></span>
            </div>
          </div>
          <p class="bluetooth-title">请开启手机蓝牙</p>
          <button>开启蓝牙</button>
          <p class="bluetooth-cancel" @click="bluetoothVisible = false"><span>取消</span></p>
        </div>
      </mt-popup>
    </div>

    <div class="content white-bg">
      <p class="start-tip">未发现{{deviceName}}</p>
      <p class="start-tip2">请将待绑定设备开机，并靠近手机</p>
      <p class="start-tip2 no-search-color"><a href="#" v-on:click="openTips">未扫描到设备?</a></p>
      <div class="img"><img src="../../../assets/no-find-chamberlain.png" alt=""></div>
      <div class="cancel" @click="cancelSearch">取消</div>
    </div>
    <footer class="footer" v-if="isShow">
      <button class="start-search" v-on:click="startSearchDevice()">重试</button>
    </footer>
  </div>
</template>

<script type="text/javascript" src="./noSearchDevice.js"></script>
<style lang="scss">
  @import "./noSearchDevice.scss";
</style>
