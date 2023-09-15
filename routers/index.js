// import admin_panel from "../src/components/admin_panel.vue";
import main from "../src/components/main_page.vue";
import login_page from "../src/components/login.vue";
import sign_page from "../src/components/sign_page.vue"
import history from "../src/components/history.vue";
import own_info from "../src/components/own_info.vue"
import pay_data from "../src/components/pay_data.vue";
import brands from "../src/components/brands.vue";
import sale_brands from "../src/components/sale_brands.vue";
import sale_done from "../src/components/sale_done.vue";
import   {global_funksiya} from "../store/index.js";
import forgot_pass from "../src/components/forgot.vue";
import  home from "../src/components/home.vue";
import { createRouter,createWebHashHistory } from "vue-router";
let router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {path:"/login", name:"login",component:login_page},
        {path:"/sign",name:"sign",component:sign_page},
        {path:"/:pathMatch(.*)",component:login_page},
        {path:"/forgot_pass",component:forgot_pass},
        {path:"/",component:main,
            children:[
        {path:"/",component:home},
        {path:"/history",component:history},
        {path:"/Own_info",component:own_info},
        {path:"/pay_data",component:pay_data},
        {path:"/brands",component:brands},
        {path:"/sale_brands",component:sale_brands},
        {path:"/sale_done",component:sale_done}
      
    ]}
    ]
});

function clearhistory(routePath) {
    router.replace(routePath);
  }
router.beforeEach((to,from)=>{
    let store = global_funksiya();
    
    // if(to.name == "sign") {return ({name:"sign"});}
    // else
    //  if(  to.name != "login" && !store.auth) return({name:"login"})

    
})

export {router,clearhistory}


