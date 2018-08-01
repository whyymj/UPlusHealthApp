<template>
  <div>
    <input>

    <footer class="footer">
      <button class="confirm" @click="save()">{{editText}}</button>
    </footer>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        nickName:"",
      }
    },
    props:{
      nickName:{

      }
    }
  }
</script>

<style lang="scss">
  @import "./userInfo.scss";
</style>
