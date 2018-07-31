<template>
    <div class="healthEntryMy">
        <div class="healthEntryMybody">
            <div class="body_1">
                <div class="body_11">
                    <div class="body_11_txt">基本信息</div>
                </div>
                <div class="body_12">
                    <div class="body_121">
                        <span class="body_1211">生日</span>
                        <span class="body_1212">&middot;</span>
                        <span class="body_1213">1992年02月16日</span>
                    </div>
                    <div class="body_121">
                        <span class="body_1211">身高</span>
                        <span class="body_1212">&middot;</span>
                        <span class="body_1213">16厘米</span>
                    </div>
                    <div class="body_121">
                        <span class="body_1211">体重</span>
                        <span class="body_1212">&middot;</span>
                        <span class="body_1213">58.5公斤</span>
                    </div>
                    <div class="body_122">
                        <div class="body_1221">
                            *蓝点圆点标示的为必填选项
                        </div>
                    </div>
                </div>
            </div>
            <div class="body_2">
                <div class="body_21">健康信息</div>
                <div class="body_22">
                    <div class="body_221">你是否有慢病史？</div>
                    <div class="body_222">
                         <el-switch v-model="chronDiseaseHistory">
                        </el-switch>
                    </div>
                </div>
                <div class="body_122" v-show='chronDiseaseHistory'>
                    <div class="body_1221 body_231">请选择慢病标签&nbsp;&nbsp;&nbsp;(可多选)：</div>
                </div>
              <tagslist :tags='chromiclist' name='chronic' @choose='chooseChromic' v-show='chronDiseaseHistory'></tagslist>
                <div class="body_22">
                    <div class="body_221">你是否有过敏史？</div>
                    <div class="body_222">
                         <el-switch v-model="allergyHistory">
                        </el-switch>
                    </div>
                </div>
                <div class="body_122"  v-show='allergyHistory'>
                    <div class="body_1221 body_231">请选择过敏源&nbsp;&nbsp;&nbsp;(可多选)：</div>
                </div>
                 <tagslist :tags='allergylist' name='allergy' @choose='chooseAllergy'  v-show='allergyHistory'></tagslist>
            </div>
        </div>
        <div class="healthEntryMybottom">
            <div class="bottom_text">完成</div>
        </div>
    </div>
</template>
<script>
    import tagslist from '../health-entry-family/tagsList';
    export default {
        components: {
            tagslist
        },
        data() {
            return {
                chronDiseaseHistory: true, //慢病史
                allergyHistory: true, //过敏史
                birthday: '1992年02月16日', //生日
                tall: '166厘米', //身高
                weight: "58.5公斤", //体重
                chromicListResult: [],
                allergyListResult: [],
                chromiclist: [{
                    name: '心脏病',
                    selected: false
                }, {
                    name: '鼻炎',
                    selected: false
                }, {
                    name: '痛风',
                    selected: false
                }, {
                    name: '糖尿病',
                    selected: true
                }, {
                    name: '关节炎',
                    selected: false
                }, {
                    name: '高血压',
                    selected: true
                }, {
                    name: '偏头痛',
                    selected: false
                }, {
                    name: '低血糖',
                    selected: false
                }],
                allergylist: [{
                    name: '水果',
                    selected: false
                }, {
                    name: '海鲜',
                    selected: false
                }, {
                    name: '奶制品',
                    selected: false
                }, {
                    name: '糖尿病',
                    selected: false
                }, {
                    name: '坚果类',
                    selected: false
                }, {
                    name: '豆类',
                    selected: true
                }, {
                    name: '芝麻',
                    selected: false
                }, {
                    name: '葵花籽',
                    selected: false
                }],
            }
        },
        methods: {
            chooseChromic(data) {
                console.log(data);
            },
            chooseAllergy(data) {
                console.log(data);
            }
        }
    }
</script>
 

<style lang="scss">
    @import "./healthEntryMy.scss";
</style>
