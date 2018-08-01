<template>
    <div class="errorMessage">
        <div class="top">
            <img class='error' src="/static/errorpage/error.png" alt="">
        </div>
        <div class="body_1">遇到问题了......</div>
        <div class="body_2">很努力也没有加载出来呢，等下再尝试吧</div>
        <!-- <div class="bottom">刷新</div> -->
    </div>
</template>
<style lang="scss">
   @import "./errorMessage.scss";
   .error{
       width:16rem;
       height:13rem;
       position: absolute;
       top:0;
       bottom: 0;
       left:0;right:0;
       margin:auto;
   }
 </style>
