<template>
    <div class='myquestions'>
        <h1>{{list.title}}</h1>
        <table>
            <tr v-for='(item,index) in list.options' :key='index' :style="{background:index%2==0?'#fff':'rgba(250,250,250,1)'}">
                <td class="lefttd">{{item.lab}}</td>
                <td class='righttd'>
                    <p @click='closeReInit'>
                        <el-radio v-model="radio" :label="index"></el-radio>
                    </p>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import bus from '../../assets/healthSleep/bus.js'
    export default {
        props: ['list', 'id'],
        methods: {
            closeReInit() {
                bus.$emit('closeReInitButton');
            }
        },
        data() {
            return {
                doubleclick: 0,
                radio: '',
                value: '',
                bgcolor: 'background:rgba(250,250,250,1);'
            }
        },
        watch: {
            radio() {
                var that = this;
                this.$emit('selectQuestion', {
                    questnum: that.id,
                    option: [that.radio]
                })
            },
            list() {
                var that = this;
                this.list.options.map(function(item, index) {
                    if (item.checked === true || item.checked === 'true') {
                        that.radio = index
                    }
                });
            }
        },
        mounted() {
            var that = this;
            if (this.list && this.list.options) {
                this.list.options.map(function(item, index) {
                    if (item.checked === true || item.checked === 'true') {
                        that.radio = index
                    }
                });
            }
        }
    }
</script>

<style lang='scss'>
    h1 {
        font-size: 0.9rem;
        font-family: 'PingFangSC-Regular';
        color: rgba(17, 17, 17, 1);
        line-height: 2rem;
        padding: 0 1rem;
        font-weight: 600;
    }
    .myquestions {
        width: 100%;
        overflow: hidden;
        table {
            width: 100%;
            td {
                height: 2rem;
                line-height: 2rem;
                position: relative;
                padding: 0 1rem;
                font-size: 0.75rem;
                font-family: 'PingFangSC-Regular';
                color: rgba(51, 51, 51, 1);
                p {
                    position: absolute;
                    width: 1.2rem;
                    height: 1.2rem;
                    border-radius: 50%;
                    border: 1px solid #32B6E6;
                    right: 1rem;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    font-size: 1rem;
                    box-sizing: border-box;
                    label {
                        width: 1.2rem;
                        height: 1.1rem;
                        position: absolute;
                        top: 0;
                        left: 0;
                        margin: auto;
                        bottom: 0;
                        right: 0;
                        .el-radio__label {
                            display: none;
                        }
                        span,
                        .el-radio__inner {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 1.1rem;
                            height: 1.1rem;
                            bottom: 0;
                            right: 0;
                        }
                    }
                }
            }
            .lefttd {
                text-align: left;
                width: 80%;
            }
            .righttd {
                text-align: right;
            }
        }
    }
</style>