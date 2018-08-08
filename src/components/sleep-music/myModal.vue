<template>
    <div>
        <transition name="fade">
            <div v-if="showmodal" class='detailmodal'>
                <div class='modalcont'>
                    <slot></slot>
                </div>
                <span class='bar'></span>
                <div class="close el-icon-close" @click='close'>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: ['showmodal'],
        watch:{
            showmodal(){
                console.log('showmodal',this.showmodal);
            }
        },
        data() {
            return {}
        },
        methods: {
            close() {
                this.$emit('closemodal');
            }
        }
    }
</script>

<style lang='scss' scoped>
    .modalcont {
       
        position: absolute;
        bottom: 7rem;
        background: #fff;
        border-radius: 0.5rem;
        left: 50%;
        transform: translate(-50%, 0);
        padding: 1rem;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter,
    .fade-leave-to
    /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
    .detailmodal {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        .close {
            width: 2rem;
            height: 2rem;
            background: #fff;
            position: absolute;
            bottom: 4rem;
            left: 0;
            right: 0;
            margin: auto;
            color: #26A5FD;
            text-align: center;
            line-height: 2rem;
            font-size: 1.5rem;
            border-radius: 50%;
        }
        .bar {
            position: absolute;
            height: 2rem;
            width: 2px;
            background: #fff;
            bottom: 5.5rem;
            left: 0;
            right: 0;
            margin: auto;
        }
    }
</style>