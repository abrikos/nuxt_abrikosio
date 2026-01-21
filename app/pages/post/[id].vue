<script setup lang="ts">
import {useCustomStore} from "~/store/custom-store";

const {loggedUser} = useCustomStore()
const post = ref()
const route = useRoute()
async function load(){
  post.value = await useNuxtApp().$GET('/post/'+route.params.id)
}
onMounted(load)
</script>

<template lang="pug">
div(v-if="post")
  q-bar(dense)
    q-btn(size="sm" icon="mdi-pencil" v-if="loggedUser?.id === post.user.id" :to="`/post/edit-${post.id}`" flat)
    q-btn(icon="mdi-thumb-up-outline" v-if="loggedUser" flat)
      q-tooltip Like
    q-btn(icon="mdi-thumb-down-outline" v-if="loggedUser" flat)
      q-tooltip Dislike
    q-space
    q-rating(v-model="post.rating")
    span {{post.date}}
  post-view(:post="post" v-if="post")
</template>

<style scoped>

</style>