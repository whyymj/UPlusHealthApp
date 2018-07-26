<template>
    <div class='musicPlayer'>
        <img src="/static/musicPlayer/bigImg.jpg" alt="" class='bigImg'>
        <myaudio></myaudio>
       
    </div>
</template>

<script>
    import myaudio from './playerControler';
    export default {
        components: {
            myaudio
        }
    }
</script>

<style lang='scss' scoped>
    .musicPlayer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        .bigImg {
            width: 15rem;
            height: 15rem;
            margin: 2rem auto 0;
            display: block;
            box-shadow: 0.3rem 0.3rem 2rem #bbb;
        }
      
    }
</style>