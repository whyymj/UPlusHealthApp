<template>

  <div class="page associated-family-r">
    <!-- <h-header title="关联家人"></h-header> -->
    <div class="container has-footer">
      <div class="space"></div>
      <div class="results text-center">
        <img :src="head_img" alt="head image">
        <div class="message">
          <span class="name">{{name}}</span>
          <span class="phone">({{phone}})</span>
        </div>
      </div>
    </div>

    <div class="footer">
      <button class="associated text-center" @click="associated">关联</button>
      <!--<button class="associated text-center added">已添加</button>-->
      <!--<button class="associated text-center added">等待验证</button>-->
    </div>
  </div>

</template>

<script type="text/javascript" src="./associatedFamilyR.js"></script>

<style lang="scss">
  @import "./associatedFamilyR.scss";
</style>
