<template>
	<view>
		<title-bar :placeholder="searchText" @input="doSearch">
			<view class="act-btn" @click="navTo('../orgmanagement/orgmanagement')">
				<text class="icon cuIcon-home"></text>
				<text >我的社团</text>
			</view>
			<view class="act-btn" @click="newActivity">
				<text class="icon cuIcon-light"></text>
				<text>申请活动</text>
			</view>
			<view class="act-btn">
				<text class="icon cuIcon-activity"></text>
				<text>社团活动</text>
			</view>
			<view class="act-btn" @click="toProfile">
				<text class="icon cuIcon-profile"></text>
				<text>个人中心</text>
			</view>
		</title-bar>
		<view class="tab my-orgs">
			<member-check></member-check>
			<act-detail></act-detail>
		</view>
	</view>
</template>

<script>
	import titleBar from './title-bar.vue'
	import orgInfo from './components/org-info.vue'
	import actSignUp from './components/act-signUp.vue'
	import memberCheck from './components/member-check.vue'
	import actDetail from './components/act-detail.vue'
	let app = require("@/config")
	export default {
		components: { titleBar, orgInfo, actSignUp, memberCheck, actDetail },
		methods: {
			toTab (name) {
				document.body.scrollTop = 0;
				this.showTab = name;
				if (name === "my-orgs") {
					this.searchText = "搜索社团"
				} else {
					this.searchText = "搜索活动"
				}
			},
			doSearch (text) {
				// text 即是输入的文本
				console.log(text);
			},
			toProfile () {
				 uni.toProfile()
			},
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			newActivity() {
				uni.post("/api/org/Applicate", {id: this.orgInfo.ID}, msg => {
					if (msg.success) {
						uni.navigateTo({
							url: '../activity/activity?instanceId=' + msg.instanceId + '&stepId=' + msg.stepId
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: msg.msg
						});
					}
				})
			},
			getOrgInfo(){
				uni.post("/api/security/GetOrgDetail", {}, msg => {
					if (msg.success) {
						this.orgInfo = msg.data;
					}
				});
			}
		},
		onLoad() {
			this.getOrgInfo();
		},
		data () {
			// 1. 在可以申请加入社团的时候，第一个按钮显示：“查找社团”
			// 2. 如果用户已经加入了两个社团，显示：“我的社团”
			return {
				firtstButtonText: "我的社团",
				searchText: "搜索活动",
				showTab: "applicate", // "my-orgs"
				orgInfo: {}
			}
		}
	}
</script>

<style lang="scss">
	.tab {
		padding-top: 15px;
	}
</style>
