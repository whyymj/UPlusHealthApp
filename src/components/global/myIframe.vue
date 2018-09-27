<template>
    <div class='myNewsWindow'>
        <iframe :src="url" frameborder="0"></iframe>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: ''
            }
        },
        mounted() {
            this.url = this.$route.query.url
        }
    }
</script>

<style lang='scss' scoped>
    .myNewsWindow {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        iframe {
            width: 100%;
            height: 100%;
            float: left;
        }
    }
</style>