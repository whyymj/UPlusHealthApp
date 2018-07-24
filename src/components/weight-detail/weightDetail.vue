<template>
  <div class="weight-detail">
    <!-- <h-header title="体重"></h-header> -->
    <div class="container" style="padding-top: 1rem">

      <div class="weight-detail-header">
        <div>
          <p class="weight-number">{{weightReport.weight}}</p>
          <p class="weight-fla">您当前的体重(KG)</p>
          <p class="weight-header-result weight-header-mar20" >
            <span v-show="weightIndex.score !== undefined && weightIndex.score !== 0"><span>身体得分</span><span class="weight-header-flg">{{weightIndex.score}}</span>分</span>
            <span><span>您的体型</span><span class="weight-header-flg">{{weightIndex.status}}</span></span>
          </p>
          <p class="weight-header-result" v-show="weightIndex.score !== undefined && weightIndex.score !== 0">
                <span v-if="weightReport.need_change < 0">
                  <!-- 达标需减重 -->
                  <span><i class="fa fa-long-arrow-down"></i>&nbsp;<span>达标需减重</span><span>{{Math.abs(weightReport.need_change)}}</span>kg</span>
                </span>
                <span v-else>
                  <span><i class="fa fa-long-arrow-up"></i>&nbsp;<span>达标需增重</span><span>{{Math.abs(weightReport.need_change)}}</span>kg</span>
                </span>
                <span v-if="weightReport.weight_change < 0">
                  <!-- 比上次轻了 -->
                  <span><i class="fa fa-long-arrow-up"></i>&nbsp;<span>比上次轻了</span><span>{{Math.abs(weightReport.weight_change)}}</span>kg</span>
                </span>
                <span v-else>
                  <span><i class="fa fa-long-arrow-up"></i>&nbsp;<span>比上次重了</span><span>{{Math.abs(weightReport.weight_change)}}</span>kg</span>
                </span>
          </p>
        </div>
      </div>
       <!-- 危险指标 -->
       <div ref="dangerType" class="no-kpi">
          <p class="kpi-title">危险指标</p>
          <div v-for="(item, index) in weightIndex.danger_list" :key="index" class="kpi-content" @click="openDangerTips(index + 1)">
            <div>
              <div class="left">
                 <div class="kpi-logo">
                   <span class="icon-weight" v-if="item.type === 'Muscle Weight'"></span>
                   <span class="icon-weight" v-if="item.name === '体重'"></span>
                   <span class="icon-basal-metabolism" v-if="item.name === '基础代谢'"></span>
                   <span class="icon-water-content-c" v-if="item.type === 'Moisture'"></span>
                   <span class="icon-bmi" v-if="item.type === 'BMI'"></span>
                   <span class="icon-protein" v-if="item.type === 'Protein'"></span>
                   <span v-if="item.type === 'Body Fat Rate'">%</span>
                   <span class="icon-basal-metabolism" v-if="item.type === 'Basal Metabolism'"></span>
                   <span class="icon-fat-weight" v-if="item.type === 'Fat Weight'"></span>
                   <span class="icon-visceral-fat" v-if="item.type === 'Visceral Fat Level'"></span>
                   <span class="icon-water-content" v-if="item.type === 'Water Content'"></span>
                   <span class="icon-bone-mass" v-if="item.type === 'Bone Weight'"></span>
                   <span class="icon-lean-body-weight" v-if="item.type === 'fat free weight'"></span>
                   <span class="icon-obesity" v-if="item.type === 'Obesity Level'"></span>
                   <span class="icon-muscle-rate" v-if="item.type === 'Muscle Rate'"></span>
                 </div>
                 <span class="kpi-item">{{item.name}}</span>
               </div>
              <div class="right">
                <span class="kpi-number">
                  {{item.data}}
                  <!--体脂率/水份/蛋白质:%-->
                   <span v-if="item.type === 'Body Fat Rate' || item.type === 'Moisture' || item.type === 'Protein'">%</span>
                  <!--骨量/水含量/脂肪重量/肌肉率/肌肉重量/肥胖度/去脂肪体重:kg-->
                   <span v-if="item.name === '体重' || item.type === 'Muscle Weight' || item.type === 'Bone Weight' || item.type === 'fat free weight'|| item.type === 'Obesity Level' || item.type === 'Muscle Weight' || item.name === '水含量' || item.type === 'Fat Weight' || item.type === 'Muscle Rate'">kg</span>
                  <!--内脏脂肪:级-->
                  <span v-if="item.type === 'Visceral Fat Level'">级</span>
                </span>
                 <span class="kpi-result chubby-bg" v-if="item.status === '偏胖'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result fat-bg" v-if="item.status === '肥胖'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result thinnish-bg" v-if="item.status === '不足'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result excellent-bg" v-if="item.status === '优'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result overproof-bg" v-if="item.status === '超标'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result fat-bg" v-if="item.status === '过多'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result thinnish-bg" v-if="item.status === '未达标'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result Standard-bg" v-if="item.status === '达标'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result thinnish-bg" v-if="item.status === '偏低'" >
                    <span>{{item.status}}</span>
                  </span>
                <span class="kpi-result chubby-bg" v-if="item.status === '偏高'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result skinny-bg" v-if="item.status === '消瘦'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result thinnish-bg" v-if="item.status === '偏瘦'" >
                    <span>{{item.status}}</span>
                  </span>
                <span class="kpi-result Standard-bg" v-if="item.status === '标准'" >
                    <span>{{item.status}}</span>
                  </span>
                  <span class="kpi-result overweight-bg" v-if="item.status === '超重'" >
                    <span>{{item.status}}</span>
                  </span>
                  <span class="kpi-result mild-bg" v-if="item.status === '轻度'" >
                    <span>{{item.status}}</span>
                  </span>
                  <span class="kpi-result chubby-bg" v-if="item.status === '中度'" >
                    <span>{{item.status}}</span>
                  </span>
                  <span class="kpi-result fat-bg" v-if="item.status === '重度'" >
                    <span>{{item.status}}</span>
                  </span>
                <i :class="index + 1 === dangerIndex ? 'fa fa-angle-down' : 'fa fa-angle-right'" style="width: .8rem"></i>
              </div>
            </div>
            <div class="imb-open" :style="{display: index + 1 === dangerIndex ? 'block' : 'none'}">
              <!-- 体重/体脂率/脂肪重量/BMI -->
              <div v-if="item.type === 'Weight' || item.type === 'BMI' || item.type === 'Fat Weight' || item.type === 'Body Fat Rate'">
                <div class="open-icon" >
                  <span class="thinnish-bg open-icon-line">
                    <span></span>
                    <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[0]}}</span>
                  </span>
                  <span class="Standard-bg open-icon-line">
                    <span>{{item.range[0]}}</span>
                    <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[1]}}</span>
                  </span>
                  <span class="chubby-bg open-icon-line">
                    <span>{{item.range[1]}}</span>
                    <span :class="item.status === item.range_describe[2] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[2]}}</span>
                  </span>
                  <span class="fat-bg open-icon-line">
                    <span>{{item.range[2]}}</span>
                    <span :class="item.status === item.range_describe[3] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[3]}}</span>
                  </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
              <!-- 水份/水含量/肌肉率/肌肉重量 -->
              <div v-else-if="item.type === 'Water Content' || item.type === 'Muscle Rate' || item.type === 'Moisture' || item.type === 'Muscle Weight'">
                <div class="open-icon open-icon2">
                    <span class="thinnish-bg open-icon-line">
                      <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                      <span>{{item.range_describe[0]}}</span>
                    </span>
                    <span class="Standard-bg open-icon-line">
                      <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                      <span>{{item.range_describe[1]}}</span>
                    </span>
                    <span class="excellent-bg open-icon-line">
                      <span :class="item.status === item.range_describe[2] ? 'triangle show' : 'triangle'"></span>
                      <span>{{item.range_describe[2]}}</span>
                    </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
              <!-- 内脏脂肪 -->
              <div v-else-if="item.type === 'Visceral Fat Level'">
                <div class="open-icon open-icon2">
                  <span class="Standard-bg open-icon-line">
                    <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[0]}}</span>
                  </span>
                  <span class="overproof-bg open-icon-line">
                    <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[1]}}</span>
                  </span>
                  <span class="fat-bg open-icon-line">
                    <span :class="item.status === item.range_describe[2] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[2]}}</span>
                  </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
              <!-- 基础代谢 -->
              <div v-else-if="item.type === 'Basal Metabolism'">
                <div class="open-icon open-icon3">
                  <span class="thinnish-bg open-icon-line">
                    <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[0]}}</span>
                  </span>
                  <span class="Standard-bg open-icon-line">
                    <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[1]}}</span>
                  </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
              <!-- 蛋白质 -->
              <div v-else-if="item.type === 'Protein'">
                <div class="open-icon open-icon2">
                  <span class="thinnish-bg open-icon-line">
                    <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[0]}}</span>
                  </span>
                  <span class="Standard-bg open-icon-line">
                    <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[1]}}</span>
                  </span>
                  <span class="chubby-bg open-icon-line">
                    <span :class="item.status === item.range_describe[2] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[2]}}</span>
                  </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
              <!-- 骨量 -->
              <div v-else-if="item.type === 'Bone Weight'">
                <div class="open-icon open-icon2">
                  <span class="thinnish-bg open-icon-line">
                    <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[0]}}</span>
                  </span>
                  <span class="Standard-bg open-icon-line">
                    <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[1]}}</span>
                  </span>
                  <span class="excellent-bg open-icon-line">
                    <span :class="item.status === item.range_describe[2] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[2]}}</span>
                  </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
              <!-- 肥胖度 -->
              <div v-else-if="item.type === 'Obesity Level'">
                <div class="open-icon open-icon4">
                  <span class="skinny-bg open-icon-line">
                    <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[0]}}</span>
                  </span>
                  <span class="thinnish-bg open-icon-line">
                    <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[1]}}</span>
                  </span>
                  <span class="Standard-bg open-icon-line">
                    <span :class="item.status === item.range_describe[2] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[2]}}</span>
                  </span>
                  <span class="overweight-bg open-icon-line">
                    <span :class="item.status === item.range_describe[3] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[3]}}</span>
                  </span>
                  <span class="mild-bg open-icon-line">
                    <span :class="item.status === item.range_describe[4] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[4]}}</span>
                  </span>
                  <span class="chubby-bg open-icon-line">
                    <span :class="item.status === item.range_describe[5] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[5]}}</span>
                  </span>
                  <span class="fat-bg open-icon-line">
                    <span :class="item.status === item.range_describe[6] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[6]}}</span>
                  </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
            </div>
          </div>
       </div>
       <!-- 正常指标 -->
       <div ref="normalType" class="kpi">
          <p class="kpi-title">正常指标</p>

          <div v-for="(item, index) in weightIndex.normal_list" :key="index" class="kpi-content" @click="openNormalTips(index + 1)">
            <div>
              <div class="left">
                 <div class="kpi-logo">
                   <span class="icon-weight" v-if="item.type === 'Muscle Weight'"></span>
                   <span class="icon-weight" v-if="item.name === '体重'"></span>
                   <span class="icon-basal-metabolism" v-if="item.name === '基础代谢'"></span>
                   <span class="icon-water-content-c" v-if="item.type === 'Moisture'"></span>
                   <span class="icon-bmi" v-if="item.type === 'BMI'"></span>
                   <span class="icon-protein" v-if="item.type === 'Protein'"></span>
                   <span v-if="item.type === 'Body Fat Rate'">%</span>
                   <span class="icon-basal-metabolism" v-if="item.type === 'Basal Metabolism'"></span>
                   <span class="icon-fat-weight" v-if="item.type === 'Fat Weight'"></span>
                   <span class="icon-visceral-fat" v-if="item.type === 'Visceral Fat Level'"></span>
                   <span class="icon-water-content" v-if="item.type === 'Water Content'"></span>
                   <span class="icon-bone-mass" v-if="item.type === 'Bone Weight'"></span>
                   <span class="icon-lean-body-weight" v-if="item.type === 'fat free weight'"></span>
                   <span class="icon-obesity" v-if="item.type === 'Obesity Level'"></span>
                   <span class="icon-muscle-rate" v-if="item.type === 'Muscle Rate'"></span>
                 </div>
                 <span class="kpi-item">{{item.name}}</span>
               </div>
              <div class="right">
                <span class="kpi-number">
                  {{item.data}}
                  <!--体脂率/水份/蛋白质:%-->
                   <span v-if="item.type === 'Body Fat Rate' || item.type === 'Moisture' || item.type === 'Protein'">%</span>
                  <!--骨量/水含量/脂肪重量/肌肉率/肌肉重量/肥胖度/去脂肪体重:kg-->
                   <span v-if="item.name === '体重' || item.type === 'Muscle Weight' || item.type === 'Bone Weight' || item.type === 'fat free weight'|| item.type === 'Obesity Level' || item.type === 'Muscle Weight' || item.name === '水含量' || item.type === 'Fat Weight' || item.type === 'Muscle Rate'">kg</span>
                  <!--内脏脂肪:级-->
                  <span v-if="item.type === 'Visceral Fat Level'">级</span>
                </span>
                <span class="kpi-result chubby-bg" v-if="item.status === '偏胖'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result fat-bg" v-if="item.status === '肥胖'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result thinnish-bg" v-if="item.status === '不足'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result excellent-bg" v-if="item.status === '优'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result overproof-bg" v-if="item.status === '超标'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result fat-bg" v-if="item.status === '过多'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result thinnish-bg" v-if="item.status === '未达标'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result Standard-bg" v-if="item.status === '达标'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result thinnish-bg" v-if="item.status === '偏低'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result chubby-bg" v-if="item.status === '偏高'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result skinny-bg" v-if="item.status === '消瘦'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result thinnish-bg" v-if="item.status === '偏瘦'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result Standard-bg" v-if="item.status === '标准'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result overweight-bg" v-if="item.status === '超重'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result mild-bg" v-if="item.status === '轻度'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result chubby-bg" v-if="item.status === '中度'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result fat-bg" v-if="item.status === '重度'" >
                  <span>{{item.status}}</span>
                </span>
                <i :class="index + 1 === normalIndex ? 'fa fa-angle-down' : 'fa fa-angle-right'" style="width: .8rem"></i>
              </div>
            </div>
            <div class="imb-open" :style="{display: index + 1 === normalIndex ? 'block' : 'none'}">
              <!-- 体重/体脂率/脂肪重量/BMI -->
              <div v-if="item.type === 'Weight' || item.type === 'BMI' || item.type === 'Fat Weight' || item.type === 'Body Fat Rate'">
                <div class="open-icon" >
                  <span class="thinnish-bg open-icon-line">
                    <span></span>
                    <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[0]}}</span>
                  </span>
                  <span class="Standard-bg open-icon-line">
                    <span>{{item.range[0]}}</span>
                    <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[1]}}</span>
                  </span>
                  <span class="chubby-bg open-icon-line">
                    <span>{{item.range[1]}}</span>
                    <span :class="item.status === item.range_describe[2] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[2]}}</span>
                  </span>
                  <span class="fat-bg open-icon-line">
                    <span>{{item.range[2]}}</span>
                    <span :class="item.status === item.range_describe[3] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[3]}}</span>
                  </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
              <!-- 水份/水含量/肌肉率/肌肉重量 -->
              <div v-else-if="item.type === 'Water Content' || item.type === 'Muscle Rate' || item.type === 'Moisture' || item.type === 'Muscle Weight'">
                <div class="open-icon open-icon2">
                    <span class="thinnish-bg open-icon-line">
                      <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                      <span>{{item.range_describe[0]}}</span>
                    </span>
                    <span class="Standard-bg open-icon-line">
                      <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                      <span>{{item.range_describe[1]}}</span>
                    </span>
                    <span class="excellent-bg open-icon-line">
                      <span :class="item.status === item.range_describe[2] ? 'triangle show' : 'triangle'"></span>
                      <span>{{item.range_describe[2]}}</span>
                    </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
              <!-- 内脏脂肪 -->
              <div v-else-if="item.type === 'Visceral Fat Level'">
                <div class="open-icon open-icon2">
                  <span class="Standard-bg open-icon-line">
                    <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[0]}}</span>
                  </span>
                  <span class="overproof-bg open-icon-line">
                    <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[1]}}</span>
                  </span>
                  <span class="fat-bg open-icon-line">
                    <span :class="item.status === item.range_describe[2] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[2]}}</span>
                  </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
              <!-- 基础代谢 -->
              <div v-else-if="item.type === 'Basal Metabolism'">
                <div class="open-icon open-icon3">
                  <span class="thinnish-bg open-icon-line">
                    <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[0]}}</span>
                  </span>
                  <span class="Standard-bg open-icon-line">
                    <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[1]}}</span>
                  </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
              <!-- 蛋白质 -->
              <div v-else-if="item.type === 'Protein'">
                <div class="open-icon open-icon2">
                  <span class="thinnish-bg open-icon-line">
                    <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[0]}}</span>
                  </span>
                  <span class="Standard-bg open-icon-line">
                    <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[1]}}</span>
                  </span>
                  <span class="chubby-bg open-icon-line">
                    <span :class="item.status === item.range_describe[2] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[2]}}</span>
                  </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
              <!-- 骨量 -->
              <div v-else-if="item.type === 'Bone Weight'">
                <div class="open-icon open-icon2">
                  <span class="thinnish-bg open-icon-line">
                    <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[0]}}</span>
                  </span>
                  <span class="Standard-bg open-icon-line">
                    <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[1]}}</span>
                  </span>
                  <span class="excellent-bg open-icon-line">
                    <span :class="item.status === item.range_describe[2] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[2]}}</span>
                  </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
              <!-- 肥胖度 -->
              <div v-else-if="item.type === 'Obesity Level'">
                <div class="open-icon open-icon4">
                  <span class="skinny-bg open-icon-line">
                    <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[0]}}</span>
                  </span>
                  <span class="thinnish-bg open-icon-line">
                    <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[1]}}</span>
                  </span>
                  <span class="Standard-bg open-icon-line">
                    <span :class="item.status === item.range_describe[2] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[2]}}</span>
                  </span>
                  <span class="overweight-bg open-icon-line">
                    <span :class="item.status === item.range_describe[3] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[3]}}</span>
                  </span>
                  <span class="mild-bg open-icon-line">
                    <span :class="item.status === item.range_describe[4] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[4]}}</span>
                  </span>
                  <span class="chubby-bg open-icon-line">
                    <span :class="item.status === item.range_describe[5] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[5]}}</span>
                  </span>
                  <span class="fat-bg open-icon-line">
                    <span :class="item.status === item.range_describe[6] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[6]}}</span>
                  </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
            </div>
          </div>

       </div>
       <!-- 警告指标 -->
       <div ref="seriousType" class="other-kpi">
          <p class="kpi-title">警告指标</p>

          <div v-for="(item, index) in weightIndex.serious_list" :key="index" class="kpi-content" @click="openSeriousTips(index + 1)">
            <div>
              <div class="left">
                 <div class="kpi-logo">
                   <span class="icon-weight" v-if="item.type === 'Muscle Weight'"></span>
                   <span class="icon-weight" v-if="item.name === '体重'"></span>
                   <span class="icon-basal-metabolism" v-if="item.name === '基础代谢'"></span>
                   <span class="icon-water-content-c" v-if="item.type === 'Moisture'"></span>
                   <span class="icon-bmi" v-if="item.type === 'BMI'"></span>
                   <span class="icon-protein" v-if="item.type === 'Protein'"></span>
                   <span v-if="item.type === 'Body Fat Rate'">%</span>
                   <span class="icon-basal-metabolism" v-if="item.type === 'Basal Metabolism'"></span>
                   <span class="icon-fat-weight" v-if="item.type === 'Fat Weight'"></span>
                   <span class="icon-visceral-fat" v-if="item.type === 'Visceral Fat Level'"></span>
                   <span class="icon-water-content" v-if="item.type === 'Water Content'"></span>
                   <span class="icon-bone-mass" v-if="item.type === 'Bone Weight'"></span>
                   <span class="icon-lean-body-weight" v-if="item.type === 'fat free weight'"></span>
                   <span class="icon-obesity" v-if="item.type === 'Obesity Level'"></span>
                   <span class="icon-muscle-rate" v-if="item.type === 'Muscle Rate'"></span>
                 </div>
                 <span class="kpi-item">
                   {{item.name}}
                 </span>
               </div>
              <div class="right">
                <span class="kpi-number">
                  {{item.data}}
                  <!--体脂率/水份/蛋白质:%-->
                   <span v-if="item.type === 'Body Fat Rate' || item.type === 'Moisture' || item.type === 'Protein'">%</span>
                  <!--骨量/水含量/脂肪重量/肌肉率/肌肉重量/肥胖度/去脂肪体重:kg-->
                   <span v-if="item.name === '体重' || item.type === 'Muscle Weight' || item.type === 'Bone Weight' || item.type === 'fat free weight'|| item.type === 'Obesity Level' || item.type === 'Muscle Weight' || item.name === '水含量' || item.type === 'Fat Weight' || item.type === 'Muscle Rate'">kg</span>
                  <!--内脏脂肪:级-->
                  <span v-if="item.type === 'Visceral Fat Level'">级</span>
                </span>
                 <span class="kpi-result chubby-bg" v-if="item.status === '偏胖'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result fat-bg" v-if="item.status === '肥胖'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result thinnish-bg" v-if="item.status === '不足'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result excellent-bg" v-if="item.status === '优'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result overproof-bg" v-if="item.status === '超标'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result fat-bg" v-if="item.status === '过多'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result thinnish-bg" v-if="item.status === '未达标'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result Standard-bg" v-if="item.status === '达标'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result thinnish-bg" v-if="item.status === '偏低'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result chubby-bg" v-if="item.status === '偏高'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result skinny-bg" v-if="item.status === '消瘦'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result thinnish-bg" v-if="item.status === '偏瘦'" >
                    <span>{{item.status}}</span>
                  </span>
                 <span class="kpi-result Standard-bg" v-if="item.status === '标准'" >
                    <span>{{item.status}}</span>
                  </span>
                <span class="kpi-result overweight-bg" v-if="item.status === '超重'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result mild-bg" v-if="item.status === '轻度'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result chubby-bg" v-if="item.status === '中度'" >
                  <span>{{item.status}}</span>
                </span>
                <span class="kpi-result fat-bg" v-if="item.status === '重度'" >
                  <span>{{item.status}}</span>
                </span>
                <i :class="index + 1 === seriousIndex ? 'fa fa-angle-down' : 'fa fa-angle-right'" style="width: .8rem"></i>
              </div>
            </div>
            <div class="imb-open" :style="{display: index + 1 === seriousIndex ? 'block' : 'none'}">
              <!-- 体重/体脂率/脂肪重量/BMI -->
              <div v-if="item.type === 'Weight' || item.type === 'BMI' || item.type === 'Fat Weight' || item.type === 'Body Fat Rate'">
                <div class="open-icon" >
                  <span class="thinnish-bg open-icon-line">
                    <span></span>
                    <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[0]}}</span>
                  </span>
                  <span class="Standard-bg open-icon-line">
                    <span>{{item.range[0]}}</span>
                    <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[1]}}</span>
                  </span>
                  <span class="chubby-bg open-icon-line">
                    <span>{{item.range[1]}}</span>
                    <span :class="item.status === item.range_describe[2] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[2]}}</span>
                  </span>
                  <span class="fat-bg open-icon-line">
                    <span>{{item.range[2]}}</span>
                    <span :class="item.status === item.range_describe[3] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[3]}}</span>
                  </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
              <!-- 水份/水含量/肌肉率/肌肉重量 -->
              <div v-else-if="item.type === 'Water Content' || item.type === 'Muscle Rate' || item.type === 'Moisture' || item.type === 'Muscle Weight'">
                <div class="open-icon open-icon2">
                    <span class="thinnish-bg open-icon-line">
                      <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                      <span>{{item.range_describe[0]}}</span>
                    </span>
                    <span class="Standard-bg open-icon-line">
                      <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                      <span>{{item.range_describe[1]}}</span>
                    </span>
                    <span class="excellent-bg open-icon-line">
                      <span :class="item.status === item.range_describe[2] ? 'triangle show' : 'triangle'"></span>
                      <span>{{item.range_describe[2]}}</span>
                    </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
              <!-- 内脏脂肪 -->
              <div v-else-if="item.type === 'Visceral Fat Level'">
                <div class="open-icon open-icon2">
                  <span class="Standard-bg open-icon-line">
                    <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[0]}}</span>
                  </span>
                  <span class="overproof-bg open-icon-line">
                    <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[1]}}</span>
                  </span>
                  <span class="fat-bg open-icon-line">
                    <span :class="item.status === item.range_describe[2] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[2]}}</span>
                  </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
              <!-- 基础代谢 -->
              <div v-else-if="item.type === 'Basal Metabolism'">
                <div class="open-icon open-icon3">
                  <span class="thinnish-bg open-icon-line">
                    <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[0]}}</span>
                  </span>
                  <span class="Standard-bg open-icon-line">
                    <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[1]}}</span>
                  </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
              <!-- 蛋白质 -->
              <div v-else-if="item.type === 'Protein'">
                <div class="open-icon open-icon2">
                  <span class="thinnish-bg open-icon-line">
                    <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[0]}}</span>
                  </span>
                  <span class="Standard-bg open-icon-line">
                    <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[1]}}</span>
                  </span>
                  <span class="chubby-bg open-icon-line">
                    <span :class="item.status === item.range_describe[2] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[2]}}</span>
                  </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
              <!-- 骨量 -->
              <div v-else-if="item.type === 'Bone Weight'">
                <div class="open-icon open-icon2">
                  <span class="thinnish-bg open-icon-line">
                    <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[0]}}</span>
                  </span>
                  <span class="Standard-bg open-icon-line">
                    <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[1]}}</span>
                  </span>
                  <span class="excellent-bg open-icon-line">
                    <span :class="item.status === item.range_describe[2] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[2]}}</span>
                  </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
              <!-- 肥胖度 -->
              <div v-else-if="item.type === 'Obesity Level'">
                <div class="open-icon open-icon4">
                  <span class="skinny-bg open-icon-line">
                    <span :class="item.status === item.range_describe[0] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[0]}}</span>
                  </span>
                  <span class="thinnish-bg open-icon-line">
                    <span :class="item.status === item.range_describe[1] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[1]}}</span>
                  </span>
                  <span class="Standard-bg open-icon-line">
                    <span :class="item.status === item.range_describe[2] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[2]}}</span>
                  </span>
                  <span class="overweight-bg open-icon-line">
                    <span :class="item.status === item.range_describe[3] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[3]}}</span>
                  </span>
                  <span class="mild-bg open-icon-line">
                    <span :class="item.status === item.range_describe[4] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[4]}}</span>
                  </span>
                  <span class="chubby-bg open-icon-line">
                    <span :class="item.status === item.range_describe[5] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[5]}}</span>
                  </span>
                  <span class="fat-bg open-icon-line">
                    <span :class="item.status === item.range_describe[6] ? 'triangle show' : 'triangle'"></span>
                    <span>{{item.range_describe[6]}}</span>
                  </span>
                </div>
                <div style="margin: 1rem">
                  {{item.suggestion}}
                </div>
              </div>
            </div>
          </div>

      </div>

      <div class="keep-weight">
        <p class="keep-weight-title">控制体重</p>

        <div class="keep-weight-item">
           <div class="line-top" style="margin-left:calc(50% - 2.2rem);">
             <span class="keep-weight-icon  fat-bg" v-if="weightReport.need_change < 0">
               <span>需减重</span>
             </span>
              <span class="keep-weight-icon thinnish-bg" v-if="weightReport.need_change > 0">
               <span>需增重</span>
             </span>
             <span class="keep-weight-icon Standard-bg" v-if="weightReport.need_change===0">
               <span>标准</span>
             </span>
             <span class="keep-weight-number">{{Math.abs(weightReport.need_change)}}kg</span>
            </div>
            <mt-progress :value="progessValue" :bar-height="5" class="fat" v-if="weightReport.need_change < 0"></mt-progress>
            <mt-progress :value="progessValue" :bar-height="5" class="thinnish" v-if="weightReport.need_change > 0"></mt-progress>
            <mt-progress :value="progessValue" :bar-height="5" class="Standard" v-if="weightReport.need_change === 0"></mt-progress>
            <div class="line-bottom">
               <span>体重: {{weightReport.weight}}kg</span>
               <span>标准值: {{weightReport.standard_weight}}kg</span>
            </div>
           </div>
      </div>

      <!-- <div class="component-analysis">
        <p class="component-analysis-title">成分分析</p>
        <div id="component">
            <chart
                :options="option"
                :autoResize="true">
            </chart>
        </div>
      </div> -->

    </div>
  </div>
</template>

<script type="text/javascript" src="./weightDetail.js"></script>

<style lang="scss">
  @import "./weightDetail.scss";
</style>
