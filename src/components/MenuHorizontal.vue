<template>
    <ion-page>
        <ion-content>
            <div class="menu nav nav-tabs mt-2">
                <router-link :to="{ name: 'Annonces' }" class="nav-link nav-link-active">Tout</router-link>
                <router-link :to="{ name: 'ProduitsPhysiques' }" class="nav-link nav-link-active">Produits</router-link>
                <router-link :to="{ name: 'Services' }" class="nav-link nav-link-active">Services</router-link>
                <router-link :to="{ name: 'Immobiliers' }" class="nav-link nav-link-active">Immobilier</router-link>
            </div>
            <div class="search">
                <input type="search" placeholder="Rechercher" class="custom_input">
                <!-- <ion-input type="text" label="Recherche" class="rounded custom_input"></ion-input> -->
            </div>
            <slot />
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
export default {
    components: {
        IonContent, IonPage
    }
}
</script>

<style scoped>
.menu {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: bisque;
}

.custom_input {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 5px;
    font-size: 20px;
    width: 100%;
    background-color: aliceblue;
}

.search {
    width: 80%;
    margin: 10px auto;


}
</style>