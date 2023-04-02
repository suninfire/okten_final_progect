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
};

const deletePub = (id) => {
    axiosService.delete(urls.pub + `/` + id, {
        headers: {
            'Authorization': localStorage.getItem('accessToken')
        }
    }).then(r => console.log(r));
    window.location.reload();
};


const updatePub = async (id,administrator,contacts,name,location,openTime,closeTime,tags,averageCheck,rating) => {
    console.log(administrator)
    await axiosService.patch(urls.pub + `/` + id, {administrator,contacts,name,location,openTime,closeTime,tags,averageCheck,rating},{
        headers: {
            'Authorization': localStorage.getItem('accessToken')
        }
    }).then(r => console.log(r));
    window.location.reload();
};

const updateExpectPub = async (id,expect) => {
    await axiosService.patch(urls.pub + `/expects/` + id, expect,{
        headers: {
            'Authorization': localStorage.getItem('accessToken')
        }
    }).then(r => console.log(r));
    window.location.reload();
};

export {getPubs,getPubById,createPub,getPubsForExpect,deletePub,updatePub,updateExpectPub}