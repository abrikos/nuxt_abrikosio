import {useCustomStore} from '~/store/custom-store';
//import {storeToRefs} from "pinia"; // import the auth store we just created
export default defineNuxtRouteMiddleware(async (to, from) => {
    // const {checkAuth, setRedirect, redirect} = useCustomStore();
    // const config =useRuntimeConfig()
    // const authPages = config.public.authPages
    //
    // const loggedUser = await checkAuth()
    // if (authPages.includes(to.name as string)) {
    //     if(!loggedUser) {
    //         setRedirect(to.fullPath)
    //         console.log('TO login')
    //         return '/user/login';
    //     }
    // } else if (loggedUser) {
    //     return redirect;
    // }
});