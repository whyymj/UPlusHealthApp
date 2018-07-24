<template>
  <div class="device-type">
    <h-header title="选择设备"></h-header>
    <div class="container">
      <div class="device-content">
        <div class="device-item" @click="deviceChoose(1)">
          <div class="left">
            <div class="logo"><span class="icon-health-housekeeper"></span></div>
            <span class="item">健康小管家</span>
          </div>
          <div class="right">
            <i class="icon-caret-right"></i>
          </div>
        </div>
        <div class="device-item" @click="deviceChoose(2)">
          <div class="left">
            <div class="logo"><span class="icon-haier-mobile-terminal"></span></div>
            <span class="item">海尔医疗移动终端</span>
          </div>
          <div class="right">
            <i class="icon-caret-right"></i>
          </div>
        </div>
        <div class="device-item" @click="deviceChoose(3)">
          <div class="left" >
            <div class="logo"><span class="icon-pressure-device"></span></div>
            <span class="item">海尔BPM血压测量器</span>
          </div>
          <div class="right">
            <i class="icon-caret-right"></i>
          </div>
        </div>
        <div class="device-item" @click="deviceChoose(4)">
          <div class="left">
            <div class="logo"><span class="icon-body-fat"></span></div>
            <span class="item">海尔体脂称</span>
          </div>
          <div class="right">
            <i class="icon-caret-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./deviceType.js"></script>

<style lang="scss">
  @import "./deviceType.scss";
</style>
