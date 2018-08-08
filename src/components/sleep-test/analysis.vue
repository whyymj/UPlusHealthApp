<template>
    <div class='analysis'>
        <h2>分析结果</h2>
        <span class="result">{{analysis.title}}</span>
        <p class="detail">{{analysis.detail}}</p>
    </div>
</template>

<script>
    export default {
        props:['analysis']
    }
</script>

<style lang='scss' scoped>
    .analysis {
        width: 17.5rem;
        margin: auto;
        background: #fff;
        position: relative;
        border: 1px solid #fff;
        h2 {
            font-size: 0.8rem;
            font-family: 'PingFangSC-Medium';
            color: rgba(17, 17, 17, 1);
            position: absolute;
            top: 0.7rem;
            left: 0.7rem;
            font-weight: 600;
            line-height: 0.8rem;
        }
        .result {
            font-size: 0.7rem;
            font-family: 'PingFangSC-Regular';
            color: rgba(34, 131, 226, 1);
            position: absolute;
            top: 0.7rem;
            right: 0.7rem;
            line-height: 0.7rem;
        }
        .detail {
            width: 16.1rem;
            margin: 2.5rem auto 0.7rem;
            font-size: 0.7rem;
            font-family: 'PingFangSC-Regular';
            color: rgba(102, 102, 102, 1);
            line-height: 0.97rem;
        }
    }
</style>