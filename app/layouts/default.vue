<template lang="pug">
  q-layout( view="hHh Lpr lff")
    q-header( elevated)
      q-linear-progress#progress(color="orange" indeterminate v-if="loading" )
      q-toolbar
        q-btn( flat dense round icon="mdi-menu" aria-label="Menu" @click="toggleLeftDrawer" )

        q-toolbar-title Quasar App

    q-drawer(v-model="leftDrawerOpen" bordered side="right")
      q-list
        q-item-label( header) Menu
        q-item(v-for="link in menuItems.filter(i=>i.show)" clickable tag="a"  :to="link.link")
          q-item-section(avatar)
            q-icon(:name="link.icon")
          q-item-section
            q-item-label {{ link.title }}
            q-item-label( caption) {{ link.caption }}
    q-page-container
      slot
    //q-footer
      q-toolbar
        div Quasar v{{ $q.version }}
</template>
<style lang="sass">
#progress
  position: absolute
  height: 10px
  z-index: 100000000

</style>

<script setup lang="ts">
import {useCustomStore} from "~/store/custom-store";


const router = useRouter();
const {loggedUser, loading} = storeToRefs(useCustomStore())

const menuItems = computed(() => {
  return [
    {
      title: 'Home',
      caption: '',
      icon: 'mdi-code',
      link: '/',
      show: true
    },
    {
      title: 'Blog',
      caption: 'view posts',
      icon: 'mdi-school',
      link: '/blog',
      show: true
    },
    {
      title: 'Add post',
      caption: 'Create post',
      icon: 'mdi-edit',
      link: '/post/create',
      show: loggedUser.value?.publisher
    },
    {
      title: 'Sign out',
      caption: '',
      icon: 'mdi-logout',
      link: '/user/logout',
      show: loggedUser.value
    },
    {
      title: loggedUser.value?.email,
      caption: 'Cabinet',
      icon: 'mdi-edit',
      link: '/user/cabinet',
      show: loggedUser.value
    },
    {
      title: 'Login',
      caption: '',
      icon: 'mdi-login',
      link: '/user/login',
      show: !loggedUser.value
    },{
      title: 'Registration',
      caption: '',
      icon: 'mdi-login',
      link: '/user/registration',
      show: !loggedUser.value
    }
  ]



})



const leftDrawerOpen = ref(true);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
