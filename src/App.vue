<template>
    <transition :name="transitionName">
        <router-view></router-view>
    </transition>
</template>

<script>

export default {
    data () {
        return {
            transitionName: 'slide-left'
        }
    },
    watch: {
        '$route' (to, from) {
            if (to.path == '/home') {
                this.transitionName = 'slide-right'
            } else {
                this.transitionName = 'slide-left'
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
</style>


