<template>
    <ion-page class="content">

        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>

                </ion-buttons>

                <ion-buttons slot="end" v-if="!user">
                    <ion-button href="/inscription">S'inscrire</ion-button>
                    <ion-button href="/connexion">Se connecter</ion-button>
                </ion-buttons>
                <ion-title>Annonces</ion-title>
                <ion-buttons slot="end">
                    <!-- Bouton pour ouvrir le menu déroulant -->
                    <ion-button @click="toggleDropdown()" color="primary" size="large" fill="clear">
                        <ion-icon :icon="menu"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>



        <ion-content>
            <!-- Menu déroulant Ionic -->
            <div class="menu" v-if="user">
                <ion-list v-show="isDropdownOpen">
                    <ion-item button @click="navigateTo('/page1')">Déconnexion</ion-item>
                    <ion-item button @click="navigateTo('/vendeur/dasbord')" v-if="user && user.statut === 'vendeur'">Gérer
                        mes
                        annonces</ion-item>
                    <ion-item button @click="navigateTo('/annonce/publier')"
                        v-if="user && user.statut === 'vendeur'">Publier une
                        annonce</ion-item>
                    <!-- Ajoutez d'autres options selon vos besoins -->
                </ion-list>
            </div>
            <div class="menu nav nav-tabs mt-2 bg-light">
                <router-link :to="{ name: 'Annonces' }" class="nav-link nav-link-active">Tout</router-link>
                <router-link :to="{ name: 'ProduitsPhysiques' }" class="nav-link nav-link-active">Produits</router-link>
                <router-link :to="{ name: 'Services' }" class="nav-link nav-link-active">Services</router-link>
                <router-link :to="{ name: 'Immobiliers' }" class="nav-link nav-link-active">Immobilier</router-link>
            </div>

            <div class="search">
                <ion-searchbar show-clear-button="focus" value=""></ion-searchbar>

                <!-- <input type="search" placeholder="Rechercher" class="custom_input"> -->
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
        <ion-footer>
            <ion-toolbar>
                <ion-title>QuickFind v1.0</ion-title>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script>
import { menu, trashBin } from "ionicons/icons"

import {
    IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonMenuToggle, IonList, IonItem,
    IonIcon, IonTitle, IonMenu, IonButtons, IonRow, IonGrid, IonSearchbar, IonBackButton, IonFooter
} from '@ionic/vue';

export default {
    name: "Immobiliers",
    components: {
        IonContent, IonPage, IonButton, IonHeader, IonToolbar,
        IonTitle, IonMenuToggle, IonHeader, IonList, IonItem, IonIcon,
        IonMenu, IonButtons, IonRow, IonGrid, IonSearchbar, IonButtons, IonBackButton, IonFooter
    },
    data() {
        return {
            user: null,
            menu, trashBin,
            isDropdownOpen: false
        };
    },
    created() {
        this.user = JSON.parse(sessionStorage.getItem("user"));
    },
    methods: {
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        navigateTo(path) {
            this.$router.push(path);
            this.isDropdownOpen = false;
        }
    }
};
</script>

<style scoped>
.content {
    --ion-background-color: linear-gradient(to bottom, rgb(248, 177, 46), rgb(247, 247, 43));
}

/* Utiliser une requête média pour changer la taille des images en fonction de la largeur de l'écran */
ion-card>img {
    width: 100%;
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
    width: 90%;
    margin: 10px auto;
}

ion-searchbar {
    --ion-background-color: aliceblue;
    --border-radius: 10px;
}

.menu>ion-list>ion-item {
    --background: aliceblue;
}

.menu {
    z-index: 100;
}
</style>
