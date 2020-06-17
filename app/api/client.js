import { create } from "apisauce"
import cache from "../utilities/cache"

const apiClient = create({
    baseURL: "http://192.168.43.230:9000/api"
})

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
    const response = await get(url, params, axiosConfig)

    if (response.ok) {
        cache.store(url, response.data)
        return response;
    }

    const data = await cache.get(url)

    return value ? { ok: true, data } : response
}

export default apiClient