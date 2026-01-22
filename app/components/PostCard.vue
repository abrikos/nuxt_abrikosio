<script setup lang="ts">

import {useCustomStore} from "~/store/custom-store";

const {loggedUser} = useCustomStore()
const {post} = defineProps<{ post: object }>()

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
    div.q-pa-sm.text.flex.justify-between.no-wrap
      span {{post.short}}
      div
        img(:src="post.poster" v-if="post.poster")


</template>

<style scoped lang="sass">
.post-card
  cursor: pointer
  width: 300px
  max-height: 200px
.text
  overflow: hidden
img
  //float: left
  margin: 10px
  max-height: 100px
  max-width: 100px
</style>
