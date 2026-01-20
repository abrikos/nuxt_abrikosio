<script setup lang="ts">
import {useCustomStore} from "~/store/custom-store";

const {$event} = useNuxtApp()
const {loggedUser} = storeToRefs(useCustomStore())
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
  console.log(file)
  const res = await useNuxtApp().$UPLOAD(`/user/${loggedUser.value?.id}/set_avatar/`, [file]);
  $event('avatar-reload')
}

</script>

<template lang="pug">
  q-card.q-mb-lg
    q-toolbar
      q-toolbar-title Names
    q-card-section
      q-form(@submit="updateUser()")
        q-input(v-model="loggedUser.first_name" label="First Name" )
        q-input(v-model="loggedUser.last_name" label="Last Name" )
        q-card-actions(@submit="updateUser()")
          q-btn(type="submit" color="primary" ) Save

  q-card
    q-toolbar
      q-toolbar-title Avatar
    q-card-section


      //q-uploader(url="" @added="setAvatar")
      q-file(@update:model-value="setAvatar" label="Choose avatar" )
        template(v-slot:after)
          q-btn(@click="updateUser(true)" icon="mdi-delete" color="red" )
        template(v-slot:before)
          user-avatar(:user="loggedUser")
</template>

<style scoped>

</style>