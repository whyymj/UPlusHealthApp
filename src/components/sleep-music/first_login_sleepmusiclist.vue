<template>
    <div class='first_login_sleepmusic' v-if='show===true||show==="true"'>
        <img src="/static/sleepMusicList/firstlogin_sleepmusic.png" alt="">
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
                window.localStorage.UPlusApp_firstLogin_sleepMusicList = false;
            }
        },
        mounted() {
            this.show = window.localStorage.UPlusApp_firstLogin_sleepMusicList;
        }
    }
</script>

<style lang='scss' scoped>
    .first_login_sleepmusic {
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