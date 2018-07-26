<template>
  <div class="userInfo">
    <div>
      <div @click="showActionSheet()">
        <mt-cell class="headerImg" title="头像" is-link>
          <img src="#"/>
        </mt-cell>
      </div>
      <div>
        <mt-cell title="昵称" is-link>
          <span>nankeren</span>
        </mt-cell>
      </div>
      <div>
        <mt-cell title="性别" is-link>
          <span>男</span>
        </mt-cell>
      </div>
      <div>
        <mt-cell title="生日" is-link>
          <span>1994年3月30日</span>
        </mt-cell>
      </div>
    </div>
    <div class="div_magin">
      <div>
        <mt-cell title="身高" is-link>
          <span>181cm</span>
        </mt-cell>
      </div>
      <div>
        <mt-cell title="体重" is-link>
          <span>74kg</span>
        </mt-cell>
      </div>
      <div>
        <mt-cell title="目标体重"is-link >
          <span>75kg</span>
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
    <div class="div_magin">
      <mt-cell title="隐私设置" is-link/>
    </div>
    <div>
      <mt-actionsheet
        :actions="headerAction"
        v-model="sheetVisible"
        cancel-text="取消"
      >
      </mt-actionsheet>
    </div>

  </div>
</template>

<script type="text/javascript" src="./userInfo.js"></script>

<style lang="scss">
  @import "./userInfo.scss";
</style>
