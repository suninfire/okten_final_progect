import {axiosService} from "./axios.service";

import {urls} from "./urls";


const getResponses = () => axiosService.get(urls.response,{headers:{
        'Authorization': localStorage.getItem('accessToken')
    }});

const postResponse = (userId,pubId,rating,comment,receipt) => axiosService.post(urls.response + '/' + userId + '/' + pubId, {rating,comment,receipt},
    {headers: {'Authorization': localStorage.getItem('accessToken')}})


export {getResponses,postResponse}

