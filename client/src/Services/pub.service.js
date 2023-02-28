import {axiosService} from "./axios.service";

import {urls} from "./urls";


const getPubs = async () => await axiosService.get(urls.pub,{headers:{
            'Authorization': localStorage.getItem('accessToken')
        }});

const getPubById = async (id) => await axiosService.get(urls.pub+'/'+id,{headers:{
        'Authorization': localStorage.getItem('accessToken')
    }});

export {getPubs,getPubById}