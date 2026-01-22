import axios from 'axios'

const instance = axios.create({
    baseURL: '/api',
});
instance.interceptors.response.use(
    (res) => {
        //console.log(res.config.method, ':', res.config.url, res.data);
        return res.data;
    },
    (e) => {
        if (e.status === 401) {
            return;
        }
        let message = e.status //+ ': ' + JSON.stringify(e.response.data);
        if ([502].includes(e.status)) {
            message = e.response.statusText
        }
        return {errors: e}
    },
);
function setLoading(){

}

function unsetLoading(){}
const debug = true
const showResponse = true
function getHeaders(ct?:string|undefined) {
    const token = useCookie('auth_token')
    console.log('zzzzzz', token.value)
    return {
        Authorization: token ? `Bearer ${token.value}` : '',
        'Content-Type': ct
    }
}

export default {
    POST: async (path: string, body?: any): Promise<any> => {
        setLoading()
        if (debug) console.log('POST', path, body);
        //await refresh()
        const res = await instance.post(path, body, {headers: getHeaders()})
        if (res && debug && showResponse) console.log('POST response:', path, res)
        unsetLoading()
        return res
    },
    UPLOAD: async (path: string, body?: any): Promise<any> => {
        setLoading()
        //await new Promise(resolve => setTimeout(resolve, 5000));
        if (debug) console.log('UPLOAD', path, body);
        //await refresh()
        const res = await instance.post(path, body, {headers: getHeaders('multipart/form-data')})
        if (res && debug && showResponse) console.log('POST response:', path, res)
        unsetLoading()
        return res
    },
    PATCH: async (path: string, body?: any): Promise<any> => {
        setLoading()
        //await new Promise(resolve => setTimeout(resolve, 5000));
        if (debug) console.log('PATCH', path, body);
        //await refresh()
        const res = await instance.patch(path, body, {headers: getHeaders()})
        if (res && debug && showResponse) console.log('PATCH response:', path, res)
        unsetLoading()
        return res
    },
    PUT: async (path: string, body?: any): Promise<any> => {
        setLoading()
        if (debug) console.log('PUT', path, body);
        //await refresh()
        const res = await instance.put(path, body, {headers: getHeaders()})
        if (res && debug && showResponse) console.log('PUT response:', path, res)
        unsetLoading()
        return res
    },
    get: async (path: string): Promise<any> => {
        setLoading()
        //await refresh()
        if (debug) console.log('GET', path);
        let res = await instance.get(path, {headers: getHeaders()})
        if (res && debug && showResponse) console.log('GET response:', path, res)
        unsetLoading()
        return res
    },
    DELETE: async (path: string): Promise<any> => {
        setLoading()
        //await refresh()
        if (debug) console.log('DEL', path);
        const res = await instance.delete(path, {headers: getHeaders()})
        if (res && debug && showResponse) console.log('DEL response:', path, res)
        unsetLoading()
        return res
    },
};