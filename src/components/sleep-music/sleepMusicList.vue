<template>
    <div class='sleepMusic'>
        <div class="tabbars">
            <div class="tabbar" @click='clickSpan(0)'><span :class='{active:activeSpan==0}'>睡眠报告</span></div>
            <div class="tabbar" @click='clickSpan(1)'><span :class='{active:activeSpan==1}'>睡眠练习</span></div>
        </div>
        <div class='content'>
            <div class="page page1" v-show='activeSpan==0'>
            </div>
            <div class="page page2" v-show='activeSpan==1'>
                <musiclist :musiclist='list'></musiclist>
                <player></player>
                <div class="tips">
                    <h6><img src="/static/sleepMusicList/img3.png" alt="">
                        <span>以上服务由寝安提供</span></h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import musiclist from "./musicList.vue";
    import player from "./player.vue";
    export default {
        name: "sleepMusicList",
        components: {
            musiclist,
            player
        },
        data() {
            return {
                activeName: "",
                list: [{
                        name: "腹式呼吸练习1",
                        time: 10,
                        level: 0,
                        imgurl: "/static/sleepMusicList/img2.png",
                        musicurl: ""
                    },
                    {
                        name: "腹式呼吸练习2",
                        time: 10,
                        level: 0,
                        imgurl: "/static/sleepMusicList/img2.png",
                        musicurl: ""
                    },
                    {
                        name: "腹式呼吸练习3",
                        time: 10,
                        level: 1,
                        imgurl: "/static/sleepMusicList/img2.png",
                        musicurl: ""
                    },
                    {
                        name: "腹式呼吸练习4",
                        time: 10,
                        level: 2,
                        imgurl: "/static/sleepMusicList/img2.png",
                        musicurl: ""
                    },
                    {
                        name: "腹式呼吸练习5",
                        time: 10,
                        level: 0,
                        imgurl: "/static/sleepMusicList/img2.png",
                        musicurl: ""
                    },
                    {
                        name: "腹式呼吸练习6",
                        time: 10,
                        level: 0,
                        imgurl: "/static/sleepMusicList/img2.png",
                        musicurl: ""
                    },
                    {
                        name: "腹式呼吸练习7",
                        time: 10,
                        level: 0,
                        imgurl: "/static/sleepMusicList/img2.png",
                        musicurl: ""
                    }
                ],
                activeSpan: 1
            };
        },
        methods: {
            handleClick() {},
            clickSpan(index) {
                this.activeSpan = index;
            }
        }
    };
</script>

<style lang='scss'>
    .sleepMusic {
        position: fixed;
        top: 0;
        left: 0;
        background: #fff;
        width: 100%;
        height: 100%;
        .tabbars {
            width: 100%;
            height: 3rem;
            border-bottom: 1px solid rgba(245, 245, 245, 1);
            .tabbar {
                width: 50%;
                height: 100%;
                float: left;
                text-align: center;
                line-height: 3rem;
                span {
                    display: inline-block;
                    font-size: 0.75rem;
                    font-family: ‘;
                    color: #666;
                    line-height: 1.5rem;
                }
                span.active {
                    color: rgba(38, 165, 253, 1);
                    border-bottom: 2px solid rgba(38, 165, 253, 1);
                }
            }
        }
        .content {
            width: 100%;
            position: absolute;
            top: 3rem;
            bottom: 0;
            left: 0;
            right: 0;
            .page {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                overflow: auto;
            }
        }
        .tips {
            position: relative;
            left: 50%;
            overflow: hidden;
            height: 1rem;
            transform: translate(-50%, 0);
            margin-top: 0.5rem;
            h6 {
                position: absolute;
                left: 50%;
                transform: translate(-50%, 0);
                line-height: 1rem;
                text-align: center;
                vertical-align: middle;
                img,
                span {
                    float: left;
                    height: 1rem;
                    line-height: 1rem;
                    margin-right: 0.2rem;
                }
            }
        }
    }
</style>