import { createStore } from "vuex";
import  state from "./state"
import * as actions from "./actions"
import * as mutations from "./mutations"
import * as getters from "./getters"
const store = createStore({
    /* state(){
        return{
            annonces: [
                { id: 1, title: "annonce 1", image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/247616b5-1d3b-4777-abbb-d5e08a924b78/chaussure-facile-a-enfiler-et-a-retirer-go-flyease-WS84pD.png" },
                { id: 2, title: "annonce 2", image: "https://www.b-z-b.com/dw/image/v2/BJXP_PRD/on/demandware.static/-/Sites-Bizzbee-master-catalog/default/dwa89152d0/images/2003263_11576_V1.jpg?sw=400&sh=600&sm=cut" },
                { id: 3, title: "annonce 3", image: "https://www.b-z-b.com/dw/image/v2/BJXP_PRD/on/demandware.static/-/Sites-Bizzbee-master-catalog/default/dwa89152d0/images/2003263_11576_V1.jpg?sw=400&sh=600&sm=cut" },
                { id: 4, title: "annonce 4", image: "https://www.b-z-b.com/dw/image/v2/BJXP_PRD/on/demandware.static/-/Sites-Bizzbee-master-catalog/default/dwa89152d0/images/2003263_11576_V1.jpg?sw=400&sh=600&sm=cut" }
            ]
        }
    }, */
    state,
    actions,
    mutations,
    getters
    /* getters:{
        annonces(state){
            return state.annonces;
        }
    } */
});
export default store;