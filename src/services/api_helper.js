import axios from 'axios';

const api = axios.create({
    baseURL: "https://peaceful-wildwood-15287.herokuapp.com"
})
// https://peaceful-wildwood-15287.herokuapp.com
// "http://localhost:3001"
//====================== Auth ==========================
export const verifyUser = async () => {
    const token = localStorage.getItem('authToken');

    if(token) {
        api.defaults.headers.common.authorization = `Bearer ${token}`;
        const resp = await api.get('/auth/verify');
        return resp.data;
    }
    return false;
}

export const loginUser = async (loginData) => {
    const resp = await api.post('/auth/login', loginData);
    localStorage.setItem('authToken', resp.data.token);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
    return resp.data.user;
}

export const createUser = async (registerData) => {
    const resp = await api.post('/auth/signup', registerData);
    localStorage.setItem('authToken', resp.data.token);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
    console.log(resp)
    return resp.data.user;
}


//====================== Profile ==========================

export const destroyProfile = async (id) => {
    await api.delete(`/profile/${id}`);
}

export const putProfile = async (id, profileData) => {
    const resp = await api.put(`/profile/${id}`, profileData);
    return resp.data;
}

export const getSavedTrails = async(id) => {
    const resp = await api.get(`/profile/${id}`);
    return resp.data;
}

export const destroySavedTrail = async(userId, trailId) => {
     await api.delete(`/profile/${userId}/${trailId}`)
}

//====================== Trails ==========================

export const bulkPostTrails = async (trails) => {
    await api.post(`/trails/bulk`, trails)
}

export const getTrail = async (trailId) => {
    // console.log(trailId)
    const resp = await api.get(`/trails/${trailId}`);
    console.log(resp.data)
    return resp.data;
}

export const postSavedTrails = async (data) => {
    await api.post('/profile/saveTrail', data);
} 



//====================== Reviews ==========================

export const getAllReviews = async (id) => {
    const resp = await api.get(`/reviews/all`);
    return resp.data;
}

export const destroyReview = async (reviewId) => {
    await api.delete(`/reviews/${reviewId}`)
}

export const postReview = async (postData) => {
    console.log(postData)
    await api.post(`/reviews/create`, postData)
}