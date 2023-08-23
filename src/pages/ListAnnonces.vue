<template>
    <base-layout page-title="Annonces">
        <div class="menu nav nav-tabs mt-2 bg-light">
            <router-link :to="{ name: 'Annonces' }" class="nav-link nav-link-active">Tout</router-link>
            <router-link :to="{ name: 'ProduitsPhysiques' }" class="nav-link nav-link-active">Produits</router-link>
            <router-link :to="{ name: 'Services' }" class="nav-link nav-link-active">Services</router-link>
            <router-link :to="{ name: 'Immobiliers' }" class="nav-link nav-link-active">Immobilier</router-link>
        </div>
        <div class="search">
            <input type="search" placeholder="Rechercher" class="custom_input">
            <!-- <ion-input type="text" label="Recherche" class="rounded custom_input"></ion-input> -->
        </div>
        <ion-grid>
            <ion-row>
                <ion-col size="6" size-md="6" size-lg="4" v-for="ann in toutesAnnonces" :key="ann._id">
                    <!-- Ajouter router-link sur ion-card -->
                    <ion-card :router-link="`/annonces/${ann._id}`">
                        <!-- <ion-img :src="ann.image"></ion-img> -->
                        <img :src="ann.photo[0]" alt="">
                        <ion-card-title>{{ ann.titre }}</ion-card-title>
                        <ion-card-content>
                            Here's a small text description
                            <!-- Ajouter router-link sur ion-button -->
                            <ion-button fill="clear" :router-link="`/annonces/${ann.id}`">Voir</ion-button>

                        </ion-card-content>
                    </ion-card>
                </ion-col>
            </ion-row>
        </ion-grid>
    </base-layout>
</template>

<script>
import { IonCard, IonCol, IonCardTitle, IonCardContent, IonButton, IonGrid, IonRow, IonInput } from '@ionic/vue';
import axiosClient from '../api/axiosClient'
import { ToutesAnnonces } from '../api/annonces'
export default {
    name: "Annonces",
    components: {
        IonCard, IonCol, IonCardTitle, IonCardContent, IonButton, IonGrid, IonRow, IonInput
    },
    data() {
        return {
            toutesAnnonces: []
        }
    },
    created() {
        this.chargerToutesAnnonces()
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

.search {
    width: 80%;
    margin: 10px auto;


}
</style>
