<template>
    <base-layout page-title="Annonces">
        <div class="menu nav nav-tabs mt-2 bg-light">
            <router-link :to="{ name: 'Annonces' }" class="nav-link nav-link-active">Tout</router-link>
            <router-link :to="{ name: 'ProduitsPhysiques' }" class="nav-link nav-link-active">Produits</router-link>
            <router-link :to="{ name: 'Services' }" class="nav-link nav-link-active">Services</router-link>
            <router-link :to="{ name: 'Immobiliers' }" class="nav-link nav-link-active">Immobilier</router-link>
        </div>
        <div class="search">
            <ion-searchbar show-clear-button="focus" value=""></ion-searchbar>

            <!-- <input type="search" placeholder="Rechercher" class="custom_input"> -->
            <!-- <ion-input type="text" label="Recherche" class="rounded custom_input"></ion-input> -->
        </div>
        <ion-grid>
            <ion-row>
                <ion-col size="6" size-md="6" size-lg="4" v-for="ann in toutesAnnonces" :key="ann._id">
                    <router-link :to="{ name: 'Paiement' }" class="" v-if="user && user.statut === 'client'">Devenir
                        vendeur</router-link>
                    <!-- Ajouter router-link sur ion-card -->
                    <ion-card @click="detail(ann._id)">

                        <!-- :router-link="`/annonces/${ann._id}`" -->


                        <!-- <ion-img :src="ann.image"></ion-img> -->
                        <img :src="ann.photo[0]" alt="">
                        <ion-card-title>{{ ann.titre }}</ion-card-title>
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
            </ion-row>
        </ion-grid>
    </base-layout>
</template>

<script>
import { IonCard, IonCol, IonCardTitle, IonCardContent, IonButton, IonGrid, IonRow, IonInput, IonSearchbar, IonButtons, IonText, alertController } from '@ionic/vue';
import { trashBin } from 'ionicons/icons';
import { defineComponent } from 'vue';

import { ToutesAnnonces } from '../api/annonces'
import router from '../router';
export default defineComponent({
    name: "Annonces",
    components: {
        IonCard, IonCol, IonCardTitle, IonCardContent, IonButton, IonGrid, IonRow, IonInput, IonSearchbar, IonButtons, IonText
    },
    data() {
        return {
            user: {},
            trashBin,
            toutesAnnonces: []
        }
    },
    created() {
        this.chargerToutesAnnonces()
        this.user = JSON.parse(sessionStorage.getItem("user"))

    },
    /*   computed: {
          annonces() {
              return this.$store.state.annonces;
          }
      }, */
    methods: {
        async chargerToutesAnnonces() {
            this.toutesAnnonces = await ToutesAnnonces()
            console.log(this.toutesAnnonces)
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

.menu {
    display: flex;
    justify-content: center;
    width: 100%;
    /* background-color: rgb(31, 20, 8); */
}

.custom_input {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 5px;
    font-size: 20px;
    width: 100%;
    background-color: aliceblue;
}

ion-searchbar {
    --ion-background-color: aliceblue;
    --border-radius: 10px;
}

.search {
    width: 90%;
    margin: 10px auto;


}
</style>
