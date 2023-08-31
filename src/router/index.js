import { createRouter, createWebHistory } from '@ionic/vue-router';
import Connexion from '../pages/Connexion.vue'
import Inscription from '../pages/Inscription.vue'

const routes = [
  {
    path: '/',
    redirect: '/annonces'
  },
  {
    path: '/connexion',
    component: Connexion
  },
  {
    path: '/inscription',
    component: Inscription,
    name:"Inscription"
  },
  {
    path:'/annonces',
    name:"Annonces",
    component: ()=> import ('../pages/ListAnnonces.vue')
  },
  {
    path:'/annonces/:id',
    name:'DetailAnnonce',
    prop:true,
    component:()=> import ('../pages/DetailAnnonce.vue')
  },
   {
    path:'/produit/physiques',
    name:'ProduitsPhysiques',
    prop:true,
    component:()=> import ('../pages/ProduitsPhysiques.vue')
  },
    {
    path:'/services',
    name:'Services',
    prop:true,
    component:()=> import ('../pages/Services.vue')
  },
    {
    path:'/immobiliers',
    name:'Immobiliers',
    prop:true,
    component:()=> import ('../pages/Immobilier.vue')
  },
 /*  {
    path:'/annonce/publier',
    name:'CreerAnnonce',
    prop:true,
    component:()=> import ('../pages/AnnonceForm.vue')
  }, */
   {
    path:'/devenir-vendeur',
    name:'Paiement',
    prop:true,
    component:()=> import ('../pages/Paiement.vue')
  },
  {
    path:'/vendeur/dasbord',
    name:'DashbordVendeur',
    prop:true,
    component:()=> import ('../pages/DashbordVendeur.vue'),
    children: [
      {
        path: '/vendeur/dasbord',
        redirect: '/mes-annonces',
      },
    
      {
        path: '/mes-annonces',
        name:"GestionAnnonces",
        component: () => import('../pages/GestionAnnonces.vue'),
      },
      {
        path: '/mes-messages',
        name:"MesMessages",
        component: () => import('../pages/Messages.vue'),
      },
      {
          path:'/publier',
          name:'CreerAnnonce',
          prop:true,
          component:()=> import ('../pages/AnnonceForm.vue')
        },
     /*  {
        path: 'library',
        component: () => import('./views/LibraryPage.vue'),
      },
      {
        path: 'search',
        component: () => import('./views/SearchPage.vue'),
      }, */
    ],
  },

   {
    path:'/profil/:id',
    name:'Profil',
    prop:true,
    component:()=> import ('../pages/Profil.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
