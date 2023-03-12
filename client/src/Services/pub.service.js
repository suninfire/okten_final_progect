import {axiosService} from "./axios.service";

import {urls} from "./urls";


const getPubs =  () =>  axiosService.get(urls.pub,{headers:{
            'Authorization': localStorage.getItem('accessToken')
        }});

const getPubById =  (id) => axiosService.get(urls.pub+'/'+id,{headers:{
        'Authorization': localStorage.getItem('accessToken')
    }});

export {getPubs,getPubById}