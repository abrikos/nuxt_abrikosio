<script setup lang="ts">
const post = ref()
const route = useRoute()
async function load(){
  post.value = await useNuxtApp().$GET('/post/'+route.params.id)
}
onMounted(load)
</script>

<template lang="pug">
div(v-if="post")
  h1 {{ post.title }}
  strong {{ post.short }}
  mark-down(:text="post.body")
</template>

<style scoped>

</style>