import axios from "axios";

const baseURL = "http://154.12.236.19:804/";
export const CSEPDeliveryApi = axios.create({
    baseURL: baseURL
});

// Todo: configurar interceptores
CSEPDeliveryApi.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'Authorization':localStorage.getItem('Token')
    }
    return config;
})

export const apiURL = baseURL