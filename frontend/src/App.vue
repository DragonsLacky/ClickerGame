<template>
  <div id="app" class="flex flex-col overflow-hidden h-screen">
      <navigation></navigation>
      <router-view class="h-full"></router-view>
      <vfooter class="select-none self-center"></vfooter>
  </div>
</template>

<script>
import navigation from '@/components/layouts/navigation';
import vfooter from '@/components/layouts/vfooter'

export default {
  components: {
    navigation,
    vfooter
  },
  async created() {
    await this.$store.dispatch('Authentication/setAuthUser');
  }
}
</script>
