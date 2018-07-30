<template>
    <div class='testscore'>
        <h2>测试得分</h2>
        <p class="score">{{score}}分(总分28分)</p>
        <div class='scoreAxis'>
            <span class='span8'>8</span>
            <span class='span15'>15</span>
            <span class='span22'>22</span>
            <chart color='#2283E2' type='leftLimit' uplimit='8' downlimit='0' title='睡眠正常' :score='score' showUp='true' showDown='true'></chart>
            <chart color='#2DA2CC' uplimit='15' downlimit='8' title='轻度失眠' :score='score' showUp='true' showDown=''></chart>
            <chart color='#DBA314' uplimit='22' downlimit='15' title='中度失眠' :score='score' showUp='true' showDown=''></chart>
            <chart color='#ED587B' type='rightLimit' uplimit='28' downlimit='22' title='重度失眠' :score='score' showUp='true' showDown=''></chart>
        </div>
    </div>
</template>

<script>
    import chart from './scoreImg'
    export default {
        props: ['score'],
        components: {
            chart
        }
    }
</script>

<style lang='scss' scoped>
    .testscore {
        width: 17.5rem;
        height: 6rem;
        margin: auto;
        background: #fff;
        position: relative;
        margin-bottom: 0.5rem;
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
        .score {
            font-size: 0.7rem;
            font-family: 'PingFangSC-Regular';
            color: rgba(34, 131, 226, 1);
            position: absolute;
            top: 0.7rem;
            right: 0.7rem;
            line-height: 0.7rem;
        }
        .scoreAxis {
            position: absolute;
            width: 100%;
            top: 2rem;
            padding-left: 0.2rem;
            span {
                font-size: 0.5rem;
                font-family: 'NotoSansCJKsc-Regular';
                color: rgba(118, 118, 118, 1);
                position: absolute;
                line-height: 0.5rem;
                top: 1.1rem
            }
            .span8 {
                left: 4.4rem
            }
            .span15 {
                left: 8.4rem
            }
            .span22 {
                left: 12.6rem
            }
        }
    }
</style>