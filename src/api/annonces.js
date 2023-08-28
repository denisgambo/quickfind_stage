import axios from 'axios'
const API_URL = 'http://127.0.0.1:3000';

async function ToutesAnnonces() {
    try {
        const response = await axios.get(`${API_URL}/annonces`);
        return response.data.annonces;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function ToutesAnnoncesProduits() {
    try {
        const response = await axios.get(`${API_URL}/annonces/produits`);
        return response.data.annonces;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function ToutesAnnoncesServices() {
    try {
        const response = await axios.get(`${API_URL}/annonces/services`);
        return response.data.annonces;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function ToutesAnnoncesImmobilier() {
    try {
        const response = await axios.get(`${API_URL}/annonces/immobilier`);
        return response.data.annonces;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function AnnonceParId(id) {
    try {
        const response = await axios.get(`${API_URL}/annonces/${id}`);
        return response.data.annonce;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { ToutesAnnonces, ToutesAnnoncesProduits, ToutesAnnoncesServices,ToutesAnnoncesImmobilier, AnnonceParId };