<script setup lang="ts">
import {useCustomStore} from "~/store/custom-store";

const {loggedUser} = useCustomStore()
const post = ref()
const route = useRoute()
const rate = ref(0)
async function load() {
  post.value = await useNuxtApp().$GET('/post/' + route.params.id)
  if(post.value.errors){
    post.value=null
    return navigateTo('/')
  }
  rate.value = post.value.rate
}

const submitRate = async () => {
  await useNuxtApp().$POST('/post/rate/', {value: rate.value, post: post.value.id})
  await load()
}

onMounted(load)
</script>

<template lang="pug">
  div(v-if="post")
    q-bar(dense)
      q-btn(size="sm" icon="mdi-pencil" v-if="loggedUser?.id === post.user.id" :to="`/post/edit-${post.id}`" flat)
      q-space
      q-rating(v-model="rate" @click="submitRate" max="5" icon="mdi-star-outline" size="sm" icon-selected="mdi-star"  icon-half="mdi-star-half-full")
      q-space
      span {{post.date}}
    post-view(:post="post" v-if="post")
    pre {{post}}
</template>

<style scoped>

</style>