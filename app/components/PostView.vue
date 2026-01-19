<script setup lang="ts">
import MarkDown from 'components/MarkDown.vue';

const props = withDefaults(defineProps<{ post: object }>(), {
  post: () => ({}),
});

</script>

<template lang="pug">
h1 {{ post.title }}
p.short {{post.short}}
mark-down(:text="post.body")
//p.body(v-html="post.markdown_body")
</template>

<style scoped>

</style>
