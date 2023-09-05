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
            <ion-card v-for="message in messages" :key="message._id">
                <ion-item>
                    <ion-thumbnail slot="start">
                        <img alt="image profil" :src="message.expediteur.photo_profil" />
                    </ion-thumbnail>
                    <ion-card-title>
                        {{ message.expediteur.nom }} {{ message.expediteur.prenom }}
                    </ion-card-title>
                </ion-item>
                <ion-item>

                    <h3>{{ message.contenu }}</h3>

                </ion-item>
                <ion-item>
                    Eenvoyé le {{ message.date_envoi }}

                </ion-item>
                <ion-item>
                    <ion-button fill="clear" @click="RepondreMessage(message)">Répondre</ion-button>
                    <ion-button fill="clear" @click="Supprimer(message._id)">Supprimer</ion-button>
                </ion-item>
            </ion-card>
            <!-- <ion-list>
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
            </ion-list> -->


        </ion-content>
    </ion-page>
</template>

<script>
import { messageParDestinataire, SupprimerMessage } from '../api/message';
import { defineComponent } from 'vue';
import { envoyerMessage } from '../api/message';
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
    IonThumbnail, IonCard, IonCardContent, IonCardTitle, IonCardHeader, alertController
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
        IonThumbnail,
        IonCard, IonCardContent, IonCardTitle, IonCardHeader
    },
    data() {
        return {
            user: {},
            messages: [],
            message: ""
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

        async RepondreMessage(message_a_repondre) {
            const alert = await alertController.create({
                header: "Entrez votre message",
                inputs: [
                    {
                        name: 'new_message',
                        type: 'textarea',
                        placeholder: 'Votre message'
                    }
                ],
                buttons: [
                    {
                        text: 'Annuler',
                        role: 'cancel'
                    },
                    {
                        text: 'Ok',
                        handler: async (data) => {
                            this.message = {
                                contenu: data.new_message,
                                expediteur: this.user.userId,
                                destinataire: message_a_repondre.expediteur._id,
                                date_envoi: new Date(),
                                annonce: message_a_repondre.annonce._id
                            }
                            // console.log(this.newAvis)
                            try {
                                await envoyerMessage(this.message)
                            } catch (error) {
                                console.log(error)
                            }
                            console.log(data.new_message);
                            // Do something with the data
                        }
                    }
                ]
            })
            await alert.present();
            const result = await alert.onDidDismiss();
        },

        async Supprimer(id) {
            const alert = await alertController.create({
                header: "Avertissement",
                message: "Le message sera complètement supprimé",
                backdropDismiss: false,
                buttons: [
                    {
                        text: 'Annuler',
                        role: 'cancel',
                        handler: () => {
                            // Code à exécuter si l'utilisateur clique sur annuler
                            console.log('Action annulée');
                        }
                    },
                    {
                        text: 'Continuer',
                        role: 'confirm',
                        handler: async () => {
                            // Code à exécuter si l'utilisateur clique sur continuer
                            try {
                                const response = await SupprimerMessage(id)
                                this.chargerMessage()
                                console.log(response)
                            } catch (error) {
                                console.log(error)
                            }
                            console.log('Action confirmée');
                        }
                    }
                ]
            });
            await alert.present();
        }
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
