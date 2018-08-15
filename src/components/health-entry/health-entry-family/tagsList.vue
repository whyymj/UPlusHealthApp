<template>
    <div class="body_25">
        <span class="body_241" :class='{active:item.selected!=""}' v-for='(item,index) in tags' :key='index' @click='choose(index)'>{{item.name}}</span>
    </div>
</template>

<script>
    export default {
        props: ['tags', 'name'],
        data() {
            return {
                chooses: {}
            }
        },
        methods: {
            choose(index) {
                var that=this;
                this.tags[index].selected = this.tags[index].selected ? '' : true;
                this.$emit('choose', {
                    tags:that.tags,
                    name:that.name
                });
            }
        }
    }
</script>

<style lang='scss' scoped>
    .body_25 {
        width: 17rem;
        margin: auto;
        word-break: break-all;
        overflow: hidden;
        .body_241 {
            float: left;
            margin: 0 0.5rem 1rem 0;
            height: 1.6rem;
            border-radius: 0.8rem;
            border: 0.05rem solid rgba(50, 182, 230, 1);
            font-size: 0.75rem;
            font-family: 'PingFangSC-Regular';
            color: rgba(50, 182, 230, 1);
            line-height: 1.6rem;
            padding: 0 0.5rem;
        }
        .active {
            color: #fff;
            background: rgba(50, 182, 230, 1);
        }
    }
</style>