<template>
    <div class='sleep_cyclopedia_content'>
        <h1>{{title}}</h1>
        <myAudio v-if='isAudio' :musicparams='audioUrl'></myAudio>
        <div class='body' v-html="cont" v-else></div>
    </div>
</template>

<script>
    import myAudio from './myaudio';
    export default {
        props: [],
        components: {
            myAudio
        },
        data() {
            return {
                title: '',
                cont: '',
                isAudio: false, //判断是否是音频
                audioUrl: ''
            }
        },
        mounted() {
            var that = this;
            var params = this.$route.query;
            this.title = params.title;
            this.$axios.post('/api/getSleepWiki', {
                postId: params.postId
            }).then(function(res) {
                var reg = /.*src="(.*?)".*/;
                if (res.data.code == 'C0000') {
                    that.cont = res.data.data.wikiContent;
                    if (that.cont.indexOf('<audio') != -1) {
                        that.isAudio = true;
                        that.audioUrl = {
                            musicurl: reg.exec(that.cont)[1]
                        }
                    }
                }
            }).catch(function(res) {
                that.$axios.get('/static/testData/getSleepWiki.json').then(function(res) {
                    if (res.data.code == 'C0000') {
                        that.cont = res.data.data.wikiContent
                    }
                })
            })
        }
    }
</script>

<style lang='scss'>
    .sleep_cyclopedia_content {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: auto;
        background: #fff;
        padding: 0;
        h1 {
            width: 100%;
            text-align: center;
            font-size: 1rem;
            line-height: 1.5rem;
            font-weight: 600;
            margin: 2rem auto 0;
        }
        .body {
            width: 100%;
            padding: 1rem;
            margin: 0;
            p {
                font-size: 0.75rem;
                font-weight: 500;
                text-indent: 2em;
                line-height: 1.2rem;
                margin: 0.5rem auto;
                color: #333;
            }
            img {
                display: block;
                margin: auto;
            }
        }
    }
</style>