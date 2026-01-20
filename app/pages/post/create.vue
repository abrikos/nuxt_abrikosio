<script setup lang="ts">
import {useCustomStore} from "~/store/custom-store";

const $q = useQuasar()
const {loggedUser} = storeToRefs(useCustomStore())
const post = ref({})
async function onSubmit() {
  if (!loggedUser.value) return;
  const res = await useNuxtApp().$POST(`/post/`, post.value)
  if (!res.errors) {
    console.log(res)
    $q.notify({ message: 'Success', color: 'green' });
    navigateTo(`/post/edit-${res.id}`)
  }
}

</script>

<template lang="pug">
  div.row.q-gutter-md
    div.col-sm.q-pa-lg
      q-form(@submit="onSubmit")
        post-form(:post="post")
        q-btn(type="submit" color="primary" :flat="false") Create
    div.col-sm
      post-view(:post="post")

</template>

<style scoped>

</style>