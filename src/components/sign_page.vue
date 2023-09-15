<template>
<div class="container mt-2" >
    <h4>Ro'yxatdan o'tish</h4>
    <div class="row mt-3">
        <div class="col-5">
            <form @submit.prevent="registor">
        <div class="form-section d-flex justify-content-around">
            <div class="chap d-flex flex-column">
                <label class="mb-5 h6" for="ism">Ism</label>
                <label class="mb-5 h6" for="fam">Familiya</label>
                <label class="mb-5 h6" for="email">Email</label>
                <label class="mb-5 h6" for="age">Yoshi</label>
                <label class="mb-5 h6" for="pass">Parol</label>
                <label class="mb-5 h6" for="pass_re">Parol(Qayta)</label>
            </div>
            <div class="ong  d-flex flex-column">
                <input :class="dark ? 'bg-dark text-light ':''" v-model="fam" type="text" id="ism"  class="form-control mb-4" placeholder="Jamshid">
                <input :class="dark ? 'bg-dark text-light ':''" v-model="ism" type="text" id="fam" class="form-control mb-4" placeholder="Ergashev">
                <input :class="dark ? 'bg-dark text-light ':''" v-model="email" type="email" id="email" class="form-control mb-4" placeholder = "jamshid14092002@gmail.com">
                <input :class="dark ? 'bg-dark text-light ':''" v-model="yosh" type="text" id="age"  class="form-control mb-4" placeholder="21">
                <input :class="dark ? 'bg-dark text-light ':''" v-model="password" type="password" id="pass" class="form-control mb-4" placeholder="Min:8ta belgi">
                <input :class="dark ? 'bg-dark text-light ':''" v-model="repassword" type="password" id="pass_re" class="form-control mb-5 mt-2" placeholder="Qaytadan kiriting">
            </div>

        </div>

        <div class="w-100 d-flex justify-content-around">
            <button type="reset" @click="router.push('/login')" class="btn btn-outline-danger"><i class="fas fa-arrow-left"></i> Ortga</button>
            <button type="submit" :disabled=" !(fam && ism && yosh && email && password.length > 7 &&  password == repassword)?true : false" class="btn btn-outline-success d-flex align-items-center justify-content-around"><i class="fas fa-file-arrow-up me-2"></i> Saqlash</button>
        </div>
    </form>
        </div>
        <div class="col-7 d-flex justify-content-center me_picture_section">
<img :class="dark ? 'bg-light':''" class="me_picture" :src="joriy_url" alt="">
<label  for="profil_picture">
   
    <i class="fas fa-camera-rotate"></i>

</label>
</div>
    </div>



</div>

<div class="fixed_section" >
    <i  @click = "dark_mode" v-if="dark" class="uil uil-moon"></i>
                        <i @click = "dark_mode"  v-else class="far fa-sun"></i>
</div>
<input  @change="update_profil_picture" ref="file" v-show="false" type="file" name="" id="profil_picture" accept="image/*">

</template>
<script setup>
import {ref} from "vue";
import { useRouter } from "vue-router";
import {clearhistory} from "../../routers/index.js";
/* google fireabse */
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db} from "../../google/index.js";
import { getStorage, uploadBytes,getDownloadURL  } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
const storage = getStorage();

/* **google fireabse */


let router = useRouter();
let fam = ref("");
let file = ref();
let ism = ref("");
let yosh = ref(5);
let email = ref("");
let password = ref(""); 
let repassword = ref("");
let dark = ref(false);
let joriy_url = ref("https://firebasestorage.googleapis.com/v0/b/onlineshopping-97a8f.appspot.com/o/users%2Fdefault%2Fimg_124200.svg?alt=media&token=9eec397f-72a1-4fda-8ce5-c2163126f005");
let useruid = ref("");
let err = ref(false);
let change_img = ref(false)
let dark_mode = ()=>{
    let body = document.querySelector("body");
    dark.value = !dark.value;
    body.classList =  ""
if(dark.value){
    body.classList = "bg-dark text-light ";
}else{
    body.classList.remove("bg-dark");
    body.classList.remove("text-light");
    
}

}







let update_profil_picture = ()=>{
const selectedFile = file.value.files[0];
 if (selectedFile) {
    if((selectedFile.size / (1024 * 1024)).toFixed(2) > 2){alert(`Fayl hajmi 2mbdan oshishi mumkin emas,\n Sizning faylingizni hajmi ${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`);return}
    const reader = new FileReader();
        
        reader.onload = function (event) {
           joriy_url.value = event.target.result;
        };
        
        reader.readAsDataURL(selectedFile);
        change_img.value = true;
    }
};


let registor = async ()=>{
    event.preventDefault();
    const auth = getAuth();
    // Emailni yaratish
await createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // console.log("Ro'yxatdan mufaqiyatli o'tdi")
    const user = userCredential.user;
    // console.log(user.uid);
    useruid.value =  user.uid;
    // console.log(useruid.value);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    if(errorCode == 'auth/email-already-in-use')
    {alert(`${email.value} ro'yxatdan allaqachon o'tgan`)}
   err.value = true;
});
// rasm yuklash
if(change_img.value)
{if(err.value)return;
await uploadBytes(window.ref(storage, `users/${ useruid.value }/profile.jpg`), file.value.files[0]).then((snapshot) => {
 
}).catch(error=>{console.log("storeda xatolik ",error);err.value = true;});



// rasmni urlini olish
if(err.value)return;
await getDownloadURL(window.ref(storage,  `users/${ useruid.value }/profile.jpg`))
  .then((url) => {
    joriy_url.value = url
    // console.log(joriy_url.value);
  })
  .catch((error) => {
  console.log(error,"Rasmni olishda xatolik" );
  err.value = true;
  });}

//Firestorega joylash
await setDoc(doc(db, "users", useruid.value), {
  admin: false,
  email: email.value,
  familiya: fam.value,
  password : password.value,
  ism: ism.value,
  money : 3000000,
  url : joriy_url.value,
  yoshi:yosh.value,
  active : true
});
fam
file.value =  ("")
ism.value =  ("")
yosh.value =  (5)
email.value =  ("")
password.value =  ("")
repassword.value =  ("")
joriy_url.value =  ("https://firebasestorage.googleapis.com/v0/b/onlineshopping-97a8f.appspot.com/o/users%2Fdefault%2Fimg_124200.svg?alt=media&token=9eec397f-72a1-4fda-8ce5-c2163126f005")
router.push("/login");
// console.log("Hammasi joyida")

}
</script>
<style scoped>
.me_picture{
    width: 300px;
    height: 300px;
    border-radius: 50%;

    }
    .me_picture_section{
        position: relative;
        height: 300px;        
    }
    .me_picture_section label{
        width: 70px;
        height: 70px;
        position: absolute;
        border:none;
        border-radius: 50%;
        bottom: 5px;
        background: none;
        color: white;
        font-size: 25px;
        transition: 0.5s all ease;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        }
        .me_picture_section label:hover{
            background:white;
            color: #0E4BF1;
        }
.fixed_section{
    width: 20px;
    height: 20px;
    right: 20px;
    top: 20px;
    position: fixed;
}        
</style>