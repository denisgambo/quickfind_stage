<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title>Mon tableau de bord</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" :fullscreen="true" ref="content">





            <div class="">
                <ion-item v-if="messages.length === 0">
                    <ion-label v-if="messages.length === 0">Vous n'avez pas de messages</ion-label>
                </ion-item>
            </div>
            <ion-list>
                <ion-item v-for="message in messages" :key="message._id">
                    <ion-thumbnail slot="start">
                        <img alt="image profil" :src="message.expediteur.photo_profil" />
                    </ion-thumbnail>
                    <ion-label>
                        <h3>{{ message.contenu }}</h3>
                        <p>Expediteur: {{ message.expediteur.nom }} {{ message.expediteur.prenom }}</p>
                        <p>Date d'envoi: {{ message.date_envoi }}</p>
                    </ion-label>
                    <ion-buttons slot="end">
                        <ion-button @click="repondre(message)">Répondre</ion-button>
                    </ion-buttons>
                </ion-item>
            </ion-list>


        </ion-content>
    </ion-page>
</template>

<script>
import { messageParDestinataire } from '../api/message';
import { defineComponent } from 'vue';

import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonButtons,
    IonBackButton,
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail
} from '@ionic/vue';

export default defineComponent({
    components: {
        IonPage,
        IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButton,
        IonButtons,
        IonBackButton,
        IonList,
        IonItem,
        IonLabel,
        IonThumbnail
    },
    data() {
        return {
            user: {},
            messages: [],
        };
    },

    created() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        console.log('user: ', this.user);
        this.chargerMessage();
    },

    methods: {
        async chargerMessage() {
            try {
                this.messages = await messageParDestinataire(this.user.userId);
                console.log(this.messages);
            } catch (error) {
                console.log('erreur: ', error);
            }
        },
        repondre(message) {
            // Gérer la logique pour répondre au message ici
        },

        scrollToBottom() {
            // Passing a duration to the method makes it so the scroll slowly
            // goes to the bottom instead of instantly
            this.$refs.content.$el.scrollToBottom(500);
        },
        scrollToTop() {
            // Passing a duration to the method makes it so the scroll slowly
            // goes to the top instead of instantly
            this.$refs.content.$el.scrollToTop(500);
        },
    },
});
</script>

<style scoped>
/* Personnalisez le style selon vos besoins */


ion-item {
    --ion-background-color: white;
}

.titre {
    margin-top: 50px;
}
</style>
