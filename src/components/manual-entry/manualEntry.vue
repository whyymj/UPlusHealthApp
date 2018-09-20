<template>
	<div ref="manualEntry" class="page manual-entry">
		<!-- <h-header title="手动录入"></h-header> -->
		<div class="container manual-container has-footer">
			<div class="entry-tabs" :class="[{'hide': hasTabHeader}]">
				<div class="tabs text-center">
					<div class="tab" :class="[{'active': showType === 'entry-sugar'}]" @click="changeTab($event)" data-tabs="entry-sugar"><i class="icon-blood-sugar"></i></div>
					<span>血糖</span>
				</div>
				<div class="tabs text-center">
					<div class="tab" :class="[{'active': showType === 'entry-pressure'}]" @click="changeTab($event)" data-tabs="entry-pressure"><i class="icon-pressure"></i></div>
					<span>血压</span>
				</div>
				<div class="tabs text-center">
					<div class="tab" :class="[{'active': showType === 'entry-temperature'}]" @click="changeTab($event)" data-tabs="entry-temperature"><i class="icon-temperature"></i></div>
					<span>体温</span>
				</div>
				<div class="tabs text-center">
					<div class="tab" :class="[{'active': showType === 'entry-weight'}]" @click="changeTab($event)" data-tabs="entry-weight"><i class="icon-weight"></i></div>
					<span>体重</span>
				</div>
			</div>
			<div class="tabs-container">
				<!--血糖-->
				<div class="entry-tab" :class="{'entry-tab-show': showType === 'entry-sugar'}">
					<div class="picker-container">
						<div class="ruler-wrap">
							<swiper :options="rulerOption" ref="sugerSwiper">
								<div class="swiper-pagination" slot="pagination"></div>
							</swiper>
							<div class="ruler-pointer"></div>
							<div class="ruler-tips">左右滑动改变血糖</div>
						</div>
						<div class="measure-time">
							<div class="measure-row">
								<div class="measure-item">测量日期</div>
								<div class="measure-item-slt">
									<input type="text" readonly unselectable="on" onfocus="this.blur()" @click="openMeasureDate('measureDate')" v-model="measureDay">
									<i class="fa fa-angle-right"></i>
								</div>
							</div>
							<div class="measure-row">
								<div class="measure-item">测量时间</div>
								<div class="measure-item-slt">
									<input type="text" readonly unselectable="on" onfocus="this.blur()" @click="openMeasureDate('measureTime')" v-model="measureTime">
									<i class="fa fa-angle-right"></i>
								</div>
							</div>
							<div class="measure-row">
								<div class="measure-item">测量时段</div>
								<div class="measure-item-slt">
									<input type="text" readonly unselectable="on" onfocus="this.blur()" @click="openMeasurePeriod('measurePeriod')" v-model="measurePeriod.name">
									<i class="fa fa-angle-right"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--血压-->
				<div class="entry-tab" :class="{'entry-tab-show': showType === 'entry-pressure'}">
					<div class="picker-container">
						<div class="ruler-wrap pressure-ruler">
							<span class="pressure-unit">收缩压（高压）</span>
							<swiper :options="diastolicPressure" ref="diastolicSwiper">
								<!-- <div class="swiper-slide" v-for="(value, index) in diastolicRuler" :key="index" v-html="value"></div> -->
								<div class="swiper-pagination" slot="pagination"></div>
							</swiper>
							<div class="ruler-pointer"></div>
						</div>
						<div class="ruler-wrap pressure-ruler">
							<span class="pressure-unit">舒张压（低压）</span>
							<swiper :options="systolicPressure" ref="systolicSwiper">
								<!-- <div class="swiper-slide" v-for="(value, index) in systolicRuler" :key="index" v-html="value"></div> -->
								<div class="swiper-pagination" slot="pagination"></div>
							</swiper>
							<div class="ruler-pointer"></div>
						</div>
						<div class="measure-time">
							<div class="measure-row">
								<div class="measure-item">测量日期</div>
								<div class="measure-item-slt">
									<input type="text" readonly unselectable="on" onfocus="this.blur()" @click="openMeasureDate('pressureDate')" v-model="pressureDay">
									<i class="fa fa-angle-right"></i>
								</div>
							</div>
							<div class="measure-row">
								<div class="measure-item">测量时间</div>
								<div class="measure-item-slt">
									<input type="text" readonly unselectable="on" onfocus="this.blur()" @click="openMeasureDate('pressureTime')" v-model="pressureTime">
									<i class="fa fa-angle-right"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--体温-->
				<div class="entry-tab" :class="{'entry-tab-show': showType === 'entry-temperature'}">
					<div class="picker-container">
						<div class="ruler-wrap">
							<swiper :options="entryTemperature" ref="temperatureSwiper">
								<div class="swiper-pagination" slot="pagination"></div>
							</swiper>
							<div class="ruler-pointer"></div>
							<div class="ruler-tips">左右滑动改变体温</div>
						</div>
						<div class="measure-time">
							<div class="measure-row">
								<div class="measure-item">测量日期</div>
								<div class="measure-item-slt">
									<input type="text" readonly unselectable="on" onfocus="this.blur()" @click="openMeasureDate('temperatureDate')" v-model="temperatureDay">
									<i class="fa fa-angle-right"></i>
								</div>
							</div>
							<div class="measure-row">
								<div class="measure-item">测量时间</div>
								<div class="measure-item-slt">
									<input type="text" readonly unselectable="on" onfocus="this.blur()" @click="openMeasureDate('temperatureTime')" v-model="temperatureTime">
									<i class="fa fa-angle-right"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--体重-->
				<div class="entry-tab" :class="{'entry-tab-show': showType === 'entry-weight'}">
					<div class="picker-container">
						<div class="ruler-wrap">
							<swiper :options="entryWeight" ref="weightSwiper">
								<!-- <div class="swiper-slide" v-for="(value, index) in weightRuler" :key="index" v-html="value"></div> -->
								<div class="swiper-pagination" slot="pagination"></div>
							</swiper>
							<div class="ruler-pointer"></div>
							<div class="ruler-tips">左右滑动改变体重</div>
						</div>
						<div class="measure-time">
							<div class="measure-row">
								<div class="measure-item">测量日期</div>
								<div class="measure-item-slt">
									<input type="text" readonly unselectable="on" onfocus="this.blur()" @click="openMeasureDate('weightDate')" v-model="weightDay">
									<i class="fa fa-angle-right"></i>
								</div>
							</div>
							<div class="measure-row">
								<div class="measure-item">测量时间</div>
								<div class="measure-item-slt">
									<input type="text" readonly unselectable="on" onfocus="this.blur()" @click="openMeasureDate('weightTime')" v-model="weightTime">
									<i class="fa fa-angle-right"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--血糖日期选择-->
		<div @touchmove.prevent>
			<mt-datetime-picker ref="measureDate" v-model="measureDefaultDay" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" :endDate="new Date()" @confirm="handleMeasureDay">
			</mt-datetime-picker>
		</div>
		<div @touchmove.prevent>
			<mt-datetime-picker ref="measureTime" v-model="measureDefaultTime" type="time" :endHour="endHour" @confirm="handleMeasureTime">
			</mt-datetime-picker>
		</div>
		<mt-popup v-model="openPeriod" :closeOnClickModal="true" position="bottom" class="mint-datetime">
			<mt-picker :slots="dateSlots" @change="periodChange" value-key="name" class="mint-datetime-picker" show-toolbar>
				<span class="mint-datetime-action mint-datetime-cancel" @click="openPeriod = false">取消</span>
				<span class="mint-datetime-action mint-datetime-confirm" @click="handleMeasurePeriod">确定</span>
			</mt-picker>
		</mt-popup>
		<!--血压日期选择-->
		<div @touchmove.prevent>
			<mt-datetime-picker ref="pressureDate" v-model="pressureDefaultDay" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" :endDate="new Date()" @confirm="handlePressureDay">
			</mt-datetime-picker>
		</div>
		<div @touchmove.prevent>
			<mt-datetime-picker ref="pressureTime" v-model="pressureDefaultTime" type="time" :endHour="endHour" @confirm="handlePressureTime">
			</mt-datetime-picker>
		</div>
		<!--体温日期选择-->
		<div @touchmove.prevent>
			<mt-datetime-picker ref="temperatureDate" v-model="temperatureDefaultDay" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" :endDate="new Date()" @confirm="handleTemperatureDay">
			</mt-datetime-picker>
		</div>
		<div @touchmove.prevent>
			<mt-datetime-picker ref="temperatureTime" v-model="temperatureDefaultTime" type="time" :endHour="endHour" @confirm="handleTemperatureTime">
			</mt-datetime-picker>
		</div>
		<!--体重日期选择-->
		<div @touchmove.prevent>
			<mt-datetime-picker ref="weightDate" v-model="weightDefaultDay" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" :endDate="new Date()" @confirm="handleWeightDay">
			</mt-datetime-picker>
		</div>
		<div @touchmove.prevent>
			<mt-datetime-picker ref="weightTime" v-model="weightDefaultTime" type="time" :endHour="endHour" @confirm="handleWeightTime">
			</mt-datetime-picker>
		</div>
		<footer class="footer">
			<button class="cancel" @click="cancelEntry">取消</button>
			<button class="confirm" @click="fnInsertData()">确认</button>
		</footer>
	</div>
</template>

<script type="text/javascript" src="./manualEntry.js">

</script>

<style lang="scss">
	@import "./manualEntry.scss";
</style>
