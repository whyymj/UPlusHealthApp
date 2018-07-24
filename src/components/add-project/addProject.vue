<template>
	<div class="page add-project">
		<!-- <h-header title="添加项目"></h-header> -->
		<!--<i class="fa icon-list-view"></i>-->
		<div class="container add-container">
			<div class="add-project-item">
				<h3>我的添加<span>(最多添加6项)</span></h3>
				<ul class="project-list added-project-list clearfix">
					<li v-for="(item, index) in addedList" :key="index">
						<div class="project-icon-wrap text-center">
							<div class="icon-item" :class="[{'shake': showShake}]" @click="deleteProject(index)">
								<i class="project-icon" :class="item.projectIcon"></i>
								<i class="badge-icon fa fa-minus"></i>
							</div>
							<div class="project-name">{{item.projectName}}</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="add-project-item">
				<h3>还可添加</h3>
				<ul class="project-list effe-project-list clearfix">
					<li v-for="(item, index) in effectList" :key="index">
						<div class="project-icon-wrap text-center" :class="[{'highlight': highlightIndex === index}]">
							<div class="icon-item" @click="addProject(index)">
								<i class="project-icon" :class="item.projectIcon"></i>
								<i class="badge-icon fa fa-plus"></i>
							</div>
							<div class="project-name">{{item.projectName}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript" src="./addProject.js">
</script>

<style lang="scss">
  @import "./addProject.scss";
</style>
