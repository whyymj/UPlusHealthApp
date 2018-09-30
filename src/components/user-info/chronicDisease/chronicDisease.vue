<template>
  <div class="page chronicDisease">
    <div class="body_22">
      <div class="body_221" @click='clickChronDiseaseHistory'>你是否有慢病史？</div>
      <div class="body_222">
        <el-switch v-model="chronDiseaseHistory">
        </el-switch>
      </div>
    </div>
    <div class="line"></div>
    <div class="choose" v-show='chronDiseaseHistory'>
      <div class="chooseItems" style='height:3rem;line-height:3rem;'>请选择慢病标签（可多选）:</div>
      <tagslist :tags='chromiclist' name='chromic' :clear='clearChronDiseaseHistory' @choose='chooseChronic'></tagslist>
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
  .chronicDisease {
    .body_22 {
      background: #fff;
      width: 100%;
      padding: 0 0.9rem;
      box-sizing: border-box;
      height: 3.3rem;
      position: relative;
      .body_221 {
        font-size: 0.75rem;
        width:85%;
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
