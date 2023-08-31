<template>
    <ion-page class="login-page">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title>Faire une annonce</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-item v-if="user.statut === 'client'">
                <ion-label> <a href="/inscription">S'Inscrire en que vendeur pour publier</a></ion-label>
            </ion-item>
            <!-- <h2 class="bg-light border rounded p-0 mt-2 mb-0 tt text-center ">Nouveau produit</h2> -->

            <div class="form-container ion-justify-content-center" v-if="user.statut === 'vendeur'">

                <form @submit.prevent="envoyerAnnonce()" enctype="multipart/form-data">
                    <ion-item class="ion-margin-bottom">
                        <!-- <ion-label position="floating">Email</ion-label> -->

                        <ion-input v-model="annonce.titre" label="Titre" type="text"
                            placeholder="Non du produit ou du service"></ion-input>
                    </ion-item>
                    <ion-item class="ion-margin-bottom">
                        *
                        <!-- <ion-label position="floating">Catégorie</ion-label> -->
                        <ion-select v-model="annonce.type">
                            <ion-select-option disabled selected value="">Sélectionnez un type</ion-select-option>
                            <ion-select-option value="produit">Article</ion-select-option>
                            <ion-select-option value="service">Service</ion-select-option>
                            <ion-select-option value="immobilier">Maison ou terraion</ion-select-option>
                            <!-- Ajoutez d'autres options ici -->
                        </ion-select>
                    </ion-item>
                    <ion-item class="ion-margin-bottom">
                        <!-- <ion-label position="floating">Catégorie</ion-label> -->
                        <ion-select v-model="annonce.categorie">
                            <ion-select-option disabled selected value="">Sélectionnez une catégorie</ion-select-option>
                            <ion-select-option value="64e3920d17474b66cda19df1">Catégorie 2</ion-select-option>
                            <ion-select-option value="64e3920d17474b66cda19df1">Catégorie 3</ion-select-option>
                            <!-- Ajoutez d'autres options ici -->
                        </ion-select>
                    </ion-item>

                    <ion-item class="ion-margin-bottom">
                        <div class="checkbox d-flex">
                            <div class="vente m-2">
                                En vente
                                <ion-checkbox v-model="annonce.en_vente" class="custom-checkbox" value="true"
                                    @ionChange="updateEnVente"></ion-checkbox>
                            </div>
                            <div class="location m-2">
                                En location
                                <ion-checkbox v-model="annonce.en_location" class="custom-checkbox" value="true"
                                    @ionChange="updateEnLocation"></ion-checkbox>
                            </div>

                        </div>
                    </ion-item>
                    <ion-item class="ion-margin-bottom" v-if="annonce.en_vente">
                        <!-- <ion-label position="floating">Mot de passe</ion-label> -->
                        <ion-input v-model="annonce.prix_vente" label="* Prix de vente" type="number"
                            placeholder="ex: 2000"></ion-input>

                    </ion-item>
                    <div class="infos_location" v-if="annonce.en_location">
                        <ion-item class="ion-margin-bottom">
                            <ion-input v-model="annonce.prix_location" label="* Prix de location" type="number"
                                placeholder="ex:2000"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input v-model="annonce.duree_location" label="Durée" type="text"
                                placeholder="ex: par jour"></ion-input>
                        </ion-item>
                    </div>
                    <ion-item class="ion-margin-bottom">
                        <ion-input v-model="annonce.adresse" label="*" type="text"
                            placeholder="Votre adresse ex: Ouagadougou, secteur 52"></ion-input>

                    </ion-item>

                    <ion-item class="ion-margin-bottom">
                        <!-- <ion-label position="floating">Description</ion-label> -->
                        <ion-label>Description</ion-label><br>
                        <ion-textarea v-model="annonce.description" label="*"
                            placeholder="Donnez une description de votre produit. Ex: Une robe en peau de caiman"></ion-textarea>
                    </ion-item>

                    <ion-item class="ion-margin-bottom" v-if="annonce.type == 'produit' || annonce.type == 'immobilier'">
                        <!-- <ion-label position="floating">Description</ion-label> -->
                        <ion-label>Caractéristiques physiques</ion-label>
                        <ion-textarea v-model="annonce.caracteristique" label=""
                            placeholder="ex: couleur, taille"></ion-textarea>
                    </ion-item>
                    <ion-item class="ion-margin-bottom">
                        <ion-input type="file" name="photo" label="Photo du produit"
                            @change="handlePhotoChange"></ion-input>

                    </ion-item>


                    <ion-button type="submit" class="button" color="secondary">Publier</ion-button>


                </form>
            </div>



        </ion-content>
    </ion-page>
</template>

<script>

import { IonPage, IonHeader, IonTitle, IonToolbar, IonContent, IonList, IonItem, IonLabel, IonInput, IonImg, IonButton, IonIcon, IonCheckbox, IonTextarea, IonSelect, IonSelectOption, IonButtons, IonBackButton, alertController } from '@ionic/vue';
import { logoGoogle, logoFacebook, logoTwitter } from "ionicons/icons"
import { defineComponent } from 'vue';
import axios from 'axios'
export default defineComponent({
    components: {
        IonPage,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonInput,
        IonButton,
        IonImg,
        IonIcon, IonButtons, IonBackButton,
        IonCheckbox, IonTextarea,
        IonSelect, IonSelectOption,


    },
    data() {
        return {
            logoGoogle,
            logoFacebook,
            logoTwitter,


            user: {},
            annonce: {
                titre: "",
                en_location: false,
                en_vente: false,
                prix_vente: "",
                prix_location: "",
                duree_location: "",
                description: "",
                date_publication: "",
                categorie: "",
                type: "",
                adresse: "",
                photo: "",
                disponibilite: true,
                proprietaire: "",
                caracteristique: ""
            }
        };
    },
    created() {
        this.user = JSON.parse(sessionStorage.getItem("user"))
    },
    methods: {


        handlePhotoChange(event) {
            const selectedFile = event.target.files[0];
            // Faites quelque chose avec le fichier sélectionné, par exemple :
            this.annonce.photo = selectedFile;
            // console.log("Fichier sélectionné :", selectedFile);
        },
        async presentAlert(error_message, header, subHeader) {
            const alert = await alertController.create({
                header: header,
                subHeader: subHeader,
                message: error_message,
                buttons: ['OK'],
            });
            await alert.present();
        },
        updateEnVente(event) {
            this.annonce.en_vente = event.detail.checked;
        },
        updateEnLocation(event) {
            this.annonce.en_location = event.detail.checked;
        },
        async envoyerAnnonce() {
            // Convertir les valeurs de en_vente et en_location en booléens
            /* his.annonce.en_vente = this.annonce.en_vente === "true";
            this.annonce.en_location = this.annonce.en_location === "true"; */
            if (this.annonce.titre.length < 2 || this.annonce.description.length < 5 || !this.annonce.photo || !this.annonce.categorie || !this.annonce.type || !this.annonce.adresse) {
                await this.presentAlert("Les champs précédés de * sont obligatoires", "Erreur", "Formulaire invalide")
                return
            }
            if (this.annonce.en_location) {
                if (!this.annonce.prix_location || !this.annonce.duree_location) {
                    await this.presentAlert("Les champs précédés de * sont obligatoires", "Erreur", "Formulaire invalide")
                    return
                }
            }
            if (this.annonce.en_vente) {
                if (!this.annonce.prix_vente) {
                    await this.presentAlert("Les champs précédés de * sont obligatoires", "Erreur", "Formulaire invalide")
                    return
                }

            }
            try {
                const formData = new FormData();
                // Ajoutez les champs de l'annonce au FormData
                formData.append('titre', this.annonce.titre);
                formData.append('en_vente', this.annonce.en_vente);
                formData.append('en_location', this.annonce.en_location);
                formData.append('proprietaire', this.user.userId);

                formData.append('prix_vente', this.annonce.prix_vente);
                formData.append('prix_location', this.annonce.prix_location);
                formData.append('duree_location', this.annonce.duree_location);
                formData.append('description', this.annonce.description);
                formData.append('caracteristique', this.annonce.caracteristique);
                formData.append('adresse', this.annonce.adresse);
                formData.append('categorie', this.annonce.categorie);
                formData.append('photo', this.annonce.photo);
                formData.append('type', this.annonce.type);

                // Utilisez Axios pour envoyer les données
                const response = await axios.post('http://localhost:3000/annonces', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('Réponse du serveur :', response.data);

                // Redirigez après l'envoi de l'annonce
                // router.push({ name: 'Annonces' });
                await this.presentAlert("Enregistré avce succès", "Réussir", "Félicitation")
            } catch (error) {
                console.error('Erreur lors de l\'envoi de l\'annonce :', error);
            }
        },

        /*   handlePhotoChange(event) {
              const selectedFile = event.target.files[0];
              this.annonce.photo = selectedFile;
          } */


    },
});
</script>

<style scoped>
.login-page {
    /* --ion-background-color: #f4f4f4; */
    --ion-background-color: linear-gradient(to bottom, rgb(248, 177, 46), rgb(247, 247, 43));
}



.form-container {
    background-color: white;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    margin: 20px;
}

ion-button {
    margin-top: 20px;
}

ion-input,
ion-item,
ion-list {
    --background: transparent;
    color: black;
}

.button {
    width: 100%;
    margin: 15px auto;
}

.custom-checkbox {
    position: relative;
    width: 24px;
    height: 24px;
    border: 2px solid #ccc;
    background-color: white;
    background-image: linear-gradient(45deg, #f5f5f5 25%, transparent 25%, transparent 75%, #f5f5f5 75%, #f5f5f5),
        linear-gradient(45deg, #f5f5f5 25%, transparent 25%, transparent 75%, #f5f5f5 75%, #f5f5f5);
    background-size: 12px 12px;
    background-position: 0 0, 6px 6px;
}

.tt {
    background: linear-gradient(to bottom, rgb(252, 223, 166), rgb(243, 243, 131));
    width: 60%;
    margin: 0 auto;

}
</style>
