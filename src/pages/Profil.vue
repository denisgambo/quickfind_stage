<template>
    <ion-page>

        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>

                </ion-buttons>
                <ion-title>Mon profil</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="header">
                <h2 class="nom">{{ user.nom }} {{ user.prenom }}</h2>
                <div class="space-between">
                    <div class="infos">
                        <ion-badge color="warning">100</ion-badge>
                        <p>annonnces</p>
                    </div>

                    <div class="infos">
                        <ion-badge color="warning">10</ion-badge>
                        <p>Vendeur</p>
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="border_red">
                    <div class="border_white">
                        <div class="image_box">
                            <img :src="user.photo_profil" alt="phpto de profil">
                        </div>
                    </div>
                </div>
            </div>

            <ion-card>

            </ion-card>

        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonToolbar, IonButtons, IonBackButton, IonHeader, IonTitle, IonBadge, IonCard } from '@ionic/vue';
export default {
    props: ['userId'],
    components: {
        IonPage, IonContent, IonHeader,
        IonToolbar, IonButtons, IonBackButton, IonTitle, IonBadge,
        IonCard
    },
    data() {
        return {
            user: {}
        }
    },
    created() {
        this.user = JSON.parse(sessionStorage.getItem("user"))
    }
}
</script>

<style scoped>
.header {
    background-color: #ffc107;
    height: 180px;
    padding-top: 1px;
}

.nom {
    color: white;
    font-weight: bold;
    text-align: center;
}

.space-between {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 0 10px;
}

.infos {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.infos p {
    color: white;
    margin: 8px 0px 0px 0px;
}

.image_box {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    overflow: hidden;
}

.border_white {
    border: 4px solid white;
    border-radius: 50%;
    width: fit-content;
}

.border_red {
    border: 6px solid #a07800;
    border-radius: 50%;
    width: fit-content;
}

.flex {
    display: flex;
    justify-content: center;
    margin-top: -76px;
}
</style>