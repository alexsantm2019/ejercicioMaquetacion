import Axios from 'axios';
import Conf from '../conf.js';
const server = Conf.server;

export default {

    login(data) {
        let url = server + "auth/login";
        return Axios.post(url, data);
    },

    user(data) {
        let url = server + "user";
        return Axios.post(url, data);
    },

};