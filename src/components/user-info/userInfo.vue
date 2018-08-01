<template>
  <div class="userInfo">
    <div>
      <div @click="showActionSheet()">
        <mt-cell class="headerImg" title="头像" is-link>
          <img id="img" src="#"/>
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
        <mt-cell title="目标体重" is-link >
          <span>{{targetWeightValue}}</span>
        </mt-cell>
      </div>
    </div>
    <div class="div_magin">
      <mt-cell title="过敏史" is-link :to="{ name: 'allergic' }">
        <span>未设置</span>
      </mt-cell>
      <mt-cell title="慢病史" is-link :to="{ name: 'chronicDisease' }">
        <span>无</span>
      </mt-cell>
    </div>
    <!-- <div class="div_magin">
      <mt-cell title="隐私设置" is-link/>
    </div> -->

    <!--上传头像-->
    <div>
      <mt-actionsheet
        :actions="headerAction"
        v-model="sheetVisible"
        cancel-text="取消"
      >
      </mt-actionsheet>
    </div>

    <!--修改昵称-->
    <div>

    </div>

    <!-- 日期选择 -->
    <div @touchmove.prevent>
      <mt-datetime-picker
        ref="pickerBD"
        type="date"
        v-model="defaultBirthday"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :startDate="startDate"
        :endDate="endDate"
        @confirm="handleChangeBD">
      </mt-datetime-picker>
    </div>
    <!-- 身高体重性别 -->
    <div @touchmove.prevent>
      <mt-popup v-model="pickerVisible" :closeOnClickModal="true" position="bottom" class="mint-datetime">
        <mt-picker
          :slots="dateSlots"
          @change="onChange"
          value-key="dict_name"
          class="mint-datetime-picker"
          show-toolbar>
          <span class="mint-datetime-action mint-datetime-cancel" @click="pickerVisible = false">取消</span>
          <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">确定</span>
        </mt-picker>
      </mt-popup>
    </div>

  </div>
</template>

<script type="text/javascript" src="./userInfo.js"></script>

<style lang="scss">
  @import "./userInfo.scss";
</style>
