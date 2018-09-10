<template>
    <div class='contentlist'>
        <ul>
            <li v-for='(item,index) in list' :key='index' @click='turnTo(item)'>
                <img :src="item.img" alt="" class='bgimg'>
                <h6>{{item.title}}</h6>
                <span>{{item.type||'图文'}}</span>
                <img :src="turnimg(item.type)"  alt="" class='iconimg'>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['list'],
        methods: {
            turnimg(item) {
                
                if (item.indexOf('漫画') != -1) {
                    return '/static/sleep_cyclopedia/news.png'
                } else if (item.indexOf('音频') != -1) {
                    return '/static/sleep_cyclopedia/music.png'
                } else if (item.indexOf('视频') != -1) {
                    return '/static/sleep_cyclopedia/audio.png'
                }else{
                     return '/static/sleep_cyclopedia/news.png'
                }
            },
            turnTo(url) {
                this.$router.push({
                    path:'/getSleepWiki',
                    query:url
                })
                // window.location.href = url;
            }
        }
    }
</script>

<style lang='scss' scoped>
    .contentlist {
        width: 100%;
        overflow: auto;
        margin-top: 0.5rem;
        h6 {
            position: absolute;
            color: #fff;
            font-size: 0.8rem;
            font-weight: 500;
            z-index: 1;
            top: 0;
            left: 0;
            height: 1.5rem;
            line-height: 1.5rem;
            padding: 0 1rem;
            width: 100%;
            background: rgba(0, 0, 0, 0.5)
        }
        ul {
            width: 17rem;
            margin: auto;
            li {
                width: 100%;
                height: 10rem;
                position: relative;
                margin-bottom: 0.5rem;
                .bgimg {
                    width: 100%;
                    height: 100%;
                }
              
                .iconimg {
                    width: 2.5rem;
                    height: 2.5rem;
                    position: absolute;
                    bottom: 0;
                    right: 0.5rem;
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