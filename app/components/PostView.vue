<script setup lang="ts">

const {post} = defineProps<{ post: object }>()

</script>

<template lang="pug">
h1 {{ post.title }}
div.flex.items-center.bg-grey-4
  img(:src="post.poster" v-if="post.poster")
  p {{post.short}}
mark-down(:text="post.body")
//p.body(v-html="post.markdown_body")
</template>

<style scoped>

</style>
