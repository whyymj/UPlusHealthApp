<template>
  <div class="page allergic">
    <div class="isAllergic">
      <div class="isAllergic_text">你是否有过敏史?</div>
      <div class="isAllergic_switch">
        <mt-switch :switch-value="allergicValue" @change="handleChange">
        </mt-switch>
      </div>
    </div>

    <div class="line"></div>

    <div class="choose">
      <div class="chooseItems">请选择过敏源（可多选）:</div>
        <div v-for="item in list" :list="list" :key="item.key" :class="item.active?'items_div_active':'items_div'">
          <span :class="item.active?'items_text_active':'items_text'">{{item.name}}</span>
        </div>
    </div>
    <footer class="footer">
      <button class="confirm" @click="save()">{{editText}}</button>
    </footer>
  </div>
</template>

<script type="text/javascript" src="./allergic.js"></script>

<style lang="scss">
  @import "./allergic.scss";
</style>
