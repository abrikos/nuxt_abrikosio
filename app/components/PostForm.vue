<script setup lang="ts">
const {post} = defineProps<{ post: object }>()
</script>

<template lang="pug">
  q-input(v-model="post.title" label="Title" dense outlined)
  br
  q-input(v-model="post.poster" label="Poster image url" dense outlined)
  br
  q-input(v-model="post.short" label="Short" type="textarea" dense outlined)
  br
  q-input(v-model="post.body" label="Body" type="textarea" filled autogrow dense outlined)
  a(href="https://skillbox.ru/media/code/yazyk-razmetki-markdown-shpargalka-po-sintaksisu-s-primerami/" target="_blank") Mark down rules
  q-toggle( v-model="post.published" label="Published")
  div {{ post.date  }}


</template>

<style scoped>

</style>