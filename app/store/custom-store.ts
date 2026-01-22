import {defineStore} from 'pinia';
import axios from '~/store/axios';

export interface UserPayloadInterface {
    email?: string;
    password?: string;
    errors?: string;
    avatar?: string;

}

export const useCustomStore = defineStore('auth', {
    state: (): { loading: boolean, loggedUser: UserPayloadInterface | undefined, redirect: string } => ({
        loggedUser: undefined,
        loading: false,
        redirect: '',
    }),
    actions: {
        setRedirect(path: string) {
            this.redirect = path
        },
        setLoading() {
            this.loading = true
        },
        unsetLoading() {
            this.loading = false
        },


        async login(credentials: UserPayloadInterface) {
            const token = await useNuxtApp().$POST(`/token/`, credentials) as unknown as { access: string }
            if (!token) return;
            const config = useRuntimeConfig()
            const cookie = useCookie(config.public.authTokenName)
            cookie.value = token.access
            if (await this.checkAuth()) {
                navigateTo(this.redirect)
                //navigateTo('/user/cabinet')
            }
        },
        async signup(credentials: UserPayloadInterface) {
            const user = await useNuxtApp().$POST('/user/', credentials) as unknown as { errors: object };
            if (user && !user.errors) {
                await this.login(credentials);
            }
            return user;
        },
        async checkAuth() {
            const token = useCookie('auth_token')
            console.log('ffffffff', token)
            const headers = {Authorization: token.value ? `Bearer ${token.value}` : token.value}
            const user = await axios.get('/user/auth', {headers}) as UserPayloadInterface;
            if (user && !user.errors) {
                this.loggedUser = user;
                return this.loggedUser;
            } else {
                //token.value = '';
            }
        },
        logout() {
            this.loggedUser = undefined;
            const config = useRuntimeConfig()
            const cookie = useCookie(config.public.authTokenName)
            cookie.value = '';
            console.log(this.loggedUser)
        },


        // async getUser(){
        //     if (!this.loggedUser) {
        //         this.loggedUser = await useNuxtApp().$GET('/user/auth') as object|undefined;
        //     }
        //     return this.loggedUser
        // },
        // async authenticateUser(body: UserPayloadInterface) {
        //     const data = await useNuxtApp().$POST(`/token/`, body)
        //     if (!data) return
        //     const token = useCookie(config.public.authTokenName)
        //     this.loggedUser = data
        //     navigateTo(this.redirect)
        // },
        // async signupUser(body: UserPayloadInterface) {
        //     const data: any = await useNuxtApp().$PUT(`/user/signup/`, body)
        //     if (!data) return
        //     this.loggedUser = await this.getUser()
        //     navigateTo('/')
        // },
        // async logUserOut() {
        //     const token = useCookie(config.public.authTokenName)
        //     token.value = ''
        //     this.loggedUser = undefined
        //     navigateTo('/user/login')
        // },

    },
});
