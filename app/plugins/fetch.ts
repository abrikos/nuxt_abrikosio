import {useCustomStore} from '~/store/custom-store'
import moment from "moment";
import {useQuasar} from 'quasar'
import axios from 'axios'

export default defineNuxtPlugin((_nuxtApp) => {
    const config = useRuntimeConfig()
    const $q = useQuasar()
    const {logout, setLoading, unsetLoading} = useCustomStore()

    function getHeaders(ct?: string | undefined) {
        const access_token = useCookie(config.public.authTokenName)
        return {
            Authorization: access_token.value ? `Bearer ${access_token.value}` : '',
            'Content-Type': ct
        }
    }


    function onError(e: any) {
        if (e.status === 401) return logout()
        $q.notify({
            color: 'negative',
            icon: 'mdi-alert-circle',
            message: e.status + ': ' + JSON.stringify(e.response._data.message || e.response._data),
            position: 'top',
        })
        console.log(e.response._data.message, e.response._data)
        return {errors: e.response._data}

    }

    const instance = axios.create({
        baseURL: '/api',
    });

    instance.interceptors.response.use(
        (res) => {
            console.log(res.config.method, ':', res.config.url, res.data);
            return res.data;
        },
        (e) => {
            if (e.status !== 401) {
                let message = e.status + ': ' + JSON.stringify(e.response.data.detail);
                if ([502].includes(e.status)) {
                    message = e.response.statusText
                }

                $q.notify({
                    color: 'negative',
                    icon: 'mdi-alert-circle',
                    message,
                    position: 'bottom-left',
                })
            }
            return {...e, error: e.response.data?.detail}
        },
    );


    const debug = true
    const showResponse = false
    return {
        provide: {
            POST: async (path: string, body?: any): Promise<any> => {
                setLoading()
                if (debug) console.log('POST', path, body);
                const res = await instance.post(path, body, {headers: getHeaders()})
                if (res && debug && showResponse) console.log('POST response:', path, res)
                unsetLoading()
                return res
            },
            UPLOAD: async (path: string, body?: any): Promise<any> => {
                setLoading()
                //await new Promise(resolve => setTimeout(resolve, 5000));
                if (debug) console.log('UPLOAD', path, body);
                const res = await instance.post(path, body, {headers: getHeaders('multipart/form-data')})
                if (res && debug && showResponse) console.log('POST response:', path, res)
                unsetLoading()
                return res
            },
            PATCH: async (path: string, body?: any): Promise<any> => {
                setLoading()
                //await new Promise(resolve => setTimeout(resolve, 5000));
                if (debug) console.log('PATCH', path, body);
                const res = await instance.patch(path, body, {headers: getHeaders()})
                if (res && debug && showResponse) console.log('PATCH response:', path, res)
                unsetLoading()
                return res
            },
            PUT: async (path: string, body?: any): Promise<any> => {
                setLoading()
                if (debug) console.log('PUT', path, body);
                const res = await instance.put(path, body, {headers: getHeaders()})
                if (res && debug && showResponse) console.log('PUT response:', path, res)
                unsetLoading()
                return res
            },
            GET: async (path: string): Promise<any> => {
                setLoading()
                if (debug) console.log('GET', path);
                let res = await instance.get(path, {headers: getHeaders()})
                if (res && debug && showResponse) console.log('GET response:', path, res)
                unsetLoading()
                return res
            },
            DELETE: async (path: string): Promise<any> => {
                setLoading()
                if (debug) console.log('DEL', path);
                const res = await instance.delete(path, {headers: getHeaders()})
                if (res && debug && showResponse) console.log('DEL response:', path, res)
                unsetLoading()
                return res
            },
        }
    }
})
