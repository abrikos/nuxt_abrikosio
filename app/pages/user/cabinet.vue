<script setup lang="ts">
import {useCustomStore} from "~/store/custom-store";

const user = ref({password: '', password2: ''})
const {loggedUser, loading} = storeToRefs(useCustomStore())
async function submit() {
  await useNuxtApp().$POST('/user/password', user.value)
  reset()
}

function reset() {
  user.value = {password: '', password2: ''};
}
</script>

<template lang="pug">
q-card.q-pa-sm.q-ma-sm
  q-toolbar.bg-grey-3
    q-toolbar-title Смена пароля
  q-card-section {{loggedUser}}
    q-form(@submit="submit" @reset="reset")
      q-input(label="Новый пароль" type="password" v-model="user.password" )
      q-input(label="Подтверждение пароля" type="password" v-model="user.password2" )
      q-card-actions
        q-btn(type="submit" label="Отправить" color="primary" )
        q-btn(type="reset" label="Сбросить" )

</template>

<style scoped>

</style>
