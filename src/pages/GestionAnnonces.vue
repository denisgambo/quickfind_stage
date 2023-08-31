<template>
    <ion-page class="ionpage">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title>Mon tableau de bord</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>

            <div class="">

                <ion-toolbar>
                    <ion-searchbar show-clear-button="focus" value=""></ion-searchbar>

                </ion-toolbar>
                <ion-item v-if="mesannonces.length === 0">
                    <ion-label v-if="mesannonces.length === 0">Vous n'avez pas de publication</ion-label>
                </ion-item>
                <ion-item v-if="user.statut === 'client'">
                    <ion-label> <a href="/devenir-vendeur">S'Inscrire en que vendeur pour publier</a></ion-label>
                </ion-item>


                <div class="list_annonces d-flex">
                    <!-- La liste des produits -->
                    <ion-card v-for="annonce in mesannonces" :key="annonce._id">

                        <img :src="annonce.photo[0]" alt="">
                        <ion-card-header>
                            <ion-card-title>{{ annonce.titre }}</ion-card-title>
                            <ion-card-subtitle>{{ annonce.prix_vente }} FCFA</ion-card-subtitle>
                            <ion-card-subtitle v-if="annonce.en_location">{{ annonce.prix_location }} FCFA/{{
                                annonce.duree_location }}</ion-card-subtitle>
                        </ion-card-header>

                        <ion-button fill="clear">Modifier</ion-button>
                        <ion-button fill="clear">Supprimer</ion-button>
                    </ion-card>
                </div>
            </div>


        </ion-content>
    </ion-page>
</template>

<script>
import { annonceParUtilisateurs } from '../api/annonces'
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonSearchbar, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonLabel, IonItem, IonButtons, IonBackButton } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
    components: {
        IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonSearchbar, IonButton,
        IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonLabel,
        IonItem, IonBackButton, IonButtons
    },
    data() {
        return {
            user: {},
            mesannonces: []
        }
    },
    mounted() {
        this.user = JSON.parse(sessionStorage.getItem("user"))
        this.chargerMesAnnonces()
    },
    async created() {
        /*  this.user = JSON.parse(sessionStorage.getItem("user"))
         await this.chargerMesAnnonces() */

    },
    methods: {
        async chargerMesAnnonces() {
            console.log("userId", this.user.userId)
            try {
                this.mesannonces = await annonceParUtilisateurs(this.user.userId)
                console.log("mes annonces: ", this.mesannonces)
            } catch (error) {
                console.log(error)
            }
        }
    }
})
</script>

<style scoped>
.ionpage {
    --ion-background-color: linear-gradient(to bottom, rgb(248, 177, 46), rgb(247, 247, 43));
}

ion-card img {
    width: 100%;
}

.list_annonces {
    display: flex;
    flex-wrap: wrap;
    /* Autres styles selon vos besoins */
}

ion-card {
    width: 70%;
    margin: 5px auto;
}

.espace {
    margin-top: 60px;
}

ion-searchbar {
    --ion-background-color: aliceblue;
    --border-radius: 10px;
}
</style>