<template>
    <div class='contentlist'>
        <ul>
            <li v-for='(item,index) in list' :key='index' @click='turnTo(item.link)'>
                <img :src="item.img" alt="">
                <span>{{item.type}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['list'],
        methods: {
            turnTo(url) {
                window.location.href = url;
            }
        }
    }
</script>

<style lang='scss' scoped>
    .contentlist {
        width: 100%;
        overflow: auto;
        margin-top: 0.5rem;
        ul {
            width: 17rem;
            margin: auto;
            li {
                width: 100%;
                height: 10rem;
                position: relative;
                margin-bottom: 0.5rem;
                img {
                    width: 100%;
                    height: 100%;
                }
                span {
                    position: absolute;
                    left: 0.8rem;
                    bottom: 0.4rem;
                    height: 1.15rem;
                    background: rgba(51, 51, 51, 1);
                    border-radius: 0.1rem;
                    opacity: 0.88;
                    font-size: 0.6rem;
                    font-family: 'PingFangSC-Regular';
                    line-height: 1.15rem;
                    padding: 0 0.3rem;
                    color: rgba(255, 255, 255, 1);
                }
            }
        }
    }
</style>