<template>
  <div class="page choose-page">
    <h-header title="选择设备"></h-header>
    <div class="content">
      <div class="device-img">
        <img v-if="showIndex == 1" src="../../../assets/haire-chamberlain.png" alt="">
        <img v-if="showIndex == 2" src="../../../assets/haire-mobile.png" alt="">
        <img v-if="showIndex == 3" src="../../../assets/haire-pressure-device.png" alt="">
        <img v-if="showIndex == 4" src="../../../assets/haire-body-fat-device.png" alt="">
      </div>
    </div>
    <footer class="footer">
      <button class="add-device" v-on:click="addDevice(showIndex)">开始添加设备</button>
    </footer>
  </div>
</template>

<script type="text/javascript" src="./chooseDevice.js"></script>

<style lang="scss">
  @import "./chooseDevice.scss";
</style>
