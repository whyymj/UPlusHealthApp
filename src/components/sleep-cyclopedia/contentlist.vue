<template>
    <div class='contentlist'>
        <ul>
            <li v-for='(item,index) in list' :key='index' @click='turnTo(item)'>
                <img :src="item.img" alt="" class='bgimg'>
                <p class="gradientBG"></p>
                <h6>{{item.title}}</h6>
                <span>{{item.type}}</span>
                <img :src="turnimg(item.type)" alt="" class='iconimg' v-if='(typeof item.type=="string")&&item.type.indexOf("漫画") == -1'>
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
                } else {
                    return '/static/sleep_cyclopedia/news.png'
                }
            },
            turnTo(url) {
                var newurl = url;
                newurl.name = url.title.split('|')[1] || url.title;
                newurl.time = 0;
                newurl.level = '';
                newurl.imgurl = '';
                newurl.musicurl = '';
                this.$router.push({
                    path: '/getSleepWiki',
                    query: newurl
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
        -webkit-overflow-scrolling: touch;
        h6 {
            position: absolute;
            color: #fff;
            font-size: 0.8rem;
            font-weight: 500;
            z-index: 1;
            top: 0;
            left: 0;
            height: 1.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.5rem;
            padding: 0 1rem;
            width: 100%;
            background: linear-gradient(to left, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
            border-top-left-radius: 0.3rem;
            border-top-right-radius: 0.3rem;
        }
        ul {
            width: 17rem;
            margin: auto;
            li {
                width: 100%;
                height: 10rem;
                position: relative;
                margin-bottom: 0.5rem;
                overflow: hidden;
                border-radius: 0.3rem;
                .gradientBG,
                .bgimg {
                    width: 100%;
                    height: 100%;
                }
                .gradientBG {
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: linear-gradient(210deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.08) 10%, rgba(0, 0, 0, 0.05) 15%, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),linear-gradient(-210deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.08) 10%, rgba(0, 0, 0, 0.05) 15%, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
                    /* 标准的语法 */
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