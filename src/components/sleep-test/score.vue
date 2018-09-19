<template>
    <div>
        <score2 :score='score' :totalscore='totalscore' :scoreSet='scoreSet' v-if='scoreSet.length==2'></score2>
        <score3 :score='score' :totalscore='totalscore' :scoreSet='scoreSet' v-if='scoreSet.length==3'></score3>
        <score4 :score='score' :totalscore='totalscore' :scoreSet='scoreSet' v-if='scoreSet.length==4'></score4>
        <score5 :score='score' :totalscore='totalscore' :scoreSet='scoreSet' v-if='scoreSet.length==5'></score5>
    </div>
</template>

<script>
    import score2 from './score2.vue'
    import score3 from './score3.vue'
    import score4 from './score4.vue'
    import score5 from './score5.vue'
    export default {
        props: ['score', 'totalscore', 'scoreSet'],
        components: {
            score2,
            score3,
            score4,
            score5
        },
        data() {
            return {}
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