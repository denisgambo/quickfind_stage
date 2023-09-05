<template>
    <base-layout page-title="Nouveau compte">
        <div class="inscription_form">
            <h2 class="bg-light border rounded p-0 tt text-center ">Nouveau compte</h2>
            <form enctype="multipart/form-data" @submit.prevent="submitForm()">
                <ion-grid>
                    <ion-row>
                        <ion-col size="6">
                            <!-- Première colonne avec les ion-input -->
                            <ion-item class="ion-margin-bottom rounded ">
                                <ion-label position="floating">* Nom</ion-label>
                                <ion-input type="text" label="" v-model="user.nom"></ion-input>
                            </ion-item>

                            <ion-item class="ion-margin-bottom rounded">
                                <ion-label position="floating">* Téléphone</ion-label>
                                <ion-input type="text" label="" v-model="user.telephone"></ion-input>
                            </ion-item>

                            <ion-item class="ion-margin-bottom rounded">
                                <ion-label position="floating">* Login</ion-label>
                                <ion-input type="text" label="" v-model="user.login"></ion-input>
                            </ion-item>

                            <ion-item class="ion-margin-bottom rounded">
                                <ion-radio-group v-model="selectedGender">
                                    <ion-item class="small-item">
                                        <ion-radio slot="start" value="Homme">Homme</ion-radio>
                                    </ion-item>
                                    <ion-item class="small-item">
                                        <ion-radio slot="start" value="Femme">Femme</ion-radio>
                                    </ion-item>
                                </ion-radio-group>
                            </ion-item>



                        </ion-col>
                        <ion-col size="6">
                            <!-- Deuxième colonne avec les ion-input -->
                            <ion-item class="ion-margin-bottom rounded">
                                <ion-label position="floating">* Prénom</ion-label>
                                <ion-input type="text" label="" v-model="user.prenom"></ion-input>
                            </ion-item>

                            <ion-item class="ion-margin-bottom rounded">
                                <ion-label position="floating">Email</ion-label>
                                <ion-input type="email" label="" v-model="user.email"></ion-input>
                            </ion-item>
                            <ion-item class="ion-margin-bottom rounded">
                                <ion-label position="floating">* Mot de passe</ion-label>
                                <ion-input type="password" label="" v-model="user.mot_de_passe"></ion-input>
                            </ion-item>


                            <ion-item class="ion-margin-bottom rounded">
                                <ion-label position="floating">* Confirmer mot de
                                    passe</ion-label>
                                <ion-input v-model="confirm_passeword" type="password" label=""></ion-input>
                            </ion-item>


                        </ion-col>

                    </ion-row>
                </ion-grid>
                <ion-item class="ion-margin-bottom">
                    <ion-label position="floating">* Photo profil</ion-label>
                    <ion-input type="file" label="" @change="handlePhotoChange"></ion-input>
                </ion-item>
                <ion-grid>
                    <ion-row>
                        <ion-col size="6">
                            <ion-button type="submit" expand="full" size="large">Valider</ion-button>

                        </ion-col>
                        <ion-col size="6">
                            <ion-button expand="full" size="large" color="danger"
                                @click="resetForm">Réinitialiser</ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </form>

            <div class="btns">
                <div class="oubiler">
                    <p>Vous avez déjà un compte?
                        <ion-button fill="clear" router-link="/connexion">Se connecter ici</ion-button>
                    </p>
                </div>
            </div>
            <div class="social_btns">
                <p>Se connecter avec</p>

                <div class="btns">
                    <!-- liste des boutons pour les réseaux sociaux -->

                    <!-- Créer un bouton pour Google avec l'icône ion-social-google -->
                    <ion-button fill="clear">
                        <ion-icon :icon="logoGoogle"></ion-icon>
                    </ion-button>
                    <!-- Créer un bouton pour Facebook avec l'icône ion-social-facebook -->
                    <ion-button fill="clear">
                        <ion-icon :icon="logoFacebook"></ion-icon>
                    </ion-button>
                    <!-- Créer un bouton pour Facebook avec l'icône ion-social-facebook -->
                    <ion-button fill="clear">
                        <ion-icon :icon="logoTwitter"></ion-icon>
                    </ion-button>

                </div>
            </div>
        </div>

    </base-layout>
</template>

<script>
import BaseLayout from "../components/Base/BaseLayout.vue";
import { IonCol, IonRow, IonGrid, IonInput, IonLabel, IonItem, IonRadio, IonRadioGroup, IonButton, IonIcon, alertController } from
    '@ionic/vue';
import { logoGoogle, logoFacebook, logoTwitter } from "ionicons/icons"
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Inscription",
    components: { BaseLayout, IonCol, IonRow, IonGrid, IonInput, IonLabel, IonItem, IonRadio, IonRadioGroup, IonButton, IonIcon },
    data() {
        return {
            selectedGender: "",
            logoGoogle,
            logoFacebook,
            logoTwitter,
            confirm_passeword: "",
            user: {
                nom: "",
                prenom: "",
                email: "",
                telephone: "",
                login: "",
                mot_de_passe: "",
                statut: "client",
                genre: "",
                photo_profil: "",
                bloquer: false
            }
        };
    },
    methods: {
        async presentAlert(error_message, header) {
            const alert = await alertController.create({
                header: header,
                message: error_message,
                buttons: ['OK'],
            });
            await alert.present();
        },
        async submitForm() {
            // Convertir les valeurs booléennes en chaînes pour les valeurs de radio
            this.user.genre = this.selectedGender;

            // Créer un objet FormData
            const formData = new FormData();

            //Tester les données
            if (!this.user.login || !this.user.mot_de_passe || !this.user.nom || !this.user.nom || !this.user.prenom || !this.user.photo_profil) {
                await this.presentAlert("Les champs précédés de * sont obligatoires", "Erreur")
                return
            }
            if (!this.compare(this.user.mot_de_passe, this.confirm_passeword)) {
                await this.presentAlert("Les mots de passe doivent correspondre", "Erreur de confirmation")
                return
            }

            if (this.user.mot_de_passe.length < 6) {
                await this.presentAlert("Le mot de passe doit etre au moins de 6 caractères", "Erreur")
                return

            }


            // Ajouter les données du formulaire au FormData
            Object.keys(this.user).forEach(key => {
                formData.append(key, this.user[key]);
            });
            /* formData.append('nom', this.user.nom);
            formData.append('prenom', this.user.prenom);
            formData.append('email', this.user.email);
            formData.append('telephone', this.user.telephone);
            formData.append('login', this.user.login);
            formData.append('mot_de_passe', this.user.mot_de_passe);
            formData.append('statut', this.user.statut);
            formData.append('genre', this.user.genre);
            formData.append('photo_profil', this.user.photo_profil);
            formData.append('bloquer', this.user.bloquer); */

            try {
                // Envoyer le formulaire à l'API en utilisant Axios
                const response = await axios.post('http://localhost:3000/user', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('Réponse de l\'API:', response.data);
                await this.presentAlert("Votre compte a été créé", "Félicitaions")

                // Réinitialiser le formulaire
                this.resetForm();

                // Rediriger ou faire d'autres actions en cas de succès
            } catch (error) {
                console.error('Erreur lors de l\'envoi du formulaire:', error);
                // Gérer les erreurs ici
            }
        },
        // ...,
        handlePhotoChange(event) {
            const selectedFile = event.target.files[0];
            this.user.photo_profil = selectedFile;
        },
        compare(a, b) {
            return a === b
        },
        resetForm() {
            // Réinitialisez les données du formulaire
            this.selectedGender = null;
            // Réinitialisez les autres champs ici
        }
    }
});
</script>


<style scoped>
.inscription_form {
    --ion-background-color: linear-gradient(to bottom, rgb(243, 229, 200), rgb(204, 204, 126));
    --ion-background-color: linear-gradient(to bottom, rgb(252, 223, 166), rgb(243, 243, 131));
    /* background: linear-gradient(to right, #ff6a88, #7834be); */
    /* Remplacez les couleurs par celles de votre choix */
    padding: 20px;
    /* Ajoutez un peu d'espacement autour du formulaire */
    border-radius: 10px;
    /* Ajoutez des coins arrondis au formulaire */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    /* Ajoutez une ombre légère */


}

.tt {
    background: linear-gradient(to bottom, rgb(252, 223, 166), rgb(243, 243, 131));
    width: 60%;
    margin: 0 auto;

}

.small-item {
    height: 35px;
    /* Réduire la hauteur */
    padding: 5px;
    /* Ajuster le padding */
    margin: 3px;
    /* Ajuster les marges */
}

.button {
    width: 100%;
    margin: 15px auto;
}

.btns {
    width: 80%;
    margin: 0 auto;
}

p {
    color: black;
}

.btns {
    display: flex;
    color: white;
}
</style>
