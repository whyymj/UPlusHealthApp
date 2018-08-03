<template>

  <div class="page weight">
    <!-- <h-header title="体重"></h-header> -->
    <!--<loading :show="showLoading" text="加载中..."></loading>-->
    <div class="container has-footer">
      <div :class="['calendar-model', {'open': calendarOpen}]" id="calendarTop">
        <inline-calendar
          ref="calendar"
          @on-change="onChange"
          @on-view-change="onViewChange"
          class="inline-calendar-demo"
          :show.sync="show"
          v-model="value"
          start-date="2016-04-01"
          end-date="2020-05-30"
          :range="range"
          :show-last-month="showLastMonth"
          :show-next-month="showNextMonth"
          :highlight-weekend="highlightWeekend"
          :return-six-rows="return6Rows"
          :hide-header="hideHeader"
          :hide-week-list="hideWeekList"
          :replace-text-list="replaceTextList"
          :weeks-list="weeksList"
          :render-function="buildSlotFn"
          :disable-past="disablePast"
          :disable-future="disableFuture"
          :disable-weekend="disableWeekend"
          :disable-date-function="disableDateFunction">
        </inline-calendar>
        <div class="down-up-icon" @click="toggleOpenCalendar">
          <i class="fa fa-angle-down" v-show="!calendarOpen"></i>
          <i class="fa fa-angle-up" v-show="calendarOpen"></i>
        </div>
      </div>

      <div :class="['background', {'open' : calendarOpen}]" id="calendarBg" @click="toggleOpenCalendar"></div>

      <div :class="['calendar-below', {'open' : calendarOpen}]" id="calendarBelow">
        <!--no data-->
        <div ref="noData" class="weight-record no-record card-container">
          <div>
            <span>暂无数据，点击按钮去添加吧。</span>
            <button class="default-btn record-btn" @click="goManualEntry('entry-weight')">去添加</button>
          </div>
        </div>
        <!---->

        <div class="weight-list-c">
          <div v-for="(item, index) in weightRecordData" :key="index"
               :class="['weight-record-list', 'card-container']"
               @click="openHealthTips(item.weight.weight_id)">

            <mt-cell-swipe
              :right="[
                {
                    content: '<div class='+'record-delete'+'>'+
                              '<i class='+'icon-delete'+'></i>'+
                              '<span>不可恢复</span>'+
                            '</div>',
                    style: { background: '#FF475D', color: '#fff'},
                    handler: () => deleteRecord(index, item)
                }
            ]">
              <div
                :class="['record-item']">
                <div class="record-mmHg">
                  <div :class="[{'Standard-bg': item.suggestion.level === '1'},
                          {'up-bg': item.suggestion.level === '2' || item.suggestion.level === '-2'},
                          {'low-bg': item.suggestion.level === '3' || item.suggestion.level === '-3'},'icon-weight-c', 'text-center']">
                    <i class="icon-weight"></i>
                  </div>
                  <div class="mmHg">
                    <div>
                      {{item.weight.weight}} <span>kg</span>
                    </div>
                  </div>
                </div>
                <div class="record-heart text-right">
                  <div class="record-heart-value">
                    <span :class="[{'Standard-bg': item.suggestion.level === '1'},
                          {'up-bg': item.suggestion.level === '2' || item.suggestion.level === '-2'},
                          {'low-bg': item.suggestion.level === '3' || item.suggestion.level === '-3'}]">
                      {{item.suggestion.symptom}}
                    </span>
                  </div>
                  <div class="record-heart-time">
                    <span>测量时间</span><span>{{item.weight.create_date.split(' ')[1].slice(0, -3)}}</span>
                  </div>
                </div>
                <i class="fa fa-angle-right"></i>
              </div>
            </mt-cell-swipe>
            <div class="advise card-container">
              <h3 class="title">健康建议</h3>
              <p>{{item.suggestion.suggestion}}</p>
            </div>
          </div>
          <div ref="allData" class="weight-record-list card-container" style="display: none; min-height: 0" @click="fnGetAllData()">
            <p style="text-align: center; padding: .5rem; color: #b5b5b5;">
              查看全部数据
            </p>
          </div>
        </div>

        <div class="card-container weight-chart">
          <h2>趋势图</h2>
          <div class="chart-button-container clearfix">
            <span v-for="(option, index) in recordOptions" :key="index">
              <button :class="{active: option === selectedRecordOption}" @click="changeOption(option)">{{option}}</button>
            </span>
          </div>
          <!-- <div>
            <span>最近七次数据</span>
          </div> -->
          <div class="chart">
            <chart
              ref="weight"
              :options="weightChartsOption"
              :autoResize="true">
            </chart>

            <!--no data-->
            <div ref="noWeight" class="no-result-chart" style="display: none">
              <img src="../../assets/no-result-chart.png" alt="">
              <div class="title">记录体重后将在此看到变化曲线</div>
            </div>
            <!---->
          </div>
        </div>

        <div v-if="newsResult.length !== 0" class="card-container news">
          <h3 class="title">相关资讯</h3>
          <div v-for="(item, index) in newsResult" :key="index" class="img-container" @click="openDetail(item)">
            <img :src="`http://lifehaier.com${item.news_cover}`" alt="">
            <div class="description">
              <p>{{item.news_title}}</p>
              <div>
                <span v-for="(list, i) in item.news_keywords.split(',')" :key="i">{{list}}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

    <div class="popup-model concat">
      <mt-popup
        v-model="ChooseTypePopupVisible">
        <div class="add-new-device" @click="addNewDevice">
          <i class="icon-add-device"></i>
          <span>添加新设备</span>
        </div>
        <div class="add-recently-device" @click="addRecentlyDevice">
          <i class="icon-recently-add-device"></i>
          <span>最近添加设备</span>
        </div>
      </mt-popup>
    </div>

    <!--请开启手机蓝牙.-->
    <div class="popup-model bluetooth">
	    <mt-popup v-model="bluetoothVisible">
		    <div class="popup-bluetooth">
			    <div class="bluetooth-flg">
				    <div>
				    	<span class="icon-blue"></span>
				    </div>
			    </div>
			    <p class="bluetooth-title">请开启手机蓝牙</p>
			    <button @click="openBluetooth">开启蓝牙</button>
			    <p class="bluetooth-cancel" @click="bluetoothVisible = false"><span>取消</span></p>
		    </div>
	    </mt-popup>
    </div>

    <!--正在与设备进行连接.-->
    <div class="popup-model concat">
	    <mt-popup v-model="popupVisible">
		    <div class="popup-img concat-pad">
		    	<i class="icon-blue" ></i>
		    </div>
		    <p class="popup-tip">正在与设备进行连接......</p>
	    </mt-popup>
    </div>

    <!--连接失败.-->
    <div class="popup-model defeated">
	    <mt-popup
	    v-model="bluetoothFail">
		    <div class="popup-defeated">
		    <p class="defeated-title">连接失败</p>
		    <p class="defeated-tip">未找到设备</p>
		    <button>开启蓝牙</button>
		    <p class="bluetooth-cancel" @click="bluetoothFail = false"><span>取消</span></p>
		    </div>
	    </mt-popup>
    </div>

    <!--连接成功.-->
    <div class="popup-model concat">
      <mt-popup
        v-model="popupSuccess">
        <div class="popup-img popup-bg">
          <i class="icon-success popup-size"></i>
        </div>
        <p class="popup-tip">连接成功</p>
      </mt-popup>
    </div>


    <footer class="footer">
      <!-- <button class="device-input" @click="ChooseTypePopupVisible = true">设备录入</button> -->
      <button class="manual-input" @click="goManualEntry('entry-weight')">手动录入</button>
    </footer>
  </div>

</template>

<script type="text/javascript" src="./weight.js"></script>

<style lang="scss">
  @import "./weight.scss";
</style>
