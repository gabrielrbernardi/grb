import axios from 'axios';

declare module 'axios' {
    export interface AxiosRequestConfig {
        baseURL?: string,
        token?: string,
    }
}

const apiGrb = axios.create({
    // baseURL: 'http://localhost:3333/',
    baseURL: 'https://grbbackend.herokuapp.com/',
    // timeout: 10000,
    headers: {token: 'senha'}
});

export default apiGrb;