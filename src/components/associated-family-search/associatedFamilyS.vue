<template>

  <div class="page associated-family-s">
    <!-- <h-header title="关联家人"></h-header> -->
    <div class="container white-bg has-footer">
      <div class="space"></div>
      <div class="search-bar">
        <input type="number" v-model="phone">
        <div class="search-btn text-center" @click="searchFamily">
          <i class="fa fa-search"></i>
        </div>
      </div>
      <div class="description">
        <h3>功能提示</h3>
        <div class="first-text">1，添加友情账号，数据远超实时查看；</div>
        <div>2，关爱提醒，实时关爱亲友健康；</div>
      </div>
    </div>
  </div>

</template>

<script type="text/javascript" src="./associatedFamilyS.js"></script>

<style lang="scss">
  @import "./associatedFamilyS.scss";
</style>
