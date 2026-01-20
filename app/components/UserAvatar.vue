<script setup lang="ts">
interface Props {
  user: object;
}
const props = defineProps<Props>()
const {$listen} = useNuxtApp()
const key = ref(Math.random().toString(36))
$listen('avatar-reload', ()=>{
  console.log('fffffffffffffffffffffffffff')
  key.value = Math.random().toString(36)
})
</script>

<template lang="pug">

  q-avatar(:key="key")
    img(:src="props.user.avatar+`?${key}` || '/static/no-avatar.png'" )
    q-tooltip {{props.user.display_name}} {{key}}

</template>

<style scoped lang="sass">
img
  object-fit: fill
</style>
