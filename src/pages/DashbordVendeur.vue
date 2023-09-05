<template>
    <ion-page>

        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="annonces" href="/mes-annonces">
                    <ion-icon :icon="megaphoneOutline" />
                    <ion-label>Mes annonces</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="message" href="/mes-messages">
                    <ion-icon :icon="chatboxEllipsesOutline" />
                    <ion-label>Mes messages</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="radio" href="/publier">
                    <ion-icon :icon="shareOutline" />
                    <ion-label>Publier</ion-label>
                </ion-tab-button>



                <!--  <ion-tab-button tab="library" href="/library">
                    <ion-icon :icon="library" />
                    <ion-label>Library</ion-label>
                </ion-tab-button> -->

                <!-- <ion-tab-button tab="search" href="/search">
                    <ion-icon :icon="search" />
                    <ion-label>Search</ion-label>
                </ion-tab-button> -->
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script >
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon, IonButton, IonButtons, IonBackButton, IonTitle, IonToolbar, IonHeader } from '@ionic/vue';

import { playCircle, radio, library, search, chatboxEllipsesOutline, megaphoneOutline, shareOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon,
        IonButton, IonButtons, IonBackButton, IonTitle, IonBackButton, IonButtons, IonToolbar, IonHeader
    },
    data() {
        return {
            user: {},
            playCircle,
            radio,
            library,
            search,
            chatboxEllipsesOutline,
            megaphoneOutline, shareOutline
        };
    },

    created() {
        this.user = JSON.parse(sessionStorage.getItem("user"));
        console.log("user: ", this.user)
    }
});
</script>

<style scoped>
ion-tabs {
    --ion-background-color: linear-gradient(to bottom, rgb(248, 177, 46), rgb(247, 247, 43));
    color: white;
}

ion-header {
    --ion-background-color: linear-gradient(to bottom, rgb(248, 177, 46), rgb(247, 247, 43));

}
</style>