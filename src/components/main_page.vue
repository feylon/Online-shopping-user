<template>
<nav :class="open_nav?'':'close'">
        <div class="logo-name">
            <router-link to="/" class="logo-image">
                <img src="../assets/logo.png" alt="">
            </router-link>

            <span class="logo_name">OnlineShop</span>
        </div>

        <div class="menu-itemw">
            <ul class="nav-linkk">
                <li><router-link @click="store.menu_change(0)" to="/">
                    <i  :class="store.menus[0]?'active':''" class="uil uil-estate"></i>
                    <span class="link-name1 link-name1 " :class="store.menus[0]?'active':''">Bosh sahifa</span>
                </router-link></li>
                <li><router-link @click="store.menu_change(1)" to="/brands">
                    <i @click="store.menu_change(1)" :class="store.menus[1]?'active':''" class="fab fa-shopify"></i>
                    <span class="link-name1" :class="store.menus[1]?'active':''">Tovarlar</span>
                </router-link></li>
                <li><router-link @click="store.menu_change(2)" to="/pay_data" >
                    <i @click="store.menu_change(2)" :class="store.menus[2]?'active':''" class="fas fa-credit-card"></i>
                    <span class="link-name1" :class="store.menus[2]?'active':''">To'lovlar</span>
                </router-link></li>
                <li><router-link @click="store.menu_change(3)" to="/history" >
                    <i @click="store.menu_change(3)" :class="store.menus[3]?'active':''" class="far fa-clock"></i>
                    <span class="link-name1" :class="store.menus[3]?'active':''">Kirish tarixi</span>
                </router-link></li>
                <li><router-link @click="store.menu_change(4)" to="/Own_info" >
                    <i @click="store.menu_change(4)" :class="store.menus[4]?'active':''" class="uil uil-comments"></i>
                    <span class="link-name1" :class="store.menus[4]?'active':''">Shaxsiy ma'lumotlar</span>
                </router-link></li>
                
            </ul>
            
            <ul class="logout-mode">
                <li class="exit"><a @click="exit"  >
                    <i class="uil uil-signout exit"></i>
                    <span class="link-name1 exit">Chiqish</span>
                </a></li>

                <li  @click="change_theme" class="mode">
                    <a >
                        <i v-if=" store.document.dark" class="uil uil-moon"></i>
                        <i v-else class="far fa-sun"></i>
                    <span v-if=" !store.document.dark" class="link-name1">Tonggi</span>
                    <span v-else class="link-name1">Tungi</span>
                </a>

                <div class="mode-toggle d-none">
                  <span class="switch"></span>
                </div>
            </li>
            </ul>
        </div>
    </nav>

    <section class="dashboard ">
        <div :class="store.document.dark ? 'bg-dark': 'bg-primary'" class="top text-light">
            <i class="uil uil-bars sidebar-toggle text-light" @click="opennav"></i>

            <div class="search-box d-none">
                <i class="uil uil-search"></i>
                <input type="text" placeholder="Search here...">
            </div>
            <div>
                <h5>Jami balans : {{ store.userdata.money  }} so'm</h5>    
            </div>
            <img  @click="router.push('/own_info');store.menu_change(4)" style="cursor: pointer;" :src="profil_picture" alt="">
        </div>
<div style=" padding-top: 50px;">
    
    <RouterView ></RouterView>
</div>
       
    </section>

</template>
<script setup>
import   {global_funksiya} from "../../store/index.js";
let store = global_funksiya();
import { ref } from 'vue';
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "../../google/index.js";
import {useRouter} from "vue-router";
let profil_picture = ref("");
let router = useRouter();
let open_nav = ref(false);


const unsub = onSnapshot(doc(db, "users",store.useruid), (doc) => {
    // console.log("Current data: ", doc.data());
    profil_picture.value = doc.data().url;
    store.userdata = doc.data();
if(!doc.data().active  )router.push("/login");

    
});
unsub;  
if(!store.auth  )router.push("/login");




let exit = ()=>{
    if(confirm("Tizimdan chiqasizmi ?")){
        store.auth = false;
        window.auth = false;
        router.push("/login")
    }
}
let opennav = ()=>{
   
let getStatus = ref(localStorage.getItem("status"));


open_nav.value = !open_nav.value;

};

let change_theme = ()=>{
    store.document.dark = !store.document.dark;
    if(store.document.dark){
        document.body.classList  = "dark bg-dark text-light"  
    }else document.body.classList  = "";

};
</script>
<style scoped>
@import "../components/css/main.css";
body{color:red;}
.exit:hover{
    color:rgb(212, 46, 46)!important;
    cursor: pointer;
}
.exit:hover~.exit{
    color:rgb(212, 46, 46)!important;
    cursor: pointer;
}
</style>