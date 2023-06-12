import axios from 'axios';

const API = axios.create();
API.interceptors.request.use((req) => {
    const profile = localStorage.getItem('profile');
    if (profile) {
        req.headers.authorization = `Bearer ${JSON.parse(profile).token}`;
    }
    return req;
});

export default API;