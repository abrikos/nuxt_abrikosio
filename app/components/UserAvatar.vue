<script setup lang="ts">
interface Props {
  user?: object;
}
const {user} = defineProps<Props>()
const {$listen} = useNuxtApp()
const key = ref(Math.random().toString(36))
$listen('avatar-reload', ()=>{
  key.value = Math.random().toString(36)
})

const avatar = computed(() => {
  return user?.avatar ? user.avatar + `?${key.value}` : '/static/no-avatar.png'
})

</script>

<template lang="pug">
    q-avatar(v-if="user")
      img(:src="avatar")
      q-tooltip {{user?.nickname}}
</template>

<style scoped lang="sass">
img
  max-height: 100px
  object-fit: fill
</style>
