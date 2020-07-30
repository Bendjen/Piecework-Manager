<template>
	<div style='height:100%;width:100%;padding:.4rem'>
		<div class='toolBar' flex='main:justify' style='height:6%' v-if="$route.path != '/home' && $route.path != '/'">
			<i class='iconfont icon-back' @click="$router.back()" ></i>
		</div>
		<div :class=" ($route.path != '/home' && $route.path != '/') ? 'height94' : 'height100'">
			<transition :name="transitionName">
				<router-view></router-view>
			</transition>
		</div>
	</div>

</template>

<script>
export default {
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  mounted(){},
  watch: {
    $route(to, from) {
      if (to.path == "/home" || to.path == "/") {
        this.transitionName = "slide-right";
      } else if (from.path == "/home" || from.path == "/") {
        this.transitionName = "slide-left";
      } else if (from.path.includes("/staffDetail")) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.slide-left-enter-active {
  transition: all 0.2s ease;
}

.slide-left-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-left-enter,
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-active {
  transition: all 0.2s ease;
}

.slide-right-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.height94{
	height: 94%;
}
.height100{
	height: 100%;
}
</style>


