<template>
<div class="h5">
    Shaxsiy ma'lumotlar
</div>
<div class="container">

<div class="row mt-4">
<div class="col-5 ">
<div class="d-flex">
<div class="d-flex mt-2 w-50 flex-column gap-4"><label class="h6" for="">Ism</label>
    <label class="h6" for="">Familiya</label>
    <label class="h6" for="">Yosh</label>
   
</div>

<div class="d-flex flex-column gap-3">
    <input :class="store.document.dark ? 'bg-dark text-light ':''" v-model="ism" :readonly="!change" type="text" class="form-control">
    <input :class="store.document.dark ? 'bg-dark text-light ':''" v-model="fam" :readonly="!change"  type="text" class="form-control">
    <input :class="store.document.dark ? 'bg-dark text-light ':''" v-model="yosh" :readonly="!change"  type="text" class="form-control">
   
</div>
</div>

<div  class="d-flex  justify-content-around mt-4">
    <button v-if="change" @click="undo" class="  btn btn-outline-danger">Bekor qilish</button>
<button v-if="!change"  @click="change = !change" class="btn btn-outline-primary"><i class="fas fa-pen"></i> O'zgartirish</button>

<button v-if="change" 
:disabled="(store.userdata.ism != ism || store.userdata.familiya != fam || store.userdata.yoshi != yosh)?false:true"
@click="change_function" class="btn btn-outline-success"><i class="fas fa-file-arrow-up"></i> Saqlash</button>

</div>

</div>
<div class="col-7 d-flex justify-content-center me_picture_section">
<img class="me_picture" :src="profil_picture" alt="">
<label  for="profil_picture">

<i class="fas fa-camera-rotate"></i>

</label>
</div>
</div>





</div>

<input @change="update_profil_picture" ref="file" v-show="false" type="file" name="" id="profil_picture"  accept="image/*">




</template>
<script setup>
import { ref } from 'vue';
import { global_funksiya } from '../../store';
let store = global_funksiya();
/*Google firebase */
import { doc, setDoc, updateDoc } from "firebase/firestore"; 
import {db} from "../../google/index.js";
import { getStorage, uploadBytes,getDownloadURL  } from "firebase/storage";
const storage = getStorage();

let file = ref()
let ism = ref(store.userdata.ism);
let fam = ref(store.userdata.familiya);
let yosh = ref(store.userdata.yoshi);
let change = ref(false);
let profil_picture = ref(store.userdata.url);





let undo = ()=>{
ism.value = store.userdata.ism;
fam.value = store.userdata.familiya;
yosh.value = store.userdata.yoshi;
change.value = false;
profil_picture.value = store.userdata.url;

}
let change_function = async ()=>{

await updateDoc(doc(db,  "users",store.useruid), {
    "yoshi": yosh.value,
    "familiya":fam.value,
    "ism" : ism.value
});
change.value = false;

}
let update_profil_picture = async ()=>{
if((file.value.files[0].size / (1024 * 1024)).toFixed(2) > 2){alert(`Fayl hajmi 2mbdan oshishi mumkin emas,\n Sizning faylingizni hajmi ${(file.value.files[0].size / (1024 * 1024)).toFixed(2)} MB`);return}

const storageRef = window.ref(storage,`users/${ store.useruid }/profile.jpg`);
await    uploadBytes(storageRef,file.value.files[0]);
getDownloadURL(window.ref(storage, `users/${ store.useruid }/profile.jpg`))
  .then(async(url) => {
    profil_picture.value = url;
    // store.user.user_profil_picture = url;
    await updateDoc(doc(db, "users",  store.useruid ), {
  
  "url" : url
 
  
});


  })

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
</style>