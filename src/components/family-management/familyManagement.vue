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
    <footer class="footer">
      <button class="confirm" @click="showDelete()">{{editText}}</button>
    </footer>
  </div>

</template>

<script type="text/javascript">
  import axios from 'axios'
  import { MessageBox } from 'mint-ui'

  export default {
    name: 'family-management',
    data() {
      return {
        isModel: null,
        isDelete: false,
        editText: '编辑',
        createdList: [],
        associatedList: [],
        headPic: '',
        memberList: ''
      }
    },
    created() {
    },
    mounted () {
      // init family list && window.localStorage.getItem('newUser')
      this.getFamilyList()
      this.initUserInfo()
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
      async initUserInfo () {
        try {
          const result = await axios.post('/api/user/info', {phone: ''})
          if (result.data.code === 'C0000') {
            this.headPic = result.data.data.head_pic
          }
        } catch (err) {
          console.log(err)
        }
      },
      async getFamilyList () {
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
      openAssociate () {
        this.$router.push({path: '/associatedFamilyS'})
      },
      openCreate () {
        this.$router.push({path: '/createFamily'})
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
      skipTo (id) {
        window._member_id = id
      	this.$router.push({path: `/healthRecordsB`})
      },
      async showDelete () {
      	this.isDelete = !this.isDelete
      	if (this.isDelete) {
      		this.editText = '保存'
      	} else {
          if (this.memberList === '') {
            this.editText = '编辑'
          } else {
            //这里做删除
            try {
              const result = await axios.post('/api/member/delete', {memberList: this.memberList.substring(0, this.memberList.length - 1)})
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
</style>
