import axios from 'axios';
import { isEmpty } from 'lodash';

import store from 'store';

const api_url = process.env.REACT_APP_API_URL;

const authClient = () => {
    const defaultOptions = {
        baseURL: api_url,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let instance = axios.create(defaultOptions);

    instance.interceptors.request.use((config) => {
        const user = store.getState().user;
        console.log('user in state for axios authClient: ', user);
        if (!isEmpty(user.data) && user.data.token) {
            const { token } = user.data;
            console.log('Found a valid token for axios: ', token);
            config.headers.Authorization = token ? `Bearer ${token}` : '';
        }
        return config;
    })

    return instance;
}

let client = axios.create({
    baseURL: api_url
  });
  
client.defaults.headers.common['Content-Type'] = 'application/json';

let uploadClient = axios.create({
    baseURL: api_url
})
uploadClient.defaults.headers.common['Content-Type'] = 'multipart/form-data';
  
export {
    authClient,
    client,
    uploadClient,
}


  
