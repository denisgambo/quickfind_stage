import axios from 'axios';

// Remplacez cette URL par celle de votre API hébergée localement
const API_URL = 'http://127.0.0.1:3000';

async function envoyerMessage(message) {
    try {
        const response = await axios.post(`${API_URL}/messages`, message);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        throw error;
    }
}

export {envoyerMessage};
