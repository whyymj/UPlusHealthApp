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
                        title: "Jason Oner",
                        url: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                        content: "12:30"
                    },
                    {
                        title: "Ranee Carlson",
                        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
                        content: "12:30"
                    },
                    {
                        title: "Cindy Baker",
                        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
                        content: "12:30"
                    },
                    {
                        title: "Ali Connors",
                        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
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