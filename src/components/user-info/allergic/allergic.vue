<template>
  <div class="page allergic">
    <div class="body_22">
      <div class="body_221">你是否有过敏史？</div>
      <div class="body_222">
        <el-switch  v-model="allergyHistory">
        </el-switch>
      </div>
    </div>
    <div class="line"></div>
    <div class="choose"  v-show='allergyHistory'>
      <div class="chooseItems">请选择过敏源（可多选）:</div>
      <tagslist :tags='allergylist' :clear='clearAllergyHistory' name='allergy' @choose='chooseAllergy'></tagslist>
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
  .allergic {
  
    .body_22 {
      background: #fff;
      width: 100%;
      padding: 0 0.9rem;
      box-sizing: border-box;
      height: 3.3rem;
      position: relative;
      .body_221 {
        font-size: 0.75rem;
        font-family: PingFangSC-Regular;
        color: rgba(51, 51, 51, 1);
        line-height: 2.3rem;
        padding-top: 0.45rem;
        float: left;
      }
      .body_222 {
        position: absolute;
        right: 0.9rem;
        top: 1rem;
      }
    }
  }
</style>
