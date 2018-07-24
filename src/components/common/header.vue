<template>
  <header>
    <button v-show="showBack" class="back-btn mintui mintui-back" @click="back">
    </button>
    <h2>{{ this.title }}</h2>
  </header>
</template>
<script type="text/javascript">
export default {
  name: 'h-header',
  props: {
    title: {
      type: String,
      default: ''
    },
    showBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../../common/css/variable.scss';
header {
  height: 2.2rem;
  align-items: center;
  position: fixed;
  width: 100%;
  background: $cardBackgroundColor;
  z-index: 10;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,0.10);
}

.back-btn {
  position: absolute;
  font-size: .8rem;
  padding: .6rem .75rem;
}

h2 {
  text-align: center;
  font-size: .9rem;
  line-height: 2.2rem;
}


</style>
