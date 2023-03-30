import {axiosService} from "./axios.service";

import {urls} from "./urls";


const getPubs =  () =>  axiosService.get(urls.pub,{headers:{
            'Authorization': localStorage.getItem('accessToken')
        }});

const getPubsForExpect =  () =>  axiosService.get(urls.pub + `/expects`,{headers:{
        'Authorization': localStorage.getItem('accessToken')
    }});


const getPubById =  (id) => axiosService.get(urls.pub+'/'+id,
    {headers:{'Authorization': localStorage.getItem('accessToken')
    }});

const createPub = async (name, contacts, administrator, photo, location, openTime, closeTime, tags, averageCheck) => {
    const response = await axiosService.post(urls.pub + `/`, {name,contacts,administrator,photo,location,openTime,closeTime,tags,averageCheck},
        {headers:{'Authorization': localStorage.getItem('accessToken')
            }});
    return response.data;

}

export {getPubs,getPubById,createPub,getPubsForExpect}