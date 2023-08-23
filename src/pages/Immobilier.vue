<template>
    <annonce-layout>

        <ion-col size="6" size-md="6" size-lg="4" v-for="ann in annonces" :key="ann.id">
            <router-link :to="{ name: 'Paiement' }" class="" v-if="user && user.statut === 'client'">Devenir
                vendeur</router-link>
            <!-- Ajouter router-link sur ion-card -->
            <ion-card :router-link="`/annonces/${ann.id}`">
                <!-- <ion-img :src="ann.image"></ion-img> -->
                <img :src="ann.image" alt="">
                <ion-card-title>{{ ann.title }}</ion-card-title>
                <ion-card-content>
                    Here's a small text description
                    <!-- Ajouter router-link sur ion-button -->
                    <ion-button fill="clear" :router-link="`/annonces/${ann.id}`">Voir</ion-button>

                </ion-card-content>
            </ion-card>
        </ion-col>
    </annonce-layout>
</template>

<script>
import { IonPage, IonContent, IonButton, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonCardTitle } from '@ionic/vue';
export default {
    name: "Immobiliers",
    components: {
        IonContent,
        IonPage,
        IonButton,
        IonCard,
        IonCardContent,
        IonGrid, IonRow, IonCol,
        IonCardTitle

    },
    data() {
        return {
            user: {}
        }
    },
    created() {
        this.user = JSON.parse(sessionStorage.getItem("user"))
    },

    computed: {
        annonces() {
            return this.$store.state.annonces;
        }
    }

}
</script>

<style scoped>
/* Utiliser une requête média pour changer la taille des images en fonction de la largeur de l'écran */
ion-card>img {
    width: 100%;
    /* height: 200px; */
    height: 50vh;
}

@media (max-width: 600px) {
    ion-card>img {
        height: 150px;
    }
}
</style>