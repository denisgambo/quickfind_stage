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
                <form class="message_form" @submit.prevent="envoyer()">
                    <ion-input label="" placeholder="Ecrire votre message" class="ion-border"
                        v-model="message.contenu"></ion-input>
                    <ion-button type="submit">Envoyer</ion-button>
                </form>
            </div>

            <ion-item>
                <div class="avis">
                    <ion-button fill="clear" size="large" class="" color="light" @click="display_avis = !display_avis">
                        <!-- {{ avis.length }} -->
                        {{ nbr }}
                        <ion-icon :icon="chatboxEllipsesOutline"></ion-icon>
                        <!-- <ion-badge>11</ion-badge> -->
                    </ion-button>
                    <div class="list_avis" v-if="display_avis">

                        <ion-item v-for="avi in avis" :key="avi.id" class="mt-2 item_avi">
                            <p class="flex-avatar mr-2">
                                <ion-avatar>
                                    <img alt="profil" :src="avi.auteur.photo_profil" />
                                </ion-avatar>
                                <ion-label>{{ avi.auteur.nom }} {{ avi.auteur.prenom }}</ion-label>
                            </p>
                            <p class="avis_message">{{ avi.message }}</p>
                        </ion-item>

                        <ion-button @click="openCommentaire()">
                            Commenter
                        </ion-button>
                        <!-- <ion-button @click="chargerAvis()">chargerAvis</ion-button> -->

                    </div>

                </div>
            </ion-item>
        </ion-card>

    </base-layout>
</template>

<script>
import { envoyerMessage } from '../api/message';
import { envoyerAvis, avisParAnnonce } from '../api/avis'
import { IonCard, IonCardContent, IonCardTitle, IonButton, IonInput, IonText, IonItem, IonLabel, IonBadge, IonIcon, alertController, IonAvatar } from '@ionic/vue'
import { chatboxEllipsesOutline } from 'ionicons/icons'
import BaseLayout from '../components/Base/BaseLayout.vue'
import { AnnonceParId } from '../api/annonces'
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'DetailAnnonce',
    data() {
        return {
            user: "",
            id: "",
            annonce: {},
            display_avis: false,
            messageForm: false,
            chatboxEllipsesOutline,
            newAvis: {
                message: "",
                auteur: "",
                annonce: "",
                date_envoi: ""
            },
            message: {
                contenu: "",
                expediteur: "",
                destinataire: "",
                annonce: "",
                date_envoi: ""
            },
            avis: [],
            nbr: 0,
        }
    },
    components: {
        BaseLayout,
        IonCard,
        IonCardContent,
        IonCardTitle,
        IonButton,
        IonInput, IonText, IonItem,
        IonLabel, IonBadge, IonIcon, IonAvatar


    },
    async created() {
        // Afficher l'id dans la console
        this.id = this.$route.params.id
        await this.ChargeAnnonce()
        this.user = JSON.parse(sessionStorage.getItem("user"))
        // console.log(this.user)
    },

    methods: {
        async ChargeAnnonce() {
            this.annonce = await AnnonceParId(this.id)
            console.log(this.annonce)
            await this.chargerAvis()

        },
        async send() {
            this.messageForm = !this.messageForm
        },
        async chargerAvis() {
            try {
                this.avis = await avisParAnnonce(this.annonce._id)
                this.nbr = this.avis.length
                console.log(this.avis, "nombre: ", this.nbr)
            } catch (error) {
                console.log(error)
            }
        },
        async envoyer() {
            this.message.date_envoi = Date.now()
            this.message.expediteur = this.user.userId;
            this.message.destinataire = this.annonce.proprietaire;
            this.message.annonce = this.annonce._id
            // console.log("message", this.message)
            try {
                await envoyerMessage(this.message)
                this.message.contenu = "";
                // console.log("succès")
            } catch (error) {
                console.log(error)
            }
        },
        async openCommentaire() {
            const alert = await alertController.create({
                header: "Entrez votre commentaire",
                inputs: [
                    {
                        name: 'contenu_avi',
                        type: 'textarea',
                        placeholder: 'Commentaire'
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
                            this.newAvis = {
                                message: data.contenu_avi,
                                auteur: this.user.userId,
                                date_envoi: new Date(),
                                annonce: this.annonce._id
                            }
                            // console.log(this.newAvis)
                            try {
                                await envoyerAvis(this.newAvis)
                                await this.chargerAvis()
                            } catch (error) {
                                console.log(error)
                            }
                            console.log(data.contenu_avi);
                            // Do something with the data
                        }
                    }
                ]
            })
            await alert.present();
            const result = await alert.onDidDismiss();
        }

        /*  ouvrirModal() {
 
             this.modalVisible = true
         },
         fermerModal() {
             this.modalVisible = false
         } */
    }

})
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

.item_avi {
    --background: rgb(232, 232, 241);
    --border-radius: 5px;
    --width: 100%;
}

.list_avis {
    width: 100%;
}
</style>