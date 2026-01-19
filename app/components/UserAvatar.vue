<script setup lang="ts">
interface Props {
  user: object;
}
const props = withDefaults(defineProps<Props>(), {
  user: () => ({}),
});
</script>

<template lang="pug">

  q-avatar
    img(:src="props.user.avatar || '/static/no-avatar.png'")
    q-tooltip {{props.user.display_name}}

</template>

<style scoped lang="sass">
img
  object-fit: fill
</style>
