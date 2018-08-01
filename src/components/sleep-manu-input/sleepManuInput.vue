<template>
    <div class="sleepManuInput">
        <sleeptime :list='items'></sleeptime>
        <sleepquality></sleepquality>
    </div>
</template>

<script>
    import sleeptime from './sleepTime';
    import sleepquality from './sleepQuality.vue';
    export default {
        components: {
            sleeptime,
            sleepquality
        },
        data() {
            return {
                items: [{
                        title: "上床",
                        url: "/static/sleep-manue-input/img1.png",
                        content: "12:30"
                    },
                    {
                        title: "睡着",
                        url: "/static/sleep-manue-input/img2.png",
                        content: "12:30"
                    },
                    {
                        title: "睡醒",
                        url: "/static/sleep-manue-input/img3.png",
                        content: "12:30"
                    },
                    {
                        title: "起床",
                        url: "/static/sleep-manue-input/img4.png",
                        content: "12:30"
                    }
                ]
            };
        }
    };
</script>

<style scoped>
    .sleepManuInput {
        /* position: fixed; */
        height: 100%;
        width: 100%;
        background: #fff;
        /* overflow: auto; */
    }
</style>