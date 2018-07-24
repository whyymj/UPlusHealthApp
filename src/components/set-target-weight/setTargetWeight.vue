<template>
	<div class="page set-weight">
		<!-- <h-header title="设置目标体重"></h-header> -->
		<div class="container set-container has-footer">
			<div class="panel">
				<div>通过BMI指数计算得出您的最佳体重范围</div>
				<div><strong>{{weightRange[0]}} - {{weightRange[1]}}</strong> KG</div>
			</div>
			<div class="weight-range">
				<div class="weight-wrap">
					<span ref="weightScale" class="weight-scale"></span>
					<span class="weight-item weight-thin">{{weightRangeDesc[0]}}</span>
					<span class="weight-item weight-normal">{{weightRangeDesc[1]}}</span>
					<span class="weight-item weight-fat">{{weightRangeDesc[2]}}</span>
					<span class="weight-start">{{weightRange[0]}}kg</span>
					<span class="weight-end">{{weightRange[1]}}kg</span>
				</div>
			</div>
			<div class="ruler-wrap">
    		<swiper :options="entryWeight" ref="weightSwiper"> 
    			<!-- <div class="swiper-slide" v-for="(value, index) in weightRuler" :key="index" v-html="value"></div> -->
	        	<div class="swiper-pagination" slot="pagination"></div>
    		</swiper>
    		<div class="ruler-pointer"></div>
    	</div>
		</div>
		<footer class="footer">
			<button class="cancel" @click="cancelInsert()">取消</button>
			<button class="confirm" @click="fnInsertData()">确认</button>
		</footer>
	</div>
</template>

<script type="text/javascript" src="./setTargetWeight.js"></script>

<style lang="scss">
@import "./setTargetWeight.scss";
</style>