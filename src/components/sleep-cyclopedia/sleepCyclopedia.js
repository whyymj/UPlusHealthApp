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
            console.log('>>>>>>>',index);
        }
    },
    data() {
        return {
            curPage: 0,
            navs: [
                {
                    relation_name: '入门'
                }, {
                    relation_name: '深入'
                }, {
                    relation_name: '疾病'
                }, {
                    relation_name: 'CBTI'
                }, {
                    relation_name: '药物'
                }
            ],
            contentList: {
                '1': [
                    {
                        img: '/static/sleepMusicList/exm3.jpg',
                        type: '漫画',
                        link: 'http://www.baidu.com'
                    }, {
                        img: '/static/sleepMusicList/exm3.jpg',
                        type: '漫画',
                        link: 'http://www.baidu.com'
                    },  {
                        img: '/static/sleepMusicList/exm3.jpg',
                        type: '漫画',
                        link: 'http://www.baidu.com'
                    },  {
                        img: '/static/sleepMusicList/exm3.jpg',
                        type: '漫画',
                        link: 'http://www.baidu.com'
                    },  {
                        img: '/static/sleepMusicList/exm3.jpg',
                        type: '漫画',
                        link: 'http://www.baidu.com'
                    },  {
                        img: '/static/sleepMusicList/exm3.jpg',
                        type: '漫画',
                        link: 'http://www.baidu.com'
                    },  {
                        img: '/static/sleepMusicList/exm3.jpg',
                        type: '漫画',
                        link: 'http://www.baidu.com'
                    }
                ]
            }
        }
    }
}
