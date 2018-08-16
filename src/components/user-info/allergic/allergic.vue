<template>
  <div class="page allergic">
    <div class="line"></div>
    <div class="choose">
      <div class="chooseItems">请选择过敏源（可多选）:</div>
      <tagslist :tags='allergylist' name='allergy' @choose='chooseAllergy'></tagslist>
    </div>
    <footer class="footer">
      <button class="confirm" @click="save">保存</button>
    </footer>
  </div>
</template>

<script type="text/javascript" src="./allergic.js">

</script>

<style lang="scss">
  @import "./allergic.scss";
</style>
