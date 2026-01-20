<script setup lang="ts">
import {useCustomStore} from "~/store/custom-store";

const {$event} = useNuxtApp()
const {loggedUser} = storeToRefs(useCustomStore())
const {checkAuth} = useCustomStore()
const $q = useQuasar()
async function updateUser(deleteAvatar:boolean) {
  if (!loggedUser.value) return;
  if(deleteAvatar){
    loggedUser.value.avatar = null;
  }
  const res = await useNuxtApp().$PATCH(`/user/${loggedUser.value.id}/`, loggedUser.value);
  if(!res.errors) {
    $q.notify({message: 'Success', color: 'green'});
  }
}

async function setAvatar(file: string) {
  const res = await useNuxtApp().$UPLOAD(`/user/${loggedUser.value?.id}/set_avatar/`, [file]);
  await checkAuth()
  $event('avatar-reload')
}
async function deleteAvatar(file: string) {
  const res = await useNuxtApp().$DELETE(`/user/${loggedUser.value?.id}/delete_avatar/`);
  loggedUser.value.avatar = null;
  $event('avatar-reload')
}

</script>

<template lang="pug">
  q-card.q-mb-lg
    q-card-section
      q-form(@submit="updateUser()")
        q-input(v-model="loggedUser.nickname" label="Nick Name" )
        q-card-actions(@submit="updateUser()")
          q-btn(type="submit" color="primary" ) Save

  q-card
    q-card-section
      q-file(@update:model-value="setAvatar" label="Choose avatar" outlined counter)
        template(v-slot:append)

        template(v-slot:before)
          user-avatar(:user="loggedUser")
          q-btn(@click="deleteAvatar" icon="mdi-delete" color="red" )
</template>

<style scoped>

</style>