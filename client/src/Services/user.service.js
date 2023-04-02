import {axiosService} from "./axios.service";

import {urls} from "./urls";

const getUsers = () => axiosService.get(urls.user,{headers:{
        'Authorization': localStorage.getItem('accessToken')
    }});

const getUser = (id) => axiosService.get(urls.user + `/` + id,{headers:{
        'Authorization': localStorage.getItem('accessToken')
    }});


const registrationUser = async (email,password,username) => {
    const response = await axiosService.post(urls.user + `/`, {email,password,username});
    return response.data;
};


const likePub =  (userId,pubId) => axiosService.patch(
    urls.user + '/likes/pubs',
    {userId, pubId},
    {headers:{
        'Authorization': localStorage.getItem('accessToken')}})
    .catch(e=>console.log(e))
    .then(r => console.log(r));


const deleteUser = (id) => {
    axiosService.delete(urls.user + `/` + id, {
        headers: {
            'Authorization': localStorage.getItem('accessToken')
        }
    }).then(r => console.log(r));
    window.location.reload();
};


const updateUser = async (id,username,email,administrator,pub,adminPhone) => {
    await axiosService.patch(urls.user + `/` + id, {username, email, administrator, pub, adminPhone},{
        headers: {
            'Authorization': localStorage.getItem('accessToken')
        }
    }).then(r => console.log(r));
    window.location.reload();
};

export {getUser,registrationUser,likePub,deleteUser,updateUser,getUsers}