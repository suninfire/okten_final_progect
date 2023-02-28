import {axiosService} from "./axios.service";

import {urls} from "./urls";


const getUser = async (id) => await axiosService.get(urls.user + `/` + id,{headers:{
        'Authorization': localStorage.getItem('accessToken')
    }});

const registrationUser = async (email,password,username) => {
    const response = await axiosService.post(urls.user + `/`, {email,password,username});
    return response.data
}


export {getUser,registrationUser}