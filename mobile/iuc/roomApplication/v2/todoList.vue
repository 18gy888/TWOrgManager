<template>
	<view>
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">流程列表</block>
		</cu-custom>
		<transition-group class="cu-card" name="list">
			<view class="cu-item bg-informatic-brown shadow" v-for="(item,index) in todoList" :key="index" @click="toExecute(item)">
				<sticky :item="item" />
			</view>
		</transition-group>
		<template v-if="todoList.length===0">
			<view class="padding-tb text-center text-lg">
				<text class="text-bold text-gray">暂无数据</text>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		onShow() {
			this.getData();
		},
		onLoad() {},
		methods: {
			getData() {
				uni.post("/api/workflow/Pending", {}, msg => {
					this.todoList = msg.data;
				})
			},
			toExecute(item) {
				if(item.WorkflowName === "社团活动申请"){
					uni.navigateTo({
						url: `../../activity/activity?instanceId=${item.InstanceId}&stepId=${item.StepId}`
					})
				} else if (item.WorkflowName === "按机位申请实验室") {
					uni.setStorage({
						key: 'jmpInfo',
						data: item,
						success: () => { //如果缓存成功则跳转
							uni.navigateTo({
								url: './seatFlowsCtrl'
							})
						}
					})
				}
			}
		},
		data() {
			return {
				todoList: [],
			}
		}
	}
</script>

<style>
	.cu-card>.cu-item {
		transition: all 1s;
	}

	.list-move {
		transition: all 0.8s;
	}

	.list-enter {
		opacity: 0;
		transform: translateY(-30px);
	}

	.list-leave-to {
		opacity: 0;
		transform: translateY(-30px);
	}
</style>
