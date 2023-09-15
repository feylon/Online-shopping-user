<template>

<header class="header">
      <nav class="nav">
        <a href="#" class="nav_logo">Online Shopping</a>

        <ul class="nav_items d-none">
          <li class="nav_item">
            <a href="#" class="nav_link">Home</a>
            <a href="#" class="nav_link">Product</a>
            <a href="#" class="nav_link">Services</a>
            <a href="#" class="nav_link">Contact</a>
          </li>
        </ul>

        <button @click="form_show = true" class="button" id="form-open">Login</button>
      </nav>
    </header>

    <!-- Home -->
    <section class="home "  :class="form_show ? 'show':''">
      <div class="form_container" :class="signup?'active':''">
        <i @click="form_show = false" class="uil uil-times form_close"></i>
        <!-- Login From -->
        <div class="form login_form">
          <form action="#" @submit.prevent="login">
            <h2>Login</h2>

            <div class="input_box">
              <input v-model="email" type="email" placeholder="Elektiron pochtani kiriting" required />
              <i class="uil uil-envelope-alt email"></i>
            </div>
            <div class="input_box">
              <input v-model="password" :type="show_login_password?'password':'text'" placeholder="Parolni kiriting" required />
              <i class="uil uil-lock password"></i>
              <i @click="show_login_password = !show_login_password" :class="show_login_password ?'uil-eye-slash':'uil-eye'" class="uil  me-2" ></i>
            </div>

            <div class="option_field">
              <span class="checkbox">
                <input type="checkbox" id="check" />
                <label for="check">Eslab qolish</label>
              </span>
              <a href="#" @click.prevent="router.push('/forgot_pass')" class="forgot_pw">Parolni unitdingizmi ? </a>
            </div>

            <button :disabled="(active_button)? true:false" class="button">Login</button>

          </form>
            <div class="login_signup">Ro'yxatdan o'tmadingizmi? <a href="#" @click.prevent="router.push('/sign')"  id="signup">Ro'yxatdan o'tish</a></div>
        </div>

        
      </div>
    </section>


</template>
<script setup>
import {ref} from "vue";
import { useRouter } from "vue-router";
import { global_funksiya } from "../../../Admin/store";
import { doc, onSnapshot } from "firebase/firestore";
/* google firebase */
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {db,database} from "../../google/index.js";
// import {db1} from "../../boshqa/index2.js";
import { getDatabase,push } from "firebase/database";
import ref1 from "../../boshqa/index.js";
let store = global_funksiya();
let active_button = ref(false)
const auth = getAuth();
let signup = ref(false);
let form_show = ref(!false);
let show_login_password = ref(true);
let router = useRouter();
let useruid = ref("");
let email = ref("");
let password = ref ("");
let api = ref("");
let time = new Date();
let error1 = ref(false)
const ipAddressAPI = 'https://api.ipify.org?format=json';

fetch(ipAddressAPI)
  .then(response => response.json())
  .then(data => {
    const ipAddress = data.ip;
    api.value = ipAddress;
    
  })
  .catch(error => {
    console.error('Error fetching IP address:', error);
  });
  
let login = async ()=>{
  active_button.value = true; 
await  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    // console.log(user.uid);
    useruid.value = user.uid;

    error1.value = false;


  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Login yoki parol xato", error);
    active_button.value = false; 
    error1.value = true;
  });
if(error1.value)return;
const  getfirebase =  onSnapshot(doc(db, "users",  useruid.value),  (doc) => {
    // console.log("Current data: ", doc.data().active);
  if(doc.data().active){
    // console.log("Kirishga ruxsat bor");
   const  writeUserData = async () => {
  push(ref1(database, 'users_history/' +  useruid.value), {
api: api.value,
time : time.toString()     
}).catch(err=>console.log(err))}
writeUserData();
store.useruid = useruid.value;
store.auth = true;
router.push("/");
}
  else{
    // console.log("Kirishga ruxsat yo'q");
    active_button.value = false; 
    alert("Siz admin tomondan bloklangansiz!");
  }
  });




// console.log("I'm working")
}


</script>
<style scoped>
@import "../components/css/login.css";

</style>