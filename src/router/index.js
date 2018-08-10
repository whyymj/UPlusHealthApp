import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const pressure = resolve => require(['@/components/pressure/pressure.vue'], resolve)
const bloodSugar = resolve => require(['@/components/blood-sugar/bloodSugar.vue'], resolve)
const oxygen = resolve => require(['@/components/oxygen/oxygen.vue'], resolve)
const ecg = resolve => require(['@/components/ECG/ECG.vue'], resolve)
const temperature = resolve => require(['@/components/temperature/temperature.vue'], resolve)
const weight = resolve => require(['@/components/weight/weight.vue'], resolve)
const weightDetail = resolve => require(['@/components/weight-detail/weightDetail.vue'], resolve)
const setTargetWeight = resolve => require(['@/components/set-target-weight/setTargetWeight.vue'], resolve)
const introduction = resolve => require(['@/components/introduction/introduction.vue'], resolve)
const createCharacter = resolve => require(['@/components/create-character/createCharacter.vue'], resolve)
const createFamily = resolve => require(['@/components/create-family/createFamily.vue'], resolve)
// const healthRecordsB = resolve => require(['@/components/health-records-body/healthRecordsB.vue'], resolve)

const healthRecordsB = resolve => require(['@/components/health-archives/healthArchives.vue'], resolve)
const healthRecordsL = resolve => require(['@/components/health-records-list/healthRecordsL.vue'], resolve)
const addProject = resolve => require(['@/components/add-project/addProject.vue'], resolve)
const manualEntry = resolve => require(['@/components/manual-entry/manualEntry.vue'], resolve)
const familyManagement = resolve => require(['@/components/family-management/familyManagement.vue'], resolve)
const associatedFamilyS = resolve => require(['@/components/associated-family-search/associatedFamilyS.vue'], resolve)
const associatedFamilyR = resolve => require(['@/components/associated-family-result/associatedFamilyR.vue'], resolve)
const associationRequest = resolve => require(['@/components/association-request/associationRequest.vue'], resolve)
const associatedFamilyV = resolve => require(['@/components/associated-family-verification/associatedFamilyV.vue'], resolve)
const login = resolve => require(['@/components/login/login.vue'], resolve)
const bloodSugarHistory = resolve => require(['@/components/blood-sugar/historyData.vue'], resolve)
const ECGHistory = resolve => require(['@/components/ECG/historyData.vue'], resolve)
const oxygenHistory = resolve => require(['@/components/oxygen/historyData.vue'], resolve)
const pressureHistory = resolve => require(['@/components/pressure/historyData.vue'], resolve)
const temperatureHistory = resolve => require(['@/components/temperature/historyData.vue'], resolve)
const weightHistory = resolve => require(['@/components/weight/historyData.vue'], resolve)
const deviceType = resolve => require(['@/components/equipment-entry/device-type/deviceType.vue'], resolve)
const chooseDevice = resolve => require(['@/components/equipment-entry/choose-device/chooseDevice.vue'], resolve)
const searchDevice = resolve => require(['@/components/equipment-entry/search-device/searchDevice.vue'], resolve)
const noSearchDevice = resolve => require(['@/components/equipment-entry/no-search-device/noSearchDevice.vue'], resolve)
const startTest = resolve => require(['@/components/equipment-entry/start-test/startTest.vue'], resolve)
const newAddReport = resolve => require(['@/components/new-add-report/newSleepReport.vue'], resolve)
const sleepTest = resolve => require(['@/components/sleep-test/sleepTest.vue'], resolve)
const sleepManuInput = resolve => require(['@/components/sleep-manu-input/sleepManuInput.vue'], resolve)
const sleepMusicList = resolve => require(['@/components/sleep-music/sleepMusicList.vue'], resolve)
const sleepMusicPlayerPanel = resolve => require(['@/components/sleep-music/sleepMusicPlayerPanel.vue'], resolve)
const healthArchives = resolve => require(['@/components/health-archives/healthArchives.vue'], resolve)
const enterToTest = resolve => require(['@/components/sleep-test/enterToTest.vue'], resolve)
const sleepTestResult = resolve => require(['@/components/sleep-test/testResult.vue'], resolve)
const test = resolve => require(['@/components/test.vue'], resolve)
const test1 = resolve => require(['@/components/test1.vue'], resolve)
const test2 = resolve => require(['@/components/test2.vue'], resolve)
//个人资料
const userInfo = resolve => require(['@/components/user-info/userInfo.vue'], resolve)
const allergic = resolve => require(['@/components/user-info/allergic/allergic.vue'], resolve)
const chronicDisease = resolve => require(['@/components/user-info/chronicDisease/chronicDisease.vue'], resolve)
//上传头像 
const headerImg = resolve => require(['@/components/user-info/headerImg.vue'], resolve)
//隐私设置 privacySet
const privacySet = resolve => require(['@/components/user-info/privacySet.vue'], resolve)
const healthEntryFamily = resolve => require(['@/components/health-entry/health-entry-family/healthEntryFamily.vue'], resolve)
const healthEntryMy = resolve => require(['@/components/health-entry/health-entry-my/healthEntryMy.vue'], resolve)
const sleepCyclopedia = resolve => require(['@/components/sleep-cyclopedia/sleepCyclopedia.vue'], resolve)
const errorMessage = resolve => require(['@/components/error-message/errorMessage.vue'], resolve)
const weightMeasure = resolve => require(['@/components/weight-measure/weight-measure/weightMeasure.vue'], resolve)
const serverError=resolve => require(['@/components/error-message/serverError.vue'], resolve)

const editFamily=resolve => require(['@/components/user-info/editFamily.vue'], resolve)

const router = new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '*',
    //   redirect: '/'
    // }, {
    //   path: '/',
    //   redirect: 'login'
    // }, {
    //   path: '/test',
    //   name: 'test',
    //   component: test
    // }, {
    //   path: '/login',
    //   name: 'login',
    //   meta: {
    //     title: '海尔健康'
    //   },
    //   component: login
    // },
    {
      path: '/introduction',
      name: 'introduction',
      meta: {
        title: '海尔健康'
      },
      component: introduction
    }, {
      path: '/createCharacter',
      name: 'createCharacter',
      meta: {
        title: '健康档案'
      },
      component: createCharacter
    }, {
      path: '/createFamily',
      name: 'createFamily',
      meta: {
        title: '创建家人'
      },
      component: createFamily
    }, {
      path: '/healthRecordsB',
      name: 'healthRecordsB',
      meta: {
        title: '健康档案'
      },
      component: healthRecordsB
    }, {
      path: '/healthRecordsL',
      name: 'healthRecordsL',
      meta: {
        title: '健康档案'
      },
      component: healthRecordsL
    },
    // {
    //   path: '/addProject',
    //   name: 'addProject',
    //   meta: {
    //     title: '添加项目'
    //   },
    //   component: addProject
    // },
    {
      path: '/manualEntry/:type?',
      name: 'manualEntry',
      meta: {
        title: '手动录入'
      },
      component: manualEntry
    },
    {
      path: '/familyManagement',
      name: 'familyManagement',
      meta: {
        title: '家人管理'
      },
      component: familyManagement
    }, {
      path: '/associatedFamilyS',
      name: 'associatedFamilyS',
      meta: {
        title: '关联家人'
      },
      component: associatedFamilyS
    }, {
      path: '/associatedFamilyR/:phone',
      name: 'associatedFamilyR',
      meta: {
        title: '关联家人'
      },
      component: associatedFamilyR
    },
    {
      path: '/associationRequest/:phone',
      name: 'associationRequest',
      meta: {
        title: '关联请求'
      },
      component: associationRequest
    }, {
      path: '/associatedFamilyV',
      name: 'associatedFamilyV',
      component: associatedFamilyV
    }, {
      path: '/pressure',
      name: 'pressure',
      meta: {
        title: '血压'
      },
      component: pressure
    }, {
      path: '/pressure/history/:date',
      name: 'pressureHistory',
      meta: {
        title: '全部数据'
      },
      component: pressureHistory
    }, {
      path: '/bloodSugar',
      name: 'bloodSugar',
      meta: {
        title: '血糖'
      },
      component: bloodSugar
    }, {
      path: '/bloodSugar/history/:date',
      name: 'bloodSugarHistory',
      meta: {
        title: '全部数据'
      },
      component: bloodSugarHistory
    }, {
      path: '/oxygen',
      name: 'oxygen',
      meta: {
        title: '血氧'
      },
      component: oxygen
    }, {
      path: '/oxygen/history/:date',
      name: 'oxygenHistory',
      meta: {
        title: '全部数据'
      },
      component: oxygenHistory
    }, {
      path: '/ecg',
      name: 'ecg',
      meta: {
        title: '心电'
      },
      component: ecg
    }, {
      path: '/ecg/history/:date',
      name: 'ECGHistory',
      meta: {
        title: '全部数据'
      },
      component: ECGHistory
    }, {
      path: '/temperature',
      name: 'temperature',
      meta: {
        title: '体温'
      },
      component: temperature
    }, {
      path: '/temperature/history/:date',
      name: 'temperatureHistory',
      meta: {
        title: '全部数据'
      },
      component: temperatureHistory
    }, {
      path: '/weight',
      name: 'weight',
      meta: {
        title: '体重'
      },
      component: weight
    }, {
      path: '/weight/history/:date',
      name: 'weightHistory',
      meta: {
        title: '全部数据'
      },
      component: weightHistory
    }, {
      path: '/weightDetail/:weight_id',
      name: 'weightDetail',
      meta: {
        title: '体重'
      },
      component: weightDetail
    }, {
      path: '/setTargetWeight',
      name: 'setTargetWeight',
      meta: {
        title: '设置目标体重'
      },
      component: setTargetWeight
    }, {
      path: '/chooseDevice/:index',
      name: 'chooseDevice',
      meta: {
        title: '选择设备'
      },
      component: chooseDevice
    }, {
      path: '/deviceType',
      name: 'deviceType',
      meta: {
        title: '选择设备'
      },
      component: deviceType
    }, {
      path: '/searchDevice/:index',
      name: 'searchDevice',
      meta: {
        title: '选择设备'
      },
      component: searchDevice
    }, {
      path: '/noSearchDevice/:index?',
      name: 'noSearchDevice',
      meta: {
        title: '选择设备'
      },
      component: noSearchDevice
    }, {
      path: '/startTest',
      name: 'startTest',
      meta: {
        title: '健康监测'
      },
      component: startTest
    }, {
      path: '/newAddReport',
      name: 'newAddReport',
      meta: {
        title: '新增睡眠报告'
      },
      component: newAddReport
    }, {
      path: '/healthArchives',
      name: 'healthArchives',
      meta: {
        title: '健康档案'
      },
      component: healthArchives
    }, {
      path: '/sleepTest',
      name: 'sleepTest',
      meta: {
        title: '睡眠测试'
      },
      component: sleepTest
    }, {
      path: '/sleepManuInput',
      name: 'sleepManuInput',
      meta: {
        title: '手动录入'
      },
      component: sleepManuInput
    }, {
      path: '/sleepMusicList',
      name: 'sleepMusicList',
      meta: {
        title: '睡眠'
      },
      component: sleepMusicList
    }, {
      path: '/sleepMusicPlayerPanel',
      name: 'sleepMusicPlayerPanel',
      meta: {
        title: '睡眠音乐'
      },
      component: sleepMusicPlayerPanel
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      meta: {
        title: '个人资料'
      },
      component: userInfo
    },
    {
      path: '/headerImg',
      name: 'headerImg',
      meta: {
        title: '上传图片'
      },
      component: headerImg
    },
    {
      path: '/privacySet',
      name: 'privacySet',
      meta: {
        title: '隐私设置'
      },
      component: privacySet
    },
    {
      path: '/allergic',
      name: 'allergic',
      meta: {
        title: '过敏史'
      },
      component: allergic
    },
    {
      path: '/chronicDisease',
      name: 'chronicDisease',
      meta: {
        title: '慢病史'
      },
      component: chronicDisease
    },
    {
      path: '/sleepCyclopedia',
      name: 'sleepCyclopedia',
      meta: { title: '睡眠百科' },
      component: sleepCyclopedia
    },
    {
      path: '/healthEntryMy',
      name: 'healthEntryMy',
      meta: { title: '健康档案入口创建角色' },
      component: healthEntryMy
    },
    {
      path: '/healthEntryFamily',
      name: 'healthEntryFamily',
      meta: { title: '健康档案入口创建家人' },
      component: healthEntryFamily
    },
    {
      path: '/errorMessage',
      name: 'errorMessage',
      meta: { title: '错误信息' },
      component: errorMessage
    },{
      path: '/serverError',
      name: 'serverError',
      meta: { title: '服务器出错了' },
      component: serverError
    },
    {
      path: '/weightMeasure',
      name: 'weightMeasure',
      meta: { title: '渐轻入口' },
      component: weightMeasure
    },{
      path: '/enterToTest',
      name: 'enterToTest',
      meta: { title: '睡眠测试' },
      component: enterToTest
    },{
      path: '/sleepTestResult',
      name: 'sleepTestResult',
      meta: { title: '睡眠测试' },
      component: sleepTestResult
    },{
      path: '/test1',
      name: 'test1',
      meta: { title: 'camera测试' },
      component: test1
    },{
      path: '/editFamily',
      name: 'editFamily',
      meta: { title: '修改家人资料' },
      component: editFamily
    },{
      path: '/test2',
      name: 'test2',
      meta: { title: '音频播放测试' },
      component: test2
    },

  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
