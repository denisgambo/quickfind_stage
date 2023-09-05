import axios from 'axios';

// Remplacez cette URL par celle de votre API hébergée localement
const API_URL = 'http://127.0.0.1:3000';

async function envoyerAvis(newAvis) {
    try {
        const response = await axios.post(`${API_URL}/avis`, newAvis);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        throw error;
    }
}


async function avisParAnnonce(annonce) {
    try {
        const response = await axios.get(`${API_URL}/avis/avis_par_annonce?annonce=${annonce}`);
        return response.data.avis;
    } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
        throw error;
    }
}

export {envoyerAvis, avisParAnnonce};
