<template>
  <div class="userInfo">
    <div>
      <!--<div @click="showActionSheet()">-->
      <div>
        <mt-cell class="headerImg" title="头像" is-link :to="{ name: 'headerImg',params:{member_id:'',from:'/userInfo'}}">
          <img id="img" :src="headPic" />
        </mt-cell>
      </div>
      <div @click="showNickName()">
        <mt-cell title="昵称" is-link>
          <span>{{nickName}}</span>
        </mt-cell>
      </div>
      <div @click="openPicker(4)">
        <mt-cell title="性别" is-link>
          <span>{{sex}}</span>
        </mt-cell>
      </div>
      <div @click="openBirthDay('pickerBD')">
        <mt-cell title="生日" is-link>
          <span>{{birthday}}</span>
        </mt-cell>
      </div>
    </div>
    <div class="div_magin">
      <div @click="openPicker(1)">
        <mt-cell title="身高" is-link>
          <span>{{heightValue}}</span>
        </mt-cell>
      </div>
      <div @click="openPicker(2)">
        <mt-cell title="体重" is-link>
          <span>{{weightValue}}</span>
        </mt-cell>
      </div>
      <div @click="openPicker(3)">
        <mt-cell title="目标体重" is-link>
          <span>{{targetWeightValue}}</span>
        </mt-cell>
      </div>
    </div>
    <div class="div_magin">
      <div @click='toAllergy'>
        <mt-cell title="过敏史" is-link>
          <span>{{userallergy}}</span>
        </mt-cell>
      </div>
      <div @click='toDisease'>
        <mt-cell title="慢病史" is-link>
          <span style='overflow:hidden;'>{{userdisease}}</span>
        </mt-cell>
      </div>
    </div>
    <div class="div_magin">
      <mt-cell title="隐私设置" is-link :to="{ name: 'privacySet' }" />
    </div>
    <!--上传头像-->
    <div>
      <mt-actionsheet :actions="headerAction" v-model="sheetVisible" cancel-text="取消">
      </mt-actionsheet>
    </div>
  </div>
</template>

<script type="text/javascript" src="./userInfo.js">

</script>

<style lang="scss">
  @import "./userInfo.scss";
</style>
