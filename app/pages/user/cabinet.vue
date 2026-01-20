<script setup lang="ts">
const tab = ref('options')
const splitter = ref(20)
</script>

<template lang="pug">
  q-splitter(v-model="splitter" )
    template(v-slot:before)
      q-tabs(v-model="tab" vertical)
        q-tab(name="options" label="Options" )
        q-tab(name="password" label="Password" )

    template(v-slot:after)
      q-tab-panels(v-model="tab" vertical animated swipeable )
        q-tab-panel(name="password")
          cabinet-password
        q-tab-panel(name="options")
          cabinet-options
</template>

<style scoped>

</style>
