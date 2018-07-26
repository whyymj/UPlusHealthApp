<template>
  <div class="page chronicDisease">
    <div class="isChronicDisease">
      <div class="isChronicDisease_text">你是否有慢病史?</div>
      <div class="isChronicDisease_switch">
        <mt-switch :switch-value="chronicDiseaseValue" @change="handleChange">
        </mt-switch>
      </div>
    </div>

    <div class="line"></div>

    <div class="choose">
      <div class="chooseItems">请选择慢病标签（可多选）:</div>
      <div v-for="item in list" :list="list" :key="item.key" :class="item.active?'items_div_active':'items_div'">
        <span :class="item.active?'items_text_active':'items_text'">{{item.name}}</span>
      </div>
    </div>
    <footer class="footer">
      <button class="confirm" @click="save()">{{editText}}</button>
    </footer>
  </div>
</template>

<script type="text/javascript" src="./chronicDisease.js"></script>

<style lang="scss">
  @import "./chronicDisease.scss";
</style>
