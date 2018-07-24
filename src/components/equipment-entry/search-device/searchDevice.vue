<template>
  <div class="page search-device-page">
    <h-header title="选择设备" v-if="isHeaderShow"></h-header>

    <!--正在与设备进行连接.-->
    <div class="popup-model concat">
      <mt-popup
        v-model="popupVisible">
        <div class="popup-img concat-pad">
          <i class="icon-blue" ></i>
        </div>
        <p class="popup-tip">正在与设备进行连接......</p>
      </mt-popup>
    </div>

    <!--连接成功.-->
    <div class="popup-model concat">
      <mt-popup
        v-model="linkSuccessful">
          <div class="popup-img popup-bg">
            <i class="icon-success popup-size"></i>
          </div>
          <p class="popup-tip">连接成功</p>
      </mt-popup>
    </div>

    <div class="content white-bg">
      <p class="start-tip">{{searchTitle}}</p>
      <p class="start-tip2">请将待绑定设备开机，并靠近手机</p>
      <!--海尔BPM血压测量器-->
      <img v-if="showIndex == 3" src="../../../assets/hair-bpm-pressure.gif" alt="">
      <!--海尔医疗移动终端-->
      <img v-if="showIndex == 2" src="../../../assets/hair-medical-mobile.gif" alt="">
      <!--海尔健康小管家-->
      <img v-if="showIndex == 1" src="../../../assets/hair-chamberlain.gif" alt="">
      <!--海尔体脂秤-->
      <img v-if="showIndex == 4" src="../../../assets/hair-body-fat.gif" alt="">
      <div class="cancel" @click="cancelSearch">取消</div>
    </div>
    <footer class="footer" v-if="isShow">
      <button class="start-search" v-on:click="startSearchDevice()">开始搜索</button>
      <!--搜索出现异常 跳转到no-search-device-->
    </footer>
  </div>
</template>

<script type="text/javascript" src="./searchDevice.js"></script>
<style lang="scss">
  @import "./searchDevice.scss";
</style>
