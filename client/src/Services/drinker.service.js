import {axiosService} from "./axios.service";

import {urls} from "./urls";


const getDrinkers = () => axiosService.get(urls.drinker + `/`,{headers:{
        'Authorization': localStorage.getItem('accessToken')
    }});

const getDrinker = (id) => axiosService.get(urls.drinker + `/` + id,{headers:{
        'Authorization': localStorage.getItem('accessToken')
    }});

const createDrinker = (pub,meetOwner,date,time,description,criteria) => axiosService.post(urls.drinker + `/` + meetOwner + '/' + pub, {date,time,description,criteria},{headers:{
            'Authorization': localStorage.getItem('accessToken')}});

export {getDrinkers, getDrinker, createDrinker}

