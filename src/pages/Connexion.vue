<template>
    <ion-page class="login-page">
        <ion-header>
            <ion-toolbar>
                <ion-title>Se connecter</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="logo-container">
                <img src="../assets/images/logo/logo3.png" alt="Logo" class="logo" />
            </div>
            <div class="form-container ion-justify-content-center">
                <ion-item>
                    <!-- <ion-label position="floating">Email</ion-label> -->

                    <ion-input label="Email" v-model="email" type="email" placeholder="exemple@gmail.com"></ion-input>
                </ion-item>
                <ion-item>
                    <!-- <ion-label position="floating">Mot de passe</ion-label> -->
                    <ion-input label="Mot de passe" v-model="password" type="password" placeholder="******"></ion-input>
                </ion-item>

                <ion-button @click="login" class="button" color="secondary">Se connecter</ion-button>
                <p>Pas de compte ? <ion-button fill="clear" router-link="/inscription">S'inscrire</ion-button>
                </p>

            </div>
            <!--  <div class="button ion-justify-content-center">
                <ion-button @click="login">Se connecter</ion-button>
            </div> -->
            <div class="btns">
                <div class="oubiler">
                    <p>Mot de pas oublié ?</p>
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

        </ion-content>
    </ion-page>
</template>

<script>

import { IonPage, IonHeader, IonTitle, IonToolbar, IonContent, IonList, IonItem, IonLabel, IonInput, IonImg, IonButton, IonIcon } from '@ionic/vue';
import { add, logoGoogle, logoFacebook, logoTwitter } from "ionicons/icons"
import router from '../router';
export default {
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
        IonIcon
    },
    data() {
        return {
            email: '',
            password: '',
            add,
            logoGoogle,
            logoFacebook,
            logoTwitter
        };
    },
    /*  created() {
         this.gotoAnnonces()
     }, */
    methods: {
        login() {
            // Ajoutez ici votre logique de connexion
            router.push({ name: 'Annonces' });
        },
        gotoInscription() {
            router.push({ name: 'Inscription' });
        },

        /* gotoAnnonces() {
            router.push({ name: 'Annonces' })
        } */
    },
};
</script>

<style scoped>
.login-page {
    /* --ion-background-color: #f4f4f4; */
    --ion-background-color: linear-gradient(to bottom, rgb(248, 177, 46), rgb(247, 247, 43));
}



.logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30vh;
}

.logo-container>img {
    max-width: 200px;
    border-radius: 50%;
}

.logo {
    max-width: 100%;
    height: auto;
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
