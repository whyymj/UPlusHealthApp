<template>
    <div class="sleepCyclopedia">
        <mynav :navigateList='navs' @clickNav='clickNav'></mynav>
        <div class='contentContainer' v-for='(item,index) in contentList' :key='index' v-show='curPage==index'>
            <mylist :list='contentList[index]'></mylist>
        </div>
        <div class="bottom">
            <img src="../../assets/tanhao.png" class="img1" />
            <span class="bottom_1">以上服务由寝安提供</span>
        </div>
    </div>
</template>

<script text="text/javascript" src="./sleepCyclopedia">

</script>
<style lang="scss">
    @import "./sleepCyclopedia.scss";
    .contentContainer{
        position: absolute;
        top:3rem;
        bottom:2rem;
        left:0;
        right:0;
        overflow: auto;
    }
</style>
