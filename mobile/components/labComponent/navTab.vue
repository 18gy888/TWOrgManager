<template>
	<view style="height: 100rpx;">
		<view class="cu-bar tabbar bg-white foot">
			<view v-for="(item,index) in tabInfo" class="action" :key="index" @click="navTo(item.nav)">
				<view :class="{'text-bold':index === selection,'text-informatic-brown':index === selection}">
					<text :class="item.icon"></text>
					<text class="text-sm">{{item.text}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			selection: {
				required: true,
				type: Number
			}
		},
		methods: {
			navTo(url) {
				uni.redirectTo({
					url: url
				})
			}
		},
		data() {
			return {
				tabInfo: [{
						icon: 'cuIcon-home',
						text: '主页',
						nav: '../../iuc/index/index'
					},
					{
						icon: 'cuIcon-notice',
						text: '通知公告',
						nav: '../../iuc/News/newsList'
					},
					{
						icon: 'cuIcon-addressbook',
						text: '活动列表',
						nav: '../../iuc/addressBook/addressBook'
					},
					{
						icon: 'cuIcon-profile',
						text: '我的',
						nav: '../profile/profile'
					}
				],
			}
		}
	}
</script>

<style>
</style>
