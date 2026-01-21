<script setup lang="ts">
const {post} = defineProps<{ post: object }>()
</script>

<template lang="pug">
  q-input(v-model="post.title" label="Title")
  q-input(v-model="post.poster" label="Poster image url" hint="Place link for any image")
    template(v-slot:prepend)
      q-icon(name="mdi-image")
  q-input(v-model="post.short" label="Short" type="textarea"  filled autogrow)


  q-input(v-model="post.body" label="Body (accepts markdown syntax)" type="textarea" filled autogrow)
    template(v-slot:append)

        q-icon(name="mdi-help")
          q-popup-proxy
            q-banner
              a(href="https://skillbox.ru/media/code/yazyk-razmetki-markdown-shpargalka-po-sintaksisu-s-primerami/" target="_blank") Markdown syntax
        q-tooltip Markdown syntax
  div.row.items-center
    div.col
      q-toggle( v-model="post.published" label="Show for all")
    div.col.text-right {{ post.date  }}


</template>

<style scoped>

</style>