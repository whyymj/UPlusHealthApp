<template>
		<div class="tab" ref="tab">
			<ul class="tab_content" ref="tabWrapper">
				<li class="tab_item" v-for="date in dates" :key="date.display" ref="tabitem"
						:class="{'active': date.value == selectDate, 'today': date.display == '今天'}" 
						@click="changeDate(date)">
					{{ date.display }}
				</li>
			</ul>
			<div class="gradient-left"></div>
    	<div class="gradient-right"></div>
		</div>
</template>
<script type="text/javascript">
import BScroll from 'better-scroll'

export default {
  name: 'datePicker',
  data () {
    return {
			selectDate: this.getNowDate(),
			dates: this.getDates(),
    }
	},
	created() {
		this.$nextTick(() => {
     this.InitTabScroll();
    });
	},
	mounted() {
	},
  methods: {
		InitTabScroll () {
		 let width = 0
		 //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
		 width = (this.$refs.tabitem[0].getBoundingClientRect().width + 19) * this.dates.length
     this.$refs.tabWrapper.style.width = width / 14 + 'em'
     this.$nextTick(() => {
       if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.tab, {
         startX: 0,
         click: true,
         scrollX: true,
         scrollY: false,
         eventPassthrough: 'vertical'
				});
       } else {
        this.scroll.refresh()
       }
     });
    },
		getNowDate () {
			const _d = new Date()
			return `${_d.getFullYear()}-${_d.getMonth() + 1}-${_d.getDate()}`
		},
		getDates () {
			const date = new Date()
			const len = date.getDate()
			const result = []
			for (let i = 1; i <= len; i++) {
				result.push({
					display: i === len ? `今天` : i,
					value: `${date.getFullYear()}-${date.getMonth() + 1}-${i}`
				})
			}
			return result
		},
  	changeDate (date) {
			this.selectDate = date.value
			// this.$refs.tab.scrollBy(this.$refs.tab.getBoundingClientRect().width / 2, 0, 300)
			console.log(this.$refs.tab.getBoundingClientRect().width)
  	}
  }
}
</script>
<style lang="scss" scope>
 	@import '../../common/css/variable.scss';
  .gradient-left {
    position: absolute;
    left: -(1 / $baseFontSize) * 1em;
    top: $headerHeight;
    width: (50 / $baseFontSize) * 1em;
    height: (40 / $baseFontSize) * 1em;
    background: linear-gradient(to right, $mainBackgroundColor, rgba(0,0,0,0));
  }
  .gradient-right {
    position: absolute;
    right: -(1 / $baseFontSize) * 1em;
    top: $headerHeight;
    width: (50 / $baseFontSize) * 1em;
    height: (40 / $baseFontSize) * 1em;
    background: linear-gradient(to left, $mainBackgroundColor, rgba(0,0,0,0));
  }
	.tab {
		width: 100%;
		overflow-x: hidden;
		padding: (5 / $baseFontSize) * 1em;
		.tab_content {
			line-height: 2em;
			display: flex;
			.tab_item {
				flex: 0 0 (30 / $baseFontSize) * 1em;
				width: (30 / $baseFontSize) * 1em;
				height: (30 / $baseFontSize) * 1em;
				text-align: center;
				margin-right: (19 / $baseFontSize) * 1em;
				&.active {
					background: $mainComponBackGroundColor;
					border-radius: 50%;
					color: white;
				}
				&.today {
					font-size: (12 / $baseFontSize) * 1em;
				}
			} 
		}
 	} 
</style>
