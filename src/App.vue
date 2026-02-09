<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useAppOptionStore } from '@/stores/app-option';
import { ProgressFinisher, useProgress } from '@marcoschulte/vue3-progress';
import AppFooter from '@/components/app/Footer.vue';

import router from './router';

const appOption = useAppOptionStore();
const internalInstance = getCurrentInstance();

const progresses = [] as ProgressFinisher[];

router.beforeEach(async (to, from) => {
	progresses.push(useProgress().start());
	appOption.appSidebarMobileToggled = false;
	document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})
router.afterEach(async (to, from) => {
	progresses.pop()?.finish();
})
</script>

<template>
	<div class="app" >
		<vue3-progress-bar />
		<div class="" v-bind:class="appOption.appContentClass">
			<router-view></router-view>
		</div>
<!--		<app-footer v-if="appOption.appFooter" />-->
	</div>
</template>
