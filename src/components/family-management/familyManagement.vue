<template>
  <div class="page associated-family-v">
    <div class="container has-footer">
      <div class="space"></div>
      <div class="family-member">
        <!--v-for created-->
        <div class="family-item text-center">
          <div class="family-img" @click="skipTo('')">
            <img :src="headPic" alt="family-img">
          </div>
          <div class="name">我</div>
        </div>
        <div class="family-item text-center" v-for="(item, index) in createdList" :key="index">
          <el-badge value="" class="item">
            <div class="family-img" @click="skipTo(item)">
              <img :src="item.head_pic" alt="family-img">
            </div>
          </el-badge>
          <div class="name">{{item.nick_name}}</div>
          <div class="delete-wrap" v-show="isDelete">
            <img class="u-minus" :src="item.head_pic" @click="deleteItem(item.member_id, index)" alt="">
          </div>
        </div>
        <!-- associate -->
        <div class="family-item text-center" v-for="(item, index) in associatedList" :key="'1'+index">
          <el-badge value="关联" class="item" v-if='item.unHealthUser!=="Y"' @click='clickNoRelation(item)'>
            <div class="family-img" @click="skipTo(item)">
              <img :src="item.head_pic" alt="family-img">
            </div>
          </el-badge>
          <div class="family-img haveNoRelation" style='border:none;' @click='clickNoRelation(item)' v-else>未关联</div>
          <div class="name">{{item.nick_name}}</div>
          <div class="delete-wrap" v-show="isDelete">
            <img class="u-minus" src="../../assets/newFile.png" @click="deleteItem(item.member_id, index)" alt="">
          </div>
        </div>
      </div>
      <!-- <div class="associated-create add-friends " @click="openCreate()">
                                                          <img class="addFriends" src='/static/familyManage/link.png'>
                                                          <span class="add" id='addf'>添加好友<i>（已有U+账号）</i></span>
                                                        </div> -->
      <p class='additionTips'>注：无法查看未启用健康档案的用户信息</p>
      <div class="associated-create" @click="openCreate()">
        <i class="create fa fa-plus"></i> <span class="create">创建家人</span>
      </div>
    </div>
    <firstLogin @firstlogin='first_login'></firstLogin>
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios'
  import {
    Toast
  } from 'mint-ui';
  import firstLogin from './first_login_family.vue';
  import {
    MessageBox
  } from 'mint-ui';
  import myloading from '../global/Loading.vue';
  import {
    clearTimeout
  } from 'timers';
  export default {
    mixins: [myloading],
    components: {
      firstLogin
    },
    name: 'family-management',
    data() {
      return {
        bar: '',
        toast: '',
        isModel: null,
        isDelete: false,
        editText: '编辑',
        createdList: [],
        associatedList: [],
        headPic: '',
        memberList: ''
      }
    },
    mounted() {
    
   
      if (process.env.NODE_ENV == 'development') {
        this.createdList = []
      }
      // init family list && window.localStorage.getItem('newUser')
      this.getFamilyList()
      this.initUserInfo()
      if (window.localStorage.UPlusApp_firstLogin_family === undefined || window.localStorage.UPlusApp_firstLogin_family === "undefined") {
        window.localStorage.UPlusApp_firstLogin_family = true;
      }
      // this.$nextTick(function () {
      //   document.getElementById('tips').style.top = (document.getElementById('associate-icon').offsetTop -17) + 'px';
      //   if (!window.localStorage.getItem('fEntry')) {
      //     this.isModel = true;
      //     window.localStorage.setItem('fEntry', '1');
      //   } else {
      //     this.isModel = false;
      //   }
      // })
    },
    methods: {
      showTips(msg) {
        this.toast = Toast(msg);
        var that = this;
        clearTimeout(this.bar);
        this.bar = setTimeout(() => {
          that.toast.close();
        }, 2000);
      },
      first_login() {
        window.localStorage.UPlusApp_firstLogin_family = false;
      },
      clickNoRelation(item) { //点击未启用的用户
        this.$router.push({
          path: '/editFriends',
          query: {
            img: item.head_pic,
            nickname: item.nick_name,
            addition: ''
          }
        })
      },
      async initUserInfo() {
        var that = this;
        try {
          const result = await axios.post('/api/user/info', {
            phone: ''
          })
          if (result.data.code === 'C0000') {
            this.headPic = result.data.data.head_pic
          }
          that.loadingmodal.close();
        } catch (err) {
          that.loadingmodal.close();
        }
      },
      async getFamilyList() {
        var that = this;
        try {
          const result = await axios.get('/api/family')
          if (result.data.code === 'C0000') {
            this.createdList = result.data.data[0].map(function(item) {
              var newitem = item;
              newitem.head_pic = item.head_pic || '/static/familyManage/newFile.png'
              return newitem;
            });
            this.$axios.get('/api/getUHomeFamilyMember').then(function(res) {
              if (res.data.code == 'C0000') {
                that.associatedList = res.data.data.UHomeList.map(function(item, index) {
                  return {
                    "member_id": item.mobile,
                    "login_code": item.mobile,
                    "relation": "13",
                    "relation_name": "朋友",
                    "height": item.height,
                    "weight": item.weight,
                    "birthday": item.birthday,
                    "head_pic": item.avatarUrl,
                    "sex": item.gender,
                    "create_date": "",
                    "nick_name": item.nickname,
                    "target_weight": '',
                    "is_first_set_tw": 1,
                    "age": '',
                    "unHealthUser": item.unHealthUser || 'Y'
                  }
                });
              }
            }).catch(function(res) {})
          }
          that.loadingmodal.close();
        } catch (err) {
          that.loadingmodal.close();
          that.$axios.get('/static/testData/family.json').then(function(res) {
            that.createdList = res.data.data[0];
            that.$axios.get('/static/testData/getUHomeFamilyMember.json').then(function(res) {
              if (res.data.code == 'C0000') {
                that.associatedList = res.data.data.UHomeList.map(function(item, index) {
                  return {
                    "member_id": item.mobile,
                    "login_code": item.mobile,
                    "relation": "13",
                    "relation_name": "朋友",
                    "height": item.height,
                    "weight": item.weight,
                    "birthday": item.birthday,
                    "head_pic": item.avatarUrl,
                    "sex": item.gender,
                    "create_date": "",
                    "nick_name": item.nickname,
                    "target_weight": '',
                    "is_first_set_tw": 1,
                    "age": '',
                    "unHealthUser": item.unHealthUser || 'Y'
                  }
                });
              }
            }).catch(function(res) {})
          })
        }
      },
      openAssociate() {
        this.$router.push({
          path: '/associatedFamilyS'
        })
      },
      openCreate() {
        this.$router.push({
          path: '/healthEntryFamily',
          query: {
            from: '/familyManagement'
          }
        })
      },
      deleteItem(id, index) {
        MessageBox.confirm('确定删除吗?').then(action => {
          this.memberList += id + ','
          this.createdList.splice(index, 1)
        }).catch(err => {
          console.log(err)
        });
      },
      skipTo(item) { //根据是否关联了用户
        var id = item.member_id;
        window._member_id = id;
        if (!id) {
          this.$router.push({
            name: 'userInfo',
            params: {
              member_id: id
            }
          })
        } else {
          this.$router.push({
            name: 'editFamily',
            query: {
              member_id: id
            }
          })
        }
      },
      async showDelete() {
        this.isDelete = !this.isDelete
        if (this.isDelete) {
          this.editText = '保存'
        } else {
          if (this.memberList === '') {
            this.editText = '编辑'
          } else {
            //这里做删除
            try {
              const result = await axios.post('/api/member/delete', {
                member_id: this.memberList.substring(0, this.memberList.length - 1)
              })
              if (result.data.code === 'C0000') {
                this.editText = '编辑'
              }
            } catch (err) {
              console.log('err: ', err)
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "./familyManagement.scss";
  .associated-family-v {
    .additionTips {
      background: #fff;
      font-size: 0.6rem;
      font-family: 'PingFangSC-Regular';
      font-weight: 400;
      color: rgba(179, 179, 179, 1);
      margin-bottom: 0.5rem;
    }
    .container {
      background: #fff;
      padding-bottom: 0;
    }
    .haveNoRelation {
      width: 2.5rem;
      height: 2.5rem;
      background: rgba(221, 221, 221, 1);
      text-align: center;
      line-height: 2.5rem;
      color: #fff;
    }
    .el-badge__content {
      background: #2283E2; // padding-top:1px ;
      // padding-bottom: 1px;
    }
    .family-img {
      width: 2.6rem;
      height: 2.6rem;
      border: 1px solid #2283E2;
    }
    .add-friends {
      .addFriends {
        width: 1rem;
        height: 1rem;
        vertical-align: middle;
        margin-right: 0.4rem;
      }
      #addf {
        font-size: 0.8rem;
        font-family: 'PingFangSC-Regular';
        color: #000;
        i {
          font-size: 0.7rem;
          font-family: PingFangSC-Regular;
          color: rgba(60, 57, 57, 1);
        }
      }
    }
  }
</style>
