<template>
	<div
		class="alert"
	>
		<div class="alert-icon">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>

		</div>
		<div class="alert-content">
			<p class="alert-title">{{title}}</p>
			<p class="alert-body">{{description}}</p>
		</div>
		<div class="alert-close" @click="handleClose">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
		</div>
	</div>
</template>

<script>
export default {
    props: ['title', 'description'],
	methods: {
		handleClose() {
			this.$emit('close');
		}
	}
};
</script>

<style scoped>
.alert {
	padding: 20px 40px;
	border-radius: 4px;
	border-left: 4px solid;
	display: flex;
	align-items: center;
	justify-content: space-between;
    gap: 15px;

    background: #fed7d7;
	border-left-color: #742a2a;
	color: #c53030;
}


.alert-icon {
	margin-right: 15px;
	font-size: 20px;
}

.alert-close {
	margin-left: auto;
	cursor: pointer;
}
.alert-title {
	font-weight: bold;
    margin-bottom: 10px;
    font-size: 20px;
}
.alert-body {
	font-size: 16px;
}

.alert svg {
    font-size: 10px;
    width: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
}
</style>
