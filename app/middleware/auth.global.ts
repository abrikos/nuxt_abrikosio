import {useCustomStore} from '~/store/custom-store';
//import {storeToRefs} from "pinia"; // import the auth store we just created
export default defineNuxtRouteMiddleware(async (to, from) => {
    const {checkAuth, setRedirect, redirect} = useCustomStore();
    const pagesWithAuth = ['post', 'user-cabinet',]
    console.log(to.name)
    const loggedUser = await checkAuth()
    if (pagesWithAuth.includes(to.name as string)) {
        if(!loggedUser) {
            setRedirect(to.fullPath)
            return navigateTo('/user/login');
        }
    } else if (redirect) {
        console.log('zzzzzzz', redirect)
        return redirect;
    }
});