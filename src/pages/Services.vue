<template>
    <annonce-layout>
        <ion-col size="6" size-md="6" size-lg="4" v-for="ann in annonces" :key="ann._id">
            <!-- Ajouter router-link sur ion-card -->
            <ion-card :router-link="`/annonces/${ann._id}`">
                <!-- <ion-img :src="ann.image"></ion-img> -->
                <img :src="ann.photo[0]" alt="">
                <ion-card-title class="ion-text-lg">{{ ann.titre }}</ion-card-title>
                <ion-card-content>
                    <p class="prix">{{ ann.prix_vente }} FCFA</p>
                    <!-- Ajouter router-link sur ion-button -->
                    <ion-button fill="clear" :router-link="`/annonces/${ann.id}`">Voir</ion-button>

                </ion-card-content>
            </ion-card>
        </ion-col>
    </annonce-layout>
</template>

<script>
import { ToutesAnnoncesServices } from '../api/annonces';
import { IonPage, IonContent, IonButton, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonCardTitle } from '@ionic/vue';
export default {
    name: "ProduitsPhysiques",
    data() {
        return {
            annonces: []
        }
    },
    components: {
        IonContent,
        IonPage,
        IonButton,
        IonCard,
        IonCardContent,
        IonGrid, IonRow, IonCol,
        IonCardTitle

    },
    created() {
        this.chargerServices()
    },
    /*  computed: {
         annonces() {
             return this.$store.state.annonces;
         }
     }, */
    methods: {
        async chargerServices() {
            this.annonces = await ToutesAnnoncesServices()
            // console.log(this.annonces)
        }
    }

}
</script>

<style scoped>
/* Utiliser une requête média pour changer la taille des images en fonction de la largeur de l'écran */
ion-card>img {
    width: 100%;
    /* height: 200px; */
    height: 60vh;
}

.prix {
    font-weight: bold;
    font-size: 20px;
}

@media (max-width: 600px) {
    ion-card>img {
        height: 150px;
    }
}
</style>