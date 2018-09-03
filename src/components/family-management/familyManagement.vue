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
          <el-badge value="关联" class="item" v-if='haveNoRelation(item)'>
            <div class="family-img" @click="skipTo(item)">
              <img :src="item.head_pic" alt="family-img">
            </div>
          </el-badge>
          <div class="family-img haveNoRelation" style='border:none;' @click='clickNoRelation' v-else>未关联</div>
          <div class="name">{{item.relation_name}}</div>
          <div class="delete-wrap" v-show="isDelete">
            <img class="u-minus" src="../../assets/reduce.png" @click="deleteItem(item.member_id, index)" alt="">
          </div>
        </div>
        <!-- associate -->
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
  import { Toast } from 'mint-ui';
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
    created() {},
    mounted() {
      if (process.env.NODE_ENV == 'development') {
        this.createdList = [{
            "member_id": "58",
            "login_code": 15153125386,
            "relation": "1",
            "relation_name": "爸爸",
            "height": 170,
            "weight": 65,
            "birthday": "1966-11-27",
            "head_pic": "http://healthapp.haier.net/image/father.png",
            "sex": "male",
            "create_date": "2018-04-12 10:34:57",
            "nick_name": "爸爸",
            "target_weight": 65,
            "is_first_set_tw": 1,
            "age": 52
          },
          {
            "member_id": "42",
            "login_code": 15153125386,
            "relation": "13",
            "relation_name": "朋友",
            "height": 180,
            "weight": 70,
            "birthday": "1989-8-30",
            "head_pic": "http://healthapp.haier.net/image/husband.png",
            "sex": "male",
            "create_date": "2018-01-26 16:12:57",
            "nick_name": "朋友2",
            "target_weight": 70,
            "is_first_set_tw": 1,
            "age": 29
          }
        ]
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
      haveNoRelation(item) { //判断是否关联的账号
        return false;
      },
      clickNoRelation() { //点击未启用的用户
        this.showTips('无法查看未启用健康档案的用户信息')
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
          console.log(err)
        }
      },
      async getFamilyList() {
        var that = this;
        try {
          const result = await axios.get('/api/family')
          if (result.data.code === 'C0000') {
            this.associatedList = result.data.data[1]
            this.createdList = result.data.data[0]
          }
          that.loadingmodal.close();
        } catch (err) {
          that.loadingmodal.close();
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
          console.log(this.memberList)
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
            params: {
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
                memberList: this.memberList.substring(0, this.memberList.length - 1)
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
