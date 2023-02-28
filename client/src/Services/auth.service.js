import {axiosService} from "./axios.service";

import {urls} from "./urls";

const auth = {
    login: async (email, password) => {
        const response = await axiosService.post(urls.auth + '/login', { email,password });
        return response.data;
    },

    logout: async () => {
        await axiosService.post(urls.auth +'/logout',{},{headers:{
                'Authorization': localStorage.getItem('accessToken')
            }});
        localStorage.clear()
        window.location.href = '/auth/login'
    },

    refresh: async () => {
        const response = await axiosService.post(urls.auth + '/refresh',{},{headers:{
                'Authorization': localStorage.getItem('refreshToken')
            }});
        await localStorage.setItem('accessToken',response.data.access_token);
        await localStorage.setItem('refreshToken',response.data.refresh_token);
        window.location.reload()
    },
};

export default auth;
