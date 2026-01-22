<script setup lang="ts">
import {useCustomStore} from "~/store/custom-store";

function  setHeaders() {
  useSeoMeta({
    title: post.value.title,
    ogTitle: 'My Amazing Site',
    description: 'This is my amazing site, let me tell you all about it.',
    ogDescription: 'This is my amazing site, let me tell you all about it.',
    ogImage: post.value.poster,
    twitterCard: 'summary_large_image',
  })
}

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
  setHeaders()
}

const submitRate = async () => {
  await useNuxtApp().$POST('/post/rate/', {value: rate.value, post: post.value.id})
  await load()
}

onMounted(load)
</script>

<template lang="pug">
  div(v-if="post")
    Head
      Title {{ post.title }}
      Meta(name="og:title" content="My Amazing Site")
      Meta(name="og:description" content="My Amazing Site")
      Meta(name="description" content="My Amazing Site")
      Meta(name="og:image" :content="post.poster")
      Meta(name="og:url" content="https://abrikosio.ru/post/1")
      Meta(name="og:type" content="article")

    q-bar(dense)
      q-btn(size="sm" icon="mdi-pencil" v-if="loggedUser?.id === post.user.id" :to="`/post/edit-${post.id}`" flat)
      q-space
      q-rating(v-model="rate" @click="submitRate" max="5" icon="mdi-star-outline" color="red" size="sm" icon-selected="mdi-star"  icon-half="mdi-star-half-full")
      q-space
      span {{post.date}}
    post-view(:post="post" v-if="post")
</template>

<style scoped>

</style>