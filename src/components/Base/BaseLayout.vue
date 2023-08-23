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
                <ion-title>{{ pageTitle }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="">

            <slot />
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonTitle, IonToolbar, IonContent, IonButtons, IonBackButton, IonButton } from '@ionic/vue';
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
        IonButton




    },

}
</script>

<style scoped>
.content {
    --ion-background-color: linear-gradient(to bottom, rgb(248, 177, 46), rgb(247, 247, 43));
}
</style>