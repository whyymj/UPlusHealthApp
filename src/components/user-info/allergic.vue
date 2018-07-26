<template>
  <div class="allergic">
    <div class="isAllergic">
      <div class="isAllergic_text">你是否有过敏史?</div>
      <div class="isAllergic_switch">
        <mt-switch v-model="value1" @change="handleChange">
        </mt-switch>
      </div>
    </div>

    <div class="line"></div>

    <div class="choose">
      <div class="chooseItems">请选择过敏源（可多选）:</div>
      <div class="items_div">

      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./allergic.js"></script>

<style lang="scss">
  @import "./allergic.scss";
</style>
