<template>
    <annonce-layout>

        <ion-col size="6" size-md="6" size-lg="4" v-for="ann in annonces" :key="ann.id">
            <router-link :to="{ name: 'Paiement' }" class="" v-if="user && user.statut === 'client'">Devenir
                vendeur</router-link>
            <!-- Ajouter router-link sur ion-card -->
            <ion-card :router-link="`/annonces/${ann._id}`">
                <!-- <ion-img :src="ann.image"></ion-img> -->
                <img :src="ann.photo[0]" alt="">
                <ion-card-title>{{ ann.title }}</ion-card-title>
                <ion-card-content>
                    <ion-text>
                        <h2 v-if="ann.prix_vente">Vente: {{ ann.prix_vente }} FCFA</h2>
                        <h2 v-if="ann.prix_location">Location: {{ ann.prix_location }} FCAF/{{ ann.duree_location }}
                        </h2>
                    </ion-text>
                    <!-- Ajouter router-link sur ion-button -->
                    <ion-button fill="clear" :router-link="`/annonces/${ann._id}`">Voir</ion-button>

                </ion-card-content>
            </ion-card>
        </ion-col>
    </annonce-layout>
</template>

<script>
import { ToutesAnnoncesImmobilier } from '../api/annonces';
import { IonPage, IonContent, IonButton, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonCardTitle, IonText } from '@ionic/vue';
export default {
    name: "Immobiliers",
    components: {
        IonContent,
        IonPage,
        IonButton,
        IonCard,
        IonCardContent,
        IonGrid, IonRow, IonCol,
        IonCardTitle, IonText

    },
    data() {
        return {
            annonces: "",
            user: {}
        }
    },
    created() {
        this.user = JSON.parse(sessionStorage.getItem("user"))
        this.chargerToutesAnnonces();
    },

    /*  computed: {
         annonces() {
             return this.$store.state.annonces;
         }
     }, */
    methods: {
        async chargerToutesAnnonces() {
            this.annonces = await ToutesAnnoncesImmobilier()
            console.log("immo", this.annonces)
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