<template>
    <div class='testscore'>
        <h2>测试得分</h2>
        <p class="score">{{score}}分(总分{{totalscore}}分)</p>
        <div class='scoreAxis'>
            <span class='span1'>{{uplimit1}}</span>
            <span class='span2'>{{uplimit2}}</span>
            <span class='span3'>{{uplimit3}}</span>
            <span class='span4'>{{uplimit4}}</span>
            <chart color='#2889B8' setWidth='3.1' type='leftLimit' :uplimit='uplimit1' :downlimit='downlimit1' :title='titleArr[0]' :score='score' showUp='true' showDown='true'></chart>
            <chart color='#5DA2C5' setWidth='3.1' :uplimit='uplimit2' :downlimit='downlimit2' :title='titleArr[1]' :score='score' showUp='true' showDown=''></chart>
            <chart color='#26A5FD' setWidth='3.1' :uplimit='uplimit3' :downlimit='downlimit3' :title='titleArr[2]' :score='score' showUp='true' showDown=''></chart>
            <chart color='#FF7E10' setWidth='3.1' :uplimit='uplimit4' :downlimit='downlimit4' :title='titleArr[3]' :score='score' showUp='true' showDown=''></chart>
            <chart color='#F65261' setWidth='3.1' type='rightLimit' :uplimit='uplimit5' :downlimit='downlimit5' :title='titleArr[4]' :score='score' showUp='true' showDown=''></chart>
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
                uplimit5: 0,
                downlimit5: 0,
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
                    this.uplimit4 = this.downlimit5 = Math.ceil(this.scoreSet[3].split('~')[1].split(/[:：]/)[0]);
                }
                this.uplimit5 = this.totalscore;
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
                this.uplimit4 = this.downlimit5 = Math.ceil(this.scoreSet[3].split('~')[1].split(/[:：]/)[0]);
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
            .span1 {
                left: 3.4rem
            }
            .span2 {
                left: 6.5rem
            }
            .span3 {
                left: 9.8rem
            }
            .span4 {
                left: 13.2rem
            }
        }
    }
</style>