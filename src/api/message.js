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


async function messageParDestinataire(destinataire) {
    try {
        const response = await axios.get(`${API_URL}/messages/message_par_destinataire?destinataire=${destinataire}`);
        return response.data.messages;
    } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
        throw error;
    }
}
async function SupprimerMessage(id) {
    try {
        const response = await axios.delete(`${API_URL}/messages/${id}`);
        return response.data.message;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export {envoyerMessage, messageParDestinataire, SupprimerMessage};
