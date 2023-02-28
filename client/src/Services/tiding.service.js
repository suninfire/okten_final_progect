import {axiosService} from "./axios.service";

import {urls} from "./urls";


const getTidings = () => axiosService.get(urls.tiding,{headers:{
        'Authorization': localStorage.getItem('accessToken')
    }})


export {getTidings}