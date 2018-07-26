<template>
    <div class='myquestions'>
        <h1>1.难以维持睡眠</h1>
        <ul>
            <li v-for='(item,index) in list' :key='index' :style="{background:(index%2==0)?bgcolor:'#fff'}">
                <mt-radio align="right" v-model="value" :options="item">
                </mt-radio>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [1, 2, 3, 4],
                value:'',
                bgcolor: 'background:rgba(250,250,250,1);'
            }
        },
    }
</script>

<style lang='scss' scoped>
    .myquestions {
        width: 100%;
        overflow: hidden;
        ul {
            width: 100%;
            li {
                width: 100%;
                height: 2rem;
                line-height: 2rem;
            }
        }
    }
</style>