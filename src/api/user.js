import axios from 'axios';
const API_URL = 'http://127.0.0.1:3000';

async function login(login, password) {
    try {
        const response = await axios.post(`${API_URL}/user/login`, {
            login: login,
            mot_de_passe: password
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export { login };
