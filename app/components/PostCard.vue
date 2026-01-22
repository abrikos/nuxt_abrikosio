<script setup lang="ts">

import {useCustomStore} from "~/store/custom-store";

const {loggedUser} = useCustomStore()
const {$event} = useNuxtApp()
const {post,cabinet} = defineProps<{ post: object, cabinet?:boolean }>()

watch(()=>post.published, async (newValue) => {
  return useNuxtApp().$PATCH(`/post/${post.id}/`, {published:post.published})
})

const deletePost = async (id: string) => {
  await useNuxtApp().$DELETE(`/post/${post.id}/`)
  $event('posts-load')
}
</script>

<template lang="pug">
div.post-card
  q-card.q-ma-sm.bg-grey-4(@click="navigateTo(`/post/${post.id}`)")
    div.q-pa-sm.flex.items-center.justify-between.no-wrap(color="primary")
      q-btn(size="sm" icon="mdi-pencil" v-if="loggedUser?.id === post.user.id" :to="`/post/edit-${post.id}`" flat)
      div
        span.text-blue  {{ post.title }}
        div
          small
            i {{ post.date }}
        q-rating(v-model="post.rate" disable max="5" icon="mdi-star-outline" color="red" icon-selected="mdi-star"  icon-half="mdi-star-half-full")
      q-space
      q-avatar
        user-avatar(:user="post.user")
    q-separator(inset)
    div.text.q-pa-sm.flex.justify-between.no-wrap
      span {{post.short}}
      div
        img(:src="post.poster" v-if="post.poster")
    div.flex.justify-between(v-if="cabinet" :class="post.published? '':'bg-red-4'")
      q-toggle( v-model="post.published" label="Show for all")
      q-btn(icon="mdi-delete" flat @click.stop :color="post.published? 'red':''")
        q-tooltip Удалить "{{post.title}}"
        q-popup-proxy(cover transition-show="scale" transition-hide="scale")
          q-banner Удалить "{{post.title}}"?
            br
            q-btn( @click.stop="deletePost(post.id)" label="OK" v-close-popup color="negative" )
            q-btn( @click.stop label="Отмена" v-close-popup)



</template>

<style scoped lang="sass">
.post-card
  cursor: pointer
  width: 300px

.text
  overflow: hidden
  max-height: 100px
img
  //float: left
  margin: 10px
  max-height: 100px
  max-width: 100px
</style>
