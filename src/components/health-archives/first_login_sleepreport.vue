<template>
    <div class='first_login_sleepreport' v-if='show===true||show==="true"'>
        <img src="/static/sleepMusicList/firstlogin_sleepreport.png" alt="">
        <div class="button" @click='close'></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false
            }
        },
        methods: {
            close() {
                this.show = false;
                this.$emit('firstlogin')
            }
        },
        mounted() {
            this.show = window.localStorage.UPlusApp_firstLogin_sleepReport === undefined || window.localStorage.UPlusApp_firstLogin_sleepReport === "undefined" || window.localStorage.UPlusApp_firstLogin_sleepReport === true || window.localStorage.UPlusApp_firstLogin_sleepReport === "true";
            // window.localStorage.UPlusApp_firstLogin_sleepReport = false; //在首次登录组件里改变
        }
    }
</script>

<style lang='scss' scoped>
    .first_login_sleepreport {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        .button {
            background: rgba(255, 255, 255, 0);
            width: 8rem;
            height: 4rem;
            position: absolute;
            bottom: 1rem;
            left: 50%;
            transform: translate(-50%, 0)
        }
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>