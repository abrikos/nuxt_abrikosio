<script setup lang="ts">

const {post} = defineProps<{ post: object }>()

</script>

<template lang="pug">
h1 {{ post.title }}
img(:src="post.poster" v-if="post.poster")
p.short {{post.short}}
mark-down(:text="post.body")
//p.body(v-html="post.markdown_body")
</template>

<style scoped>

</style>
