<script setup lang="ts">

const posts = ref([])
async function load(){
  posts.value = await useNuxtApp().$GET('/post') as never[];
}

onMounted(load)
</script>

<template lang="pug">
div
  div(v-for="post of posts")
    post-card(:post="post")
</template>

<style scoped>

</style>