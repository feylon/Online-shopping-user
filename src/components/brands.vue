<template>
<div class="h5">
    Tovarlar
</div>



<div class="container">
    <div class="ms-3 row">
    
<form >


  <div class="h6 ms-1 mb-4 d-block">Kategoriyani tanlang</div>
<div ref="tiplar" class="filter_section d-flex justify-content-around flex-wrap ">

  <div class="form-check m-2 mt-3">
  <input :class="store.document.dark ? 'bg-dark text-light ':''" @click="getdata_all" class="form-check-input" type="radio" name="filter" id="item2" value="option1" checked>
  <label class="form-check-label" for="item2">
Hammasini ko'rsatish
  </label>
</div>

  <div v-for="(i,j) in filter_items"  @click="filter_data(i.value)" :key="j" class="form-check m-2 mt-3">
  <input :class="store.document.dark ? 'bg-dark text-light ':''" class="form-check-input" type="radio" name="filter" :id="i.value" value="option1" >
  <label class="form-check-label" :for="i.value">
    {{i.value}}
  </label>
</div>




</div>

<div class="h6 ms-1 mt-3  mb-4 d-block">Nom bo'yicha izlash</div>

<div class="search_section mb-5">
    <input :class="store.document.dark ? 'bg-dark text-light ':''" placeholder="Izlash"  v-model="searcher_value" @input="searcher_name()" type="text" class ="form-control w-25 search_section_value">
    <i :class="store.document.dark ? 'bg-dark text-light ':''" class="fas fa-magnifying-glass lupa"></i>
  </div>


 


</form>    
    <div :class="store.document.dark ? 'bg-dark text-light ':''" v-if="data.length" v-for="(i,j) in data" :key="j" class="col-4">
        <div class="card" style="width: 18rem;">
  <img :src="i.url" class="card-img-top" alt="...">
  <div :class="store.document.dark ? 'bg-dark text-light ':''" class="card-body">
    <p   style="font-size: 10px;" class="text-primary">#{{ i.tip }}</p>
    <h5   class="card-title">{{i.name}}</h5>
    <p   class="card-text">
    {{i.title}}
    <br>
    <br>
  <span   class="h6">Kelgan vaqt</span> :  {{new Date(i.time).toLocaleString()}}
    </p>
   
  </div>
  <ul class="list-group list-group-flush">
    <li :class="store.document.dark ? 'bg-dark text-light ':''" class="list-group-item d-flex justify-content-around">
        <span  class="h6">Narxi</span> <span :class="i.discount !=0 ?'text-decoration-line-through':''">{{i.narx}}</span>
    </li>
    <li :class="store.document.dark ? 'bg-dark text-light ':''" v-if="i.discount" class="list-group-item d-flex justify-content-around">
        <span  class="h6">Chegirma bilan</span> <span>{{i.narx - (i.narx * i.discount/100)}} ({{ i.discount }} %)</span>
    </li>
    <li :class="store.document.dark ? 'bg-dark text-light ':''" v-else class="list-group-item d-flex justify-content-around">
        <span >Chegirma mavjud emas</span>
    </li>
    <li :class="store.document.dark ? 'bg-dark text-light ':''" class="list-group-item d-flex justify-content-around">
        <span class="h6">Mavjud</span> <span>{{i.hajm}} {{i.hisob}}</span>
    </li>
    
  </ul>
  <div :class="store.document.dark ? 'bg-dark text-light ':''" class="card-body">
    <button  v-if="store.sale_brands.includes(i.name)" :disabled="store.sale_brands.includes(i.name)"  class="btn btn-outline-danger w-100 " ><i class="fas fa-basket-shopping"></i> Sotib olindi</button>
  
    <button v-else  @click="sale(i.name)" class="btn btn-outline-primary w-100 " ><i class="fas fa-basket-shopping"></i> Sotib olish</button>
    </div>
</div>
    </div>



    <div v-else class="d-flex align-items-center justify-content-center">

      <div class="h6 mt-5 text-secondary"> <i class="fas fa-triangle-exclamation"></i>  Ma'lumot mavjud emas</div>
    </div>

</div>
</div>
<router-link v-if="store.sale_brands.length" to="/sale_brands" class="fixed_section  text-light align-items-center d-flex justify-content-center">
  <button class="btn btn-outline-primary w-100">
    <i class="fas fa-arrow-right-long"></i>
  </button>
</router-link>
</template>
<script setup>
import { doc, onSnapshot, setDoc, updateDoc,collection,deleteDoc, orderBy, limit, where, query   } from "firebase/firestore";
import {db} from "../../google/index.js";
import { ref,onMounted } from "vue";
import { global_funksiya } from "../../store";
let store = global_funksiya();
let tiplar = ref();
let searcher_value = ref("");
let path = ref(query(collection(db, "brands")));;
let data = ref([]);
let filter_items = ref([]);
let filter_data = async (name)=>{
// console.log(name);
path.value = (query(collection(db,"brands"),where("tip", "==", name))); 
const get_data_with_filter = onSnapshot(path.value, (querySnapshot) => {
  data.value = data.value.slice(0,0);
  querySnapshot.forEach((doc) => {
      data.value.push(doc.data());
    });
});
}

// console.log("salom")

let getdata_all = async ()=>{
path.value = (query(collection(db,"brands"))); 
const get_data_all = onSnapshot(path.value, (querySnapshot) => {
  data.value = data.value.slice(0,0);
  querySnapshot.forEach((doc) => {
      data.value.push(doc.data());
    });
});
}

//get data with searchsection
let searcher_name= ()=>{
  let inputs_radios = tiplar.value.querySelectorAll("input");
  inputs_radios.forEach(i=>i.checked = false)
if (searcher_value.value == ""){
path.value = (query(collection(db,"brands")));
inputs_radios[0].click(); 
}
else 
{
  path.value = (query(collection(db,"brands"),where("name", "==", searcher_value.value ))); 
}
const get_data_all = onSnapshot(path.value, (querySnapshot) => {
  data.value = data.value.slice(0,0);
  querySnapshot.forEach((doc) => {
      data.value.push(doc.data());
    });
});
}





const get_data = onSnapshot(path.value, (querySnapshot) => {
  data.value = data.value.slice(0,0);
  querySnapshot.forEach((doc) => {
      data.value.push(doc.data());
    });
});

/*Tip elementlarini olish */
const get_filter_items = onSnapshot(query(collection(db, "tiplar")), (querySnapshot) => {
  filter_items.value = filter_items.value.slice(0,0);
  querySnapshot.forEach((doc) => {
      filter_items.value.push(doc.data());
    });
});

/* *** Tip elementlarini olish */



/* Sotib olish boshlandi */
let sale = (name)=>{
  store.sale_brands.push(name);
}
</script>
<style scoped>

.lupa{
  position: absolute;
  left: 8px;
  top: 30%;
  color: rgb(58, 58, 58);
}
.search_section{
  position: relative;
}
.search_section_value{
padding-left: 35px;
}


.fixed_section{
  position: fixed;
  bottom: 30px;
  right: 50px;
  width: 70px;
  height: 40px;
  border-radius: 10px;
}
</style>