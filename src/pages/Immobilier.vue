<template>
    <annonce-layout>

        <ion-col size="6" size-md="6" size-lg="4" v-for="ann in annonces" :key="ann.id">
            <router-link :to="{ name: 'Paiement' }" class="" v-if="user && user.statut === 'client'">Devenir
                vendeur</router-link>
            <!-- Ajouter router-link sur ion-card -->
            <ion-card @click="detail(ann._id)">
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
                    <ion-button fill="clear" @click="detail(ann._id)">Voir</ion-button>

                </ion-card-content>
            </ion-card>
        </ion-col>
    </annonce-layout>
</template>

<script>
import { ToutesAnnoncesImmobilier } from '../api/annonces';
import { IonPage, IonContent, IonButton, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonCardTitle, IonText, alertController } from '@ionic/vue';
import { defineComponent } from 'vue';
import router from '../router';

export default defineComponent({
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
        },
        async presentAlert(error_message, header) {
            const alert = await alertController.create({
                header: header,
                message: error_message,
                buttons: ['OK'],
            });
            await alert.present();
        },

        async detail(id) {
            if (this.user) {
                router.push(`/annonces/${id}`);
            } else {
                await this.presentAlert("Vous devez vous connecter pour voir les détails ", "Oops")
                return
            }
        }
    }

})
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