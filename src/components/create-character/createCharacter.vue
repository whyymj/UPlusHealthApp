<template>

  <div class="page create-character">
    <!-- <h-header title="健康档案" :showBack="false"></h-header> -->
    <div class="container white-bg has-footer">
      <div class="character-head">
      	<div class="character-item"><img :src="maleImg.src" alt="" @click="switchCharacter(0)"></div>
      	<div class="character-item"><img :src="femaleImg.src" alt="" @click="switchCharacter(1)"></div>
      </div>
      <!--创建家人时需要-->
      <!--<div class="character-head text-center">-->
        <!--<img src="../../assets/create-family.png" alt="">-->
      <!--</div>-->
      <!---->
      <div class="character-form">
        <div class="form-group">
          <label>
            <span>生日</span>
            <input type="text"
                   readonly
                   unselectable="on"
                   onfocus="this.blur()"
                   placeholder="请选择"
                   v-model="birthDayValue"
                   @click="openBirthDay('pickerBD')">
            <i class="fa fa-caret-down"></i>
          </label>
        </div>
        <div class="form-group">
          <label>
            <span>身高</span>
            <input type="text"
                   readonly
                   unselectable="on"
                   onfocus="this.blur()"
                   placeholder="请选择"
                   v-model="heightValue"
                   @click="openPicker(1)">
            <i class="fa fa-caret-down"></i>
          </label>
        </div>
        <div class="form-group">
          <label>
            <span>体重</span>
            <input type="text"
                   readonly
                   unselectable="on"
                   onfocus="this.blur()"
                   placeholder="请选择"
                   v-model="weightValue"
                   @click="openPicker(2)">
            <i class="fa fa-caret-down"></i>
          </label>
        </div>
        <!--创建家人时需要-->
        <!--<div class="form-group">-->
          <!--<label>-->
            <!--<span>家人关系</span>-->
            <!--<input type="text"-->
                   <!--readonly-->
                   <!--unselectable="on"-->
                   <!--onfocus="this.blur()"-->
                   <!--placeholder="请选择"-->
                   <!--v-model="relationshipValue"-->
                   <!--@click="openPicker(3)">-->
            <!--<i class="fa fa-caret-down"></i>-->
          <!--</label>-->
        <!--</div>-->
        <!---->
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
        
        <div @touchmove.prevent>
          <mt-popup v-model="visible" :closeOnClickModal="true" position="bottom" class="mint-datetime">
            <mt-picker
              :slots="dateSlots"
              @change="onChange"
              value-key="dict_name"
              class="mint-datetime-picker"
              show-toolbar>
              <span class="mint-datetime-action mint-datetime-cancel" @click="visible = false">取消</span>
              <span class="mint-datetime-action mint-datetime-confirm" @click="confirm()">确定</span>
            </mt-picker>
          </mt-popup>
        </div>

        <div class="popup-model">
          <mt-popup
            v-model="popupVisible"
            :closeOnClickModal="false">
            <div class="popup-icon"><i :class="[icon, {'failed': createFailed}]"></i></div>
            <div class="popup-title">{{title}}</div>
            <div class="popup-msg">{{msg}}</div>
            <div class="popup-btn">
              <button class="default-btn" @click="closePopup">知道了</button>
            </div>
          </mt-popup>
        </div>

      </div>
    </div>

    <div class="footer">
      <button class="cancel text-center" @click="cancelCreate">取消</button>
      <button class="confirm text-center" @click="createProfile()">确定</button>
    </div>
    <div class="mask-layer"></div>
  </div>

</template>

<script type="text/javascript" src="./createCharacter.js"></script>

<style lang="scss">
  @import "./createCharacter.scss";
</style>
