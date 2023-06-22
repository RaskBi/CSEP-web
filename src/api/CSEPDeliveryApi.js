import axios from "axios";

export const CSEPDeliveryApi = axios.create({
    baseURL: "http://186.33.132.4:81/"
});

// Todo: configurar interceptores
CSEPDeliveryApi.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'Authorization':localStorage.getItem('Token')
    }
    return config;
})
