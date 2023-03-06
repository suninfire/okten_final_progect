import {axiosService} from "./axios.service";

import {urls} from "./urls";


const getUser = (id) => axiosService.get(urls.user + `/` + id,{headers:{
        'Authorization': localStorage.getItem('accessToken')
    }});

const registrationUser = async (email,password,username) => {
    const response = await axiosService.post(urls.user + `/`, {email,password,username});
    return response.data
}

const likePub = async (userId,pubId) =>  await axiosService.patch(
    urls.user + '/likes/pubs',
    {userId, pubId},
    {headers:{'Authorization': localStorage.getItem('accessToken')}}).catch(e=>console.log(e));


export {getUser,registrationUser,likePub}