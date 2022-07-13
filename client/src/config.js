import axios from 'axios'


export const axiosInstance = axios.create({
    baseURL: "https://rock-the-vote123.herokuapp.com/api"
})
