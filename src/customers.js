import axios from 'axios';
import apiURL from './api';

export function getCustomerList(){
    return axios.get(apiURL).then((response) => {
        return response.data;
    });
}

export function createCustomer(userInfo){
    return axios.post(apiURL, userInfo).then((response) => {
        return response.data;
    });
}

export function getCustomer(id){
    return axios.get(apiURL + id).then((response) => {
        return response.data;
    });
}

export function updateCustomer(id, obj){
    return axios.patch(apiURL + id, obj).then((response) => {
        return response.data;
    });
}
