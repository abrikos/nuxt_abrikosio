<script setup lang="ts">

import {useCustomStore} from "~/store/custom-store";

const {loggedUser} = storeToRefs(useCustomStore())
const {post} = defineProps<{ post: object }>()

</script>

<template lang="pug">
  q-card
    q-toolbar
      q-toolbar-title
        q-avatar
          user-avatar(:user="post.user")
        q-btn(:to="`/post/${post.id}`" flat no-caps) {{ post.title }}
    q-card-section(horizontal)
      p.short {{post.short}}
    q-card-actions.flex.justify-between
      small {{ post.date }}
      q-btn(size="sm" icon="mdi-edit" v-if="loggedUser?.id === post.user.id" :to="`/post/edit-${post.id}`")

</template>

<style scoped lang="sass">
</style>
