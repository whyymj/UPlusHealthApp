<template>
    <div>
        <x-dialog v-model="privacy_show" class="dialog-demo">
            <div class="dialog-content">
                <h2>健康档案隐私权政策</h2>
                <p>
                    感谢您使用“健康档案”，健康档案尊重用户的个人信息和用户对服务的知情权利，并为此发布了隐私权政策。 为了向您提供高效优质的服务，我们需要搜集：您的手机号码和个人信息（可能涉及账号、设备、服务使用等相关信息），以用于注册您的会员账号等。我们不会向任何第三方提供您的信息，除非得到您的授权。此外，我们还将升级服务，为您提供“一个账号”管理海尔旗下不同应用端的服务便利。 详情请您仔细阅读：
                    <router-link to="/privacy">《海尔家电隐私权政策》</router-link>
                </p>
                <x-button style="width: 90%;margin-top: 1rem" @click.native="$_quit">不同意并退出</x-button>
                <x-button type="primary" style="width: 90%;margin-bottom:0.5rem;" @click.native="$_agree">同意</x-button>
            </div>
        </x-dialog>
        <x-dialog v-model="privacy_again" class="dialog-demo">
            <div class="dialog-content">
                <h2>确定不同意并退出吗？</h2>
                <p>我们需要获得您的同意才能为您提供服务。请您放心，我们一直尽力采取行业领先的安全防护措施来保护您提供的个人信息。我们不会向任何第三方提供您的信息，如果某些特定服务需要提供特定信息的，我们会单独征求您的意见。详情请您仔细阅读：
                    <router-link to="/privacy">《海尔家电隐私权政策》</router-link>
                </p>
                <x-button style="width: 90%;margin-top: 1rem" @click.native="$_exit">不同意并退出</x-button>
                <x-button type="primary" style="width: 90%" @click.native="$_again">同意</x-button>
            </div>
        </x-dialog>
    </div>
</template>

<script>
    import {
        XDialog,
        XButton
    } from 'vux'
    export default {
        name: 'privacy',
        props: {
            show: Boolean
        },
        components: {
            XDialog,
            XButton
        },
        data() {
            return {
                privacy_show: this.show,
                privacy_again: false
            }
        },
        mounted() {
            // 同意了隐私协议或者永久拒绝，就不在显示隐私协议弹窗
            if (window.localStorage.uplus_sleep_privacy_aggrement == '1' || window.localStorage.uplus_sleep_privacy_aggrement == '-2') { //是否同意了隐私协议
                this.privacy_show = false;
                this.$emit('agree', true)
                localStorage.UPlusAPP_agree_privacyPlan = true;
            }
        },
        watch: {
            show() {
                this.privacy_show = this.show;
            }
        },
        methods: {
            $_agree() { // 同意隐私协议
                this.privacy_show = false;
                this.$emit('agree', true)
                localStorage.UPlusAPP_agree_privacyPlan = true;
                this.$axios.post('/api/aggreePrivaceAgreement', {
                    type: '0',
                    flag: 1
                })
            },
            $_quit() { // 首次点击「不同意并退出」
                this.privacy_show = false
                this.privacy_again = true
                this.$emit('agree', false)
            },
            $_again() { // 同意
                this.privacy_again = false;
                this.$emit('agree', false)
                this.$axios.post('/api/aggreePrivaceAgreement', {
                    type: '0',
                    flag: 1
                })
            },
            $_exit() { // 再次点击「不同意并退出」
                this.privacy_again = false;
                this.$emit('agree', false)
                this.$router.go(-1)
                this.$axios.post('/api/aggreePrivaceAgreement', {
                    type: '0',
                    flag: -1
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dialog-demo {
        .dialog-content {
            box-sizing: border-box;
            padding: 0 0.5rem 0.6rem;
            overflow: hidden;
        }
        h2 {
            margin-top: 1rem;
            font-size: 1rem;
            font-weight: bold
        }
        p {
            margin: .4rem;
            text-align: justify
        }
    }
</style>
