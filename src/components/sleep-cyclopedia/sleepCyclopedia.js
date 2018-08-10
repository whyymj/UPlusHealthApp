import mynav from './myNavigator.vue';
import mylist from './contentlist.vue';
export default {
    components : {
        mynav,
        mylist
    },
    methods : {
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
                .get('/api/getSleepWikiList', {termsId: that.navs[index].termsId})
                .then(function (res) {})
                .catch(function (res) {
                    that
                        .$axios
                        .get('/static/testData/getSleepWikiList.json')
                        .then(function (res) {
                            if (res.data.code == 'C0000') {
                                that.$set(that.contentList, index, res.data.data.map(function (item) {
                                    var type = item
                                        .postTitle
                                        .split('|')[0]
                                        .trim();

                                    return {img: item.attachmentPath, type: type, link: item.gotoUrl, title: item.postTitle,postId:item.postId}
                                }))
                            }
                        })
                        .catch(function (res) {});
                });
        }
    },
    mounted() {
        var that = this;
        this
            .$axios
            .get('/api/getSleepWikiTerms')
            .then(function (res) {})
            .catch(function (res) {
                that
                    .$axios
                    .get('/static/testData/getSleepWikiTerms.json')
                    .then(function (res) {
                        if (res.data.code == 'C0000') {
                            that.navs = res
                                .data
                                .data
                                .map(function (item) {
                                    return {relation_name: item.name, termsId: item.termsId}
                                });
                            that.getNews(0)
                        }
                    })
                    .catch(function (res) {});
            });
    },
    data() {
        return {curPage: 0, navs: [], contentList: {}}
    }
}
