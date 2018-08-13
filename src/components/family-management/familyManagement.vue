<template>
  <div class="page associated-family-v">
    <!--first enter-->
    <!-- <div class="model" v-show="isModel" @click="isModel = !isModel">
                                      <img id="tips" src="../../assets/family-manage-model.png" alt="">
                                    </div> -->
    <!---->
    <!-- <h-header title="家人管理"></h-header> -->
    <!-- <a class="delete-btn" @click="showDelete">{{editText}}</a> -->
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
          <div class="family-img" @click="skipTo(item.member_id)">
            <img :src="item.head_pic" alt="family-img">
          </div>
          <div class="name">{{item.relation_name}}</div>
          <div class="delete-wrap" v-show="isDelete">
            <img class="u-minus" src="../../assets/reduce.png" @click="deleteItem(item.member_id, index)" alt="">
          </div>
        </div>
        <!-- associate -->
        <!-- <div class="family-item text-center" v-for="(item, index) in associatedList" :key="index">
                                            <div class="family-img">
                                              <img :src="item.associated_pic" alt="family-img">
                                            </div>
                                            <div class="name">{{item.associated_name}}</div>
                                            <img class="u-plus" src="../../assets/u-plus.png" alt="">
                                          </div> -->
      </div>
      <!-- <div class="associated-account" @click="openAssociate()">
                                        <i class="fa fa-chain" id="associate-icon"></i> <span class="">关联家人</span> <span>（已有U+账号）</span>
                                      </div> -->
      <div class="associated-create add-friends " @click="openCreate()">
        <img class="addFriends" src='/static/familyManage/link.png'>
        <span class="add" id='addf'>添加好友<i>（已有U+账号）</i></span>
      </div>
      <div class="associated-create" @click="openCreate()">
        <i class="create fa fa-plus"></i> <span class="create">创建家人</span>
      </div>
      <div class="space"></div>
      <!-- <div class="associated-privacy">
                                        <span class="privacy">隐私设置</span>
                                      </div> -->
      <div class="tips">
        <h2>提示</h2>
        <!-- <p>
                                          1、关联亲友为单向关联，只有关联您的用户才有权限查看您的健康数据。
                                        </p> -->
        <p>
          1、点击编辑，进入编辑模式，误删家人情况下只要不点保存设置，即删除操作未完成。
        </p>
      </div>
    </div>
    <!-- <footer class="footer">
                                  <button class="confirm" @click="showDelete()">{{editText}}</button>
                                </footer> -->
    <firstLogin @firstlogin='first_login'></firstLogin>
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios'
  import firstLogin from './first_login_family.vue';
  import {
    MessageBox
  } from 'mint-ui'
  export default {
    components: {
      firstLogin
    },
    name: 'family-management',
    data() {
      return {
        isModel: null,
        isDelete: false,
        editText: '编辑',
        createdList: [{
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
        ],
        associatedList: [],
        headPic: '',
        memberList: ''
      }
    },
    created() {},
    mounted() {
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
      first_login() {
        window.localStorage.UPlusApp_firstLogin_family = false;
      },
      async initUserInfo() {
        try {
          const result = await axios.post('/api/user/info', {
            phone: ''
          })
          if (result.data.code === 'C0000') {
            this.headPic = result.data.data.head_pic
          }
        } catch (err) {
          console.log(err)
        }
      },
      async getFamilyList() {
        try {
          const result = await axios.get('/api/family')
          if (result.data.code === 'C0000') {
            this.associatedList = result.data.data[1]
            this.createdList = result.data.data[0]
          }
        } catch (err) {
          console.log(err)
        }
      },
      openAssociate() {
        this.$router.push({
          path: '/associatedFamilyS'
        })
      },
      openCreate() {
        this.$router.push({
          path: '/healthEntryFamily'
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
      skipTo(id) {
        window._member_id = id
        if (!id) {
					this.$router.push({
            name:'userInfo',
            params:{
            	member_id:id
            }
          })
       } else {
					this.$router.push({
            name:'editFamily',
            params:{
            	member_id:id
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
