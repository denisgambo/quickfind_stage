<template>
    <base-layout page-title="Détails">
        <ion-card v-if="annonce" class="ion-text-center">
            <img :src="annonce.photo[0]" alt="" v-if="annonce.photo">
            <ion-card-title>
                <p class="text">{{ annonce.titre }}</p>
            </ion-card-title>
            <ion-card-content>
                <ion-text>
                    <h1 v-if="annonce.prix_vente">Prix unitaire:: {{ annonce.prix_vente }} FCFA</h1>
                    <h1 v-if="annonce.prix_location">Prix de location:: {{ annonce.prix_location }} FCAF/{{
                        annonce.duree_location
                    }}
                    </h1>
                    <div class="separator"></div>
                    <!-- <h4 class="moyen">Description du produit</h4> -->
                    <h2> <br> {{ annonce.description }}</h2>

                    <!-- <h1>----------Contacts----------</h1>
                    <h1 v-if="annonce.proprietaire">Email: {{ annonce.proprietaire.email }}</h1>
                    <h1 v-if="annonce.proprietaire">Téléphone:{{ annonce.proprietaire.email }} </h1> -->
                    <h1>-----Contacts du vendeur-----</h1>
                    <ion-item>
                        <ion-label>Email:</ion-label>
                        <h1 v-if="annonce.proprietaire">
                            <ion-button :href="'mailto:' + annonce.proprietaire.email" fill="clear">
                                {{ annonce.proprietaire.email }}
                            </ion-button>
                        </h1>
                    </ion-item>
                    <ion-item>
                        <ion-label>Téléphone:</ion-label>
                        <h1 v-if="annonce.proprietaire">
                            <ion-button :href="'tel:' + annonce.proprietaire.telephone" fill="clear">
                                {{ annonce.proprietaire.telephone }}
                            </ion-button>
                        </h1>
                    </ion-item>

                </ion-text>
                <!-- <h3 class="text">Prix unitaire: {{ annonce.prix_vente }}</h3>
                <h3 class="text" v-if="annonce.type == 'produit'">prix de location: {{ annonce.prix_location }} FCFA/{{
                    annonce.duree_location }}</h3> -->

            </ion-card-content>
            <ion-button @click="send()">Discuter mainteanant</ion-button>

            <div class="message" v-if="messageForm">
                <h2>Envoyer un message</h2>
                <form class="message_form">
                    <ion-input label="" placeholder="Ecrire votre message" class="ion-border"></ion-input>
                    <ion-button>Envoyer</ion-button>
                </form>
            </div>
        </ion-card>

    </base-layout>
</template>

<script>
import { IonCard, IonCardContent, IonCardTitle, IonButton, IonInput, IonText, IonItem, IonSegment, IonLabel } from '@ionic/vue'
import BaseLayout from '../components/Base/BaseLayout.vue'
import { AnnonceParId } from '../api/annonces'
import EnvoyerMessage from '../components/EnvoyerMessage.vue'
export default {
    name: 'DetailAnnonce',
    data() {
        return {
            id: "",
            annonce: {},
            messageForm: false
        }
    },
    components: {
        BaseLayout,
        EnvoyerMessage,
        IonCard,
        IonCardContent,
        IonCardTitle,
        IonButton,
        IonInput, IonText, IonItem,
        IonLabel

    },
    created() {
        // Afficher l'id dans la console
        this.id = this.$route.params.id
        this.ChargeAnnonce()
    },

    methods: {
        async ChargeAnnonce() {
            this.annonce = await AnnonceParId(this.id)
            console.log(this.annonce)
        },
        send() {
            this.messageForm = true
        }
        /*  ouvrirModal() {
 
             this.modalVisible = true
         },
         fermerModal() {
             this.modalVisible = false
         } */
    }

}
</script>

<style scoped>
.text {
    font-size: 25px;
    font-weight: bold;
}

.moyen {
    font-size: 20px;
    font-weight: bold;
}

ion-card>img {
    width: 60%;
    /* height: 200px; */
    height: auto;
}

.message {
    width: 80%;
    margin: 10px auto;
    border-radius: 10px;
}

.message_form {
    background-color: aliceblue;
    border-radius: 10px;

}

ion-item {
    --background: transparent;
}

.separator {
    border-top: 3px solid orange;
    margin: 10px 0;
}
</style>