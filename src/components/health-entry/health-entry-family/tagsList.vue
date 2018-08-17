<template>
    <div class="body_25">
        <span class="body_241" :class='{active:item.selected!=""}' v-for='(item,index) in showlist' :key='index' @click='choose(index)'>{{item.name}}</span>
    </div>
</template>

<script>
    export default {
        props: ['tags', 'name', 'clear'],
        watch: {
            clear() {
                this.refresh();
            },
            tags() {
                var that=this;
                this.showlist = this.tags;
                this.$emit('choose', {
                    tags: that.showlist,
                    name: that.name
                });
            }
        },
        data() {
            return {
                showlist: [],
                chooses: {}
            }
        },
        methods: {
            refresh() {
                var newitem;
                var that=this;
                this.showlist = this.tags.map(function(item) {
                    newitem = item;
                    newitem.selected = '';
                    return newitem;
                })
                 this.$emit('choose', {
                    tags: that.showlist,
                    name: that.name
                });
            },
            choose(index) {
                var that = this;
                this.showlist[index].selected = this.tags[index].selected ? '' : true;
                this.$emit('choose', {
                    tags: that.showlist,
                    name: that.name
                });
            }
        },
        mounted() {
            console.log('clear22222', this.clear);
            this.showlist = this.tags;
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