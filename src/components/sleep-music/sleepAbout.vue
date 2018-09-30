<template>
    <div class='aboutSleep'>
        <h3 @click='tmp'>{{data.title}}</h3>
        <h6>{{data.content}}</h6>
        <img :src="data.src" alt="" @click="turnTo(data.linkurl)">
        <a @click="turnTo(data.linkurl)">{{data.link}}</a>
    </div>
</template>

<script>
    export default {
        props: ['data'],
        methods: {
            turnTo(url) {
                this.$router.push(url);
            },
            tmp() {
                this.$router.push({
                    path: '/test1'
                });
            }
        }
    }
</script>

<style lang='scss' scoped>
    .aboutSleep {
        width: 17rem;
        margin: 0.5rem auto 0;
        background: #fff;
        border-radius: 0.2rem;
        h3 {
            font-size: 0.8rem;
            font-family: 'PingFangSC-Medium';
            color: rgba(17, 17, 17, 1);
           font-weight: 700;
            padding: 1rem 1rem 0.5rem 1rem;
        }
        h6 {
            font-size: 0.6rem;
            font-family: 'PingFangSC-Regular';
            color: rgba(102, 102, 102, 1);
            padding: 0 0 0.5rem 1rem;
        }
        img {
            display: block;
            width: 100%;
        }
        a {
            display: block;
            font-size: 0.7rem;
            font-family: 'PingFangSC-Regular';
            color: rgba(34, 131, 226, 1);
            text-align: center;
            text-decoration: none;
            line-height: 2rem;
        }
    }
</style>