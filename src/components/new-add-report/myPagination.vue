<template>
    <div class='pagination' :style="{bottom:bottom||'17%'}">
        <ul class="box">
            <li v-for='(item,index) in pagenum' :key='index' :class="{curpage:(pageindex==index)}"></li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            pagenum: Number,
            pageindex: Number,
            bottom: String
        },
        mounted() {
            console.log(this.pagenum, this.pageindex);
        }
    }
</script>

<style scoped lang='scss'>
    .pagination {
        width: 100%;
        position: absolute;
        bottom: 4rem;
        height: 0.4rem;
        .box {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, 0);
            li {
                float: left;
                width: 0.4rem;
                height: 0.4rem;
                background: rgba(38, 165, 253, 1);
                opacity: 0.3;
                border-radius: 50%;
                margin-right: 0.3rem;
            }
            .curpage {
                width: 1.2rem;
                height: 0.4rem;
                border-radius: 0.21rem;
                opacity: 1;
            }
        }
    }
</style>