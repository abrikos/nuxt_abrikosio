<script setup lang="ts">
import {useCustomStore} from "~/store/custom-store";

function  setHeaders() {
  useHead({
    title: post.value.title,
    meta: [
      {name: 'description', content: post.value.short},
    ],
    bodyAttrs: {
      class: 'test',
    },
    script: [{innerHTML: 'console.log(\'Hello world\')'}],
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
      Meta(name="og:title" :content="post.title")
      Meta(name="og:description" :content="post.short")
      Meta(name="description" :content="post.short")
      Meta(name="og:image" :content="post.poster")
      Meta(name="og:url" :content="`https://abrikosio.ru/post/${post.id}`")
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