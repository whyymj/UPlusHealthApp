<template>
    <div>
    </div>
</template>

<script>
    import {
        Loading
    } from 'element-ui';
    export default {
        components: {
            Loading
        },
        data() {
            return {
                loadingmodal: ''
            }
        },
        mounted() {
            this.loadingmodal = Loading.service({
                fullscreen: true,
                background: 'rgba(0, 0, 0, 0.7)',
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
            });
        }
    }
</script>

<style scoped>

</style>