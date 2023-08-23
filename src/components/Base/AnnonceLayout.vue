<template>
    <ion-page class="content">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-buttons slot="end">
                    <ion-button href="/inscription">S'inscrire</ion-button>
                    <ion-button href="/connexion">Se connecter</ion-button>
                </ion-buttons>
                <ion-title>Annonces</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
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
            <main>
                <!-- <router-view /> -->

            </main>
            <ion-grid>

                <ion-row>
                    <slot />
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonBackButton, IonButtons, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonCardTitle, IonTitle } from '@ionic/vue';
export default {
    name: "Immobiliers",
    components: {
        IonContent,
        IonPage,
        IonButton,
        IonCard,
        IonCardContent,
        IonGrid, IonRow, IonCol,
        IonCardTitle,
        IonHeader, IonToolbar,
        IonBackButton,
        IonButtons,
        IonTitle

    },


}
</script>

<style scoped>
.content {
    --ion-background-color: linear-gradient(to bottom, rgb(248, 177, 46), rgb(247, 247, 43));
}



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