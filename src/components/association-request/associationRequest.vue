<template>

  <div class="page associated-request">
    <!-- <h-header title="关联请求"></h-header> -->
    <div class="container white-bg has-footer">
      <div class="space"></div>
      <div class="tip">您需要发送验证申请，等待对方通过</div>
      <div class="send-msg">
        <input type="text" placeholder="请输入" v-model="message">
      </div>
      <div class="select-character clearfix" @click="showCharacter">
        <div class="float-left">亲友关系</div>
        <div class="float-right">
          <span>{{characterValue}}</span><i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="notification">
        <h3>提示</h3>
        <div class="first-text">1.添加亲友后可以查看对方健康数据；</div>
        <div>2.除查看数据外，您无法对亲友进行其他操作；</div>
      </div>
    </div>

    <div class="footer">
      <button class="associated text-center" @click="sendRequest">发送请求</button>
    </div>

    <mt-popup v-model="visible" :closeOnClickModal="true" position="bottom" class="mint-datetime">
      <mt-picker
        :slots="dateSlots"
        @change="onChange"
        value-key="dict_name"
        class="mint-datetime-picker"
        show-toolbar>
        <span class="mint-datetime-action mint-datetime-cancel" @click="visible = false">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">确定</span>
      </mt-picker>
    </mt-popup>
  </div>

</template>

<script type="text/javascript" src="./associationRequest.js"></script>

<style lang="scss" scoped>
  @import "./associationRequest.scss";
</style>
