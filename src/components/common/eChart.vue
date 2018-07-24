<template>
  <div class="echart-c">
    <div>
      <chart
        :options="options"
        :autoResize="autoResize"></chart>

      <!-- <i class="icon-full-screen" @click="openEchartModel"></i> -->
    </div>

    <!--<el-dialog-->
      <!--:visible.sync="dialogVisible"-->
      <!--width="100%">-->
      <!--<chart-->
        <!--:options="options"-->
        <!--:autoResize="autoResize"></chart>-->

      <!--<i class="icon-full-screen" @click="dialogVisible = false"></i>-->
    <!--</el-dialog>-->

    <div class="echart-model" v-show="popupVisible">
      <chart
        :options="options"
        :autoResize="autoResize"></chart>

      <i class="icon-full-screen" @click="popupVisible = false"></i>
    </div>
    <!--<mt-popup-->
      <!--v-model="popupVisible"-->
      <!--:closeOnClickModal="false">-->
      <!--<chart-->
      <!--:options="options"-->
      <!--:autoResize="autoResize"></chart>-->

      <!--<i class="icon-full-screen" @click="popupVisible = false"></i>-->
    <!--</mt-popup>-->
  </div>
</template>
<script type="text/javascript">

  export default {
    name: 'eChart',
    data() {
      return {
        popupVisible: false
      }
    },
    props: {
      options: {
        type: Object,
        default: {}
      },
      autoResize: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      openEchartModel() {
        this.popupVisible = true;
        setTimeout(function () {
          document.getElementsByClassName('echarts')[1].style.height = 12 + 'rem';
        }, 500);

        document.getElementsByClassName('echart-model')[0].classList.add('screen-orientation');
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import '../../common/css/variable.scss';
  .echart-c {
    position: relative;
    .icon-full-screen {
      position: absolute;
      right: .9rem;
      top: -3rem;
      color: #020202;
      opacity: .2;
      font-size: 1.1rem;
    }
    /*.el-dialog {*/
      /*height: 100%;*/
      /*margin: 0;*/
      /*.el-dialog__header {*/
        /*display: none;*/
      /*}*/
    /*}*/

  }
  .echarts {
    max-width: 100%;
    width: auto;
    height: 200px;
  }
  .echart-model {
    position: fixed;
    top: 7.35rem;
    left: -7.3rem;
    z-index: 1000;
    height: 18.75rem;
    width: 33.35rem;
    padding: 1rem .75rem;
    background-color: #fff;
    .icon-full-screen {
      top: .5rem !important;
      right: 1.5rem;
    }

    &.screen-orientation {
      transform: rotate(90deg);
    }
  }
</style>
