<template>
    <ion-page class="content">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/annonces"></ion-back-button>
                </ion-buttons>
                <ion-buttons slot="end" v-if="!user">

                    <ion-button href="/inscription">S'inscrire</ion-button>
                    <ion-button href="/connexion">Se connecter</ion-button>
                </ion-buttons>
                <ion-title>{{ pageTitle }}</ion-title>
                <ion-buttons slot="end">
                    <!-- Bouton pour ouvrir le menu déroulant -->
                    <ion-button @click="toggleDropdown()" color="primary" size="large" fill="clear">
                        <ion-icon :icon="menu"></ion-icon>
                    </ion-button>
                </ion-buttons>

            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-text-center ion-align-items-center">
            <!-- Menu déroulant Ionic -->
            <div class="menu" v-if="user" slot="fixed">
                <ion-list v-show="isDropdownOpen">
                    <ion-item :router-link="`/profil/${user.userId}`" v-if="user"> Mon profil</ion-item>

                    <ion-item button @click="navigateTo('/vendeur/dasbord')" v-if="user">Mon
                        tableau de bord</ion-item>
                    <ion-item button @click="navigateTo('/publier')" v-if="user && user.statut === 'vendeur'">Publier une
                        annonce</ion-item>

                    <ion-item button @click="deconnexion()">Déconnexion</ion-item>
                    <!-- Ajoutez d'autres options selon vos besoins -->
                </ion-list>
            </div>


            <slot />
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-title>QuickFind v1.0 <p> <small>&copy; 2023 Denis GAMBO. Tous droits réservés.</small></p></ion-title>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script>
import { menu, trashBin } from "ionicons/icons"

import {
    IonPage, IonHeader, IonTitle, IonToolbar, IonContent, IonButtons, IonBackButton, IonButton, IonIcon, IonFooter, IonSelect, IonItem, IonList,
    IonSelectOption
} from '@ionic/vue';
export default {
    props: ['pageTitle'],
    components: {
        IonPage,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonContent,
        IonButtons,
        IonBackButton,
        IonButton, IonIcon,
        IonFooter, IonSelect,
        IonSelectOption,
        IonItem, IonList,




    },
    data() {
        return {
            user: {},
            menu, trashBin,
            isDropdownOpen: false

        }
    },

    created() {
        this.user = JSON.parse(sessionStorage.getItem("user"))
    },

    methods: {
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        navigateTo(path) {
            this.$router.push(path);
            this.isDropdownOpen = false;
        },
        deconnexion() {
            sessionStorage.removeItem("user")
            this.$router.push("/connexion");

        }
    }


}
</script>

<style scoped>
.content {
    --ion-background-color: linear-gradient(to bottom, rgb(248, 177, 46), rgb(247, 247, 43));
}

.menu>ion-list>ion-item {
    --background: aliceblue;
}

.menu {
    z-index: 100;
}
</style>