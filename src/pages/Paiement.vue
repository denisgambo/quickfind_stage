<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                    <ion-title>Devenir vendeur</ion-title>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div class="paiement m-2">
                <form>
                    <ion-input label="montant" type="number"></ion-input>
                    <ion-button expand="full" shape="round">Valider</ion-button>
                </form>
            </div>

        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonHeader, IonButton, IonButtons, IonBackButton, IonToolbar, IonTitle, IonInput } from '@ionic/vue';

export default {
    name: "Paiement",
    components: {
        IonPage, IonContent, IonHeader, IonButton, IonButtons, IonBackButton, IonToolbar, IonTitle, IonInput
    }

}
</script>

<style scoped>
.paiement {
    background-color: bisque;
    height: 200px;
    padding: 10px;
}

ion-input {
    --background: white;
    --border-radius: 8px;
}
</style>