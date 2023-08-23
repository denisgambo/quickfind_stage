<template>
    <ion-modal :showBackdrop="true">
        <ion-header>
            <ion-toolbar>
                <ion-title>Contacter le vendeur</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="fermerModal">Fermer</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-input v-model="message" placeholder="Votre message"></ion-input>
            <ion-button @click="envoyerMessage">Envoyer</ion-button>
        </ion-content>
    </ion-modal>
</template>

<script>
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonInput } from '@ionic/vue'

export default {
    name: "EnvoyerMessage",
    components: {
        IonModal,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonContent,
        IonInput
    },
    props: {
        showModal: Boolean
    },
    data() {
        return {
            message: ''
        }
    },
    methods: {
        fermerModal() {
            this.$emit('fermer')
        },
        envoyerMessage() {
            // Ajoutez ici la logique pour envoyer le message au vendeur
            // Après l'envoi, fermez le modal
            alert("yes")
            this.showModal = true
            this.fermerModal()
        }
    }
}
</script>
