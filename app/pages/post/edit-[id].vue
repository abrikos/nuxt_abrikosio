<script setup lang="ts">
import {useCustomStore} from "~/store/custom-store";

const $q = useQuasar()
const {loggedUser} = storeToRefs(useCustomStore())
const post = ref({})
const route = useRoute()
async function load(){
  post.value = await useNuxtApp().$GET('/post/' + route.params.id)
  console.log('PPPPPPP', post.value)
  if(!post.value || !post.value.id){
    navigateTo('/')
  }
}
onMounted(load)
async function onSubmit() {
  if (!loggedUser.value) return;
  const res = useNuxtApp().$PATCH(`/post/${route.params.id}/`, post.value)
  if (!res.errors) {
    $q.notify({ message: 'Success', color: 'green' });
  }
}

</script>

<template lang="pug">
  div.row.q-gutter-md
    div.col-sm.q-pa-lg
      q-form(@submit="onSubmit")
        post-form(:post="post")
        q-btn(type="submit" color="primary" :flat="false") Save
    div.col-sm
      post-view(:post="post")

</template>

<style scoped>

</style>