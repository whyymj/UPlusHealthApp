<template>
  <div class="page chronicDisease">
   
    <div class="line"></div>
    <div class="choose">
      <div class="chooseItems" style='height:3rem;line-height:3rem;'>请选择慢病标签（可多选）:</div>
      <tagslist :tags='chromiclist' name='chromic' @choose='chooseChronic'  ></tagslist>
    </div>
    <footer class="footer">
      <button class="confirm" @click="save()">{{editText}}</button>
    </footer>
  </div>
</template>

<script type="text/javascript" src="./chronicDisease.js">

</script>

<style lang="scss">
  @import "./chronicDisease.scss";
</style>
