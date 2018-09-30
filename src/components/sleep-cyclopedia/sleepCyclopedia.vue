<template>
    <div class="sleepCyclopedia">
        <mynav :navigateList='navs' @clickNav='clickNav'></mynav>
        <div class='contentContainer' v-for='(item,index) in contentList' :key='index' v-show='curPage==index'>
            <mylist :list='contentList[index]'></mylist>
        </div>
        <div class="bottom">
            <img src="../../assets/tanhao.png" class="img1" />
            <span class="bottom_1">以上服务由寝安提供</span>
        </div>
        <myLoadingModal :show='showMyLoadingModal'></myLoadingModal>
    </div>
</template>

<script>
    import mynav from './myNavigator.vue';
    import mylist from './contentlist.vue';
    export default {
        components: {
            mynav,
            mylist
        },
        methods: {
            clickNav(index) {
                this.curPage = index;
                if (!this.contentList[index]) {
                    this.getNews(index)
                }
            },
            getNews(index) {
                var that = this;
                this
                    .$axios
                    .post('/api/getSleepWikiList', {
                        termsId: that.navs[index].termsId
                    })
                    .then(function(res) {
                        if (res.data.code == 'C0000') {
                            that.$set(that.contentList, index, res.data.data.map(function(item) {
                                var type = item
                                    .postTitle
                                    .split('|')[0]
                                    .trim();
                                return {
                                    img: item.attachmentPath,
                                    type: type,
                                    link: item.gotoUrl,
                                    title: item.postTitle,
                                    postId: item.postId
                                }
                            }))
                        }
                    })
                    .catch(function(res) {
                        if (process.env.NODE_ENV == 'development') {
                            that
                                .$axios
                                .get('/static/testData/getSleepWikiList.json')
                                .then(function(res) {
                                    if (res.data.code == 'C0000') {
                                        that.$set(that.contentList, index, res.data.data.map(function(item) {
                                            var type = item
                                                .postTitle
                                                .split('|')[0]
                                                .trim();
                                            return {
                                                img: item.attachmentPath,
                                                type: type,
                                                link: item.gotoUrl,
                                                title: item.postTitle,
                                                postId: item.postId
                                            }
                                        }))
                                    }
                                })
                                .catch(function(res) {});
                        }
                    });
            }
        },
        mounted() {
            var that = this;
            this.showMyLoadingModal = true;
            setTimeout(function() {
                that.showMyLoadingModal = false;
            }, 10000)
            this
                .$axios
                .post('/api/getSleepWikiTerms')
                .then(function(res) {
                    that.showMyLoadingModal = false;
                    if (res.data.code == 'C0000') {
                        that.navs = res
                            .data
                            .data
                            .map(function(item) {
                                return {
                                    relation_name: item.name,
                                    termsId: item.termsId
                                }
                            });
                        that.getNews(0)
                    }
                })
                .catch(function(res) {
                    that.showMyLoadingModal = false;
                    if (process.env.NODE_ENV == 'development') {
                        that
                            .$axios
                            .get('/static/testData/getSleepWikiTerms.json')
                            .then(function(res) {
                                if (res.data.code == 'C0000') {
                                    that.navs = res
                                        .data
                                        .data
                                        .map(function(item) {
                                            return {
                                                relation_name: item.name,
                                                termsId: item.termsId
                                            }
                                        });
                                    that.getNews(0)
                                }
                            })
                            .catch(function(res) {});
                    }
                });
        },
        data() {
            return {
                curPage: 0,
                navs: [],
                contentList: {},
                showMyLoadingModal: true
            }
        }
    }
</script>
<style lang="scss">
    @import "./sleepCyclopedia.scss";
    .contentContainer {
         -webkit-overflow-scrolling: touch;
        position: absolute;
        top: 3rem;
        bottom: 2rem;
        left: 0;
        right: 0;
        overflow: auto;
    }
</style>
