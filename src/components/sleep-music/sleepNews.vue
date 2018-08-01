<template>
    <div class='aboutNews'>
        <h3>相关资讯</h3>
        <div class='newsbox'>
            <img src="/static/sleepMusicList/exm3.jpg" alt="">
            <div class="title">（这世界）那些不睡觉的传说，还是留给真正的天才吧！</div>
            <ul class='keywords'>
                <li>健康</li>
                <li>体重</li>
                <li>睡眠</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang='scss' scoped>
    .aboutNews {
        width: 17rem;
        height: 7.5rem;
        margin: 0.5rem auto 2rem;
        background: #fff;
        margin: 0.5rem auto 0;
        h3 {
            font-size: 0.8rem;
            font-family: 'PingFangSC-Medium';
            color: rgba(17, 17, 17, 1);
            font-weight: 600;
            padding: 1rem 1rem 0.5rem 1rem;
        }
        .newsbox {
            height: 4rem;
            width: 15rem;
            position: relative;
            margin: auto;
            img {
                width: 5.1rem;
                height: 4rem;
                position: absolute;
            }
            .title {
                font-size: 0.7rem;
                font-family: 'PingFangSC-Regular';
                color: rgba(0, 0, 0, 1);
                position: absolute;
                left: 6rem;
                font-weight: 600;
                width: 10rem;
            }
            .keywords {
                position: absolute;
                left: 6rem;
                bottom: 0;
                height: 1rem;
                li {
                    float: left;
                    height: 1rem;
                    line-height: 0.8rem;
                    margin-right: 0.2rem;
                    padding: 0 0.2rem;
                    border-radius: 0.1rem;
                    border: 1px solid rgba(200, 200, 200, 1);
                    box-sizing: border-box;
                    font-size: 0.6rem;
                    font-family: 'PingFangSC-Regular';
                    color: rgba(142, 142, 142, 1);
                }
            }
        }
    }
</style>