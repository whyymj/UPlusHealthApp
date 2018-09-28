<template>
    <div class='testscore'>
        <h2>测试得分</h2>
        <p class="score">{{score}}分(总分{{totalscore}}分)</p>
        <div class='scoreAxis'>
            <span class='span8'>{{uplimit1}}</span>
            <span class='span15'>{{uplimit2}}</span>
            <span class='span22'>{{uplimit3}}</span>
            <chart color='#2283E2' setWidth='4' type='leftLimit' :uplimit='uplimit1' :downlimit='downlimit1' :title='titleArr[0]' :score='score' showUp='true' showDown='true'></chart>
            <chart color='#2DA2CC' setWidth='4' :uplimit='uplimit2' :downlimit='downlimit2' :title='titleArr[1]' :score='score' showUp='true' showDown=''></chart>
            <chart color='#DBA314' setWidth='4' :uplimit='uplimit3' :downlimit='downlimit3' :title='titleArr[2]' :score='score' showUp='true' showDown=''></chart>
            <chart color='#ED587B' setWidth='4' type='rightLimit' :uplimit='uplimit4' :downlimit='downlimit4' :title='titleArr[3]' :score='score' showUp='true' showDown=''></chart>
        </div>
    </div>
</template>

<script>
    import chart from './scoreImg'
    export default {
        props: ['score', 'totalscore', 'scoreSet'],
        components: {
            chart
        },
        data() {
            return {
                uplimit1: 0,
                downlimit1: 0,
                uplimit2: 0,
                downlimit2: 0,
                uplimit3: 0,
                downlimit3: 0,
                uplimit4: 0,
                downlimit4: 0,
                titleArr: []
            }
        },
        watch: {
            scoreSet() {
                this.downlimit1 = 0;
                if (this.scoreSet instanceof Array) {
                    this.titleArr = this.scoreSet.map(function(item, index) {
                        return item.split(/[:：]/)[1]
                    })
                    this.uplimit1 = this.downlimit2 = Math.ceil(this.scoreSet[0].split('~')[1].split(/[:：]/)[0]);
                    this.uplimit2 = this.downlimit3 = Math.ceil(this.scoreSet[1].split('~')[1].split(/[:：]/)[0]);
                    this.uplimit3 = this.downlimit4 = Math.ceil(this.scoreSet[2].split('~')[1].split(/[:：]/)[0]);
                }
                this.uplimit4 = this.totalscore;
            }
        },
        mounted() {
            this.downlimit1 = 0;
            if (this.scoreSet instanceof Array) {
                this.titleArr = this.scoreSet.map(function(item, index) {
                    return item.split(/[:：]/)[1]
                })
                this.uplimit1 = this.downlimit2 = Math.ceil(this.scoreSet[0].split('~')[1].split(/[:：]/)[0]);
                this.uplimit2 = this.downlimit3 = Math.ceil(this.scoreSet[1].split('~')[1].split(/[:：]/)[0]);
                this.uplimit3 = this.downlimit4 = Math.ceil(this.scoreSet[2].split('~')[1].split(/[:：]/)[0]);
            }
            this.uplimit4 = this.totalscore;
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
            font-weight: 700;
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