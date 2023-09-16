import axios from "axios";

const baseURL = "http://186.33.132.4:81/";
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