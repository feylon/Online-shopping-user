<template>
<div class="container">
    <div class="h5">Parolni tiklash</div>
<button @click="router.go(-1)" class="btn btn-primary"><i class="fas fa-arrow-left-long"></i></button>
    <form @submit.prevent="reset()">
    <div class="w-50 m-auto">
<input required v-model="email" type="email" class="form-control">



<button  type="submit" class="btn btn-primary mt-3 m-auto d-block">Email addressga link jo'natish</button>
    </div>
</form>

</div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ref } from 'vue';
let email = ref("")
let router = useRouter();
let reset = ()=>{
   

const auth = getAuth();
sendPasswordResetEmail(auth, email.value)
  .then(() => {
alert(email.value + " email manzilga link jo'natildi");
email.value = ""
})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Xatolik, email address mavjud emas," + errorMessage)    // ..
  });

}
</script>