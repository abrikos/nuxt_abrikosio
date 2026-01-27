import {defineStore} from 'pinia';

export interface UserPayloadInterface {
    email?: string;
    password?: string;
    error?: string;
    avatar?: string;
    is_admin?: boolean;
    publisher?: boolean;
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
            const token = await useNuxtApp().$POST(`/auth/login`, credentials)
            if (token.error) return token;
            navigateTo(this.redirect)
        },
        async signup(credentials: UserPayloadInterface) {
            const user = await useNuxtApp().$POST('/auth/registration', credentials) as UserPayloadInterface
            if (user && !user.error) {
                await this.login(credentials);
            }
            return user;
        },
        async getMe() {
            const user = await useNuxtApp().$GET('/auth/me') as UserPayloadInterface
            if (!user?.error) {
                this.loggedUser = user;
                return this.loggedUser;
            }
        },
        logout() {
            this.loggedUser = undefined;
            const config = useRuntimeConfig()
            const cookie = useCookie(config.public.authTokenName)
            cookie.value = '';
        },

    },
});
