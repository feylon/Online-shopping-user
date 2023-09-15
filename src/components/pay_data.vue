<template>
    <div class="h5">To'lov ma'lumotlari va tarix</div>

    <div class="">
<div class="row ms-3 mt-3">
    <div class="col-4"><div class="h6">Sizda mavjud : {{store.userdata.money}} so'm</div>
    <div class="h6 mt-4">Jami xarajatlar : {{history_sale}} so'm</div>
    <!-- <div class="h6 mt-4">Bugungi xarajatlar : {{ history_sale_today }} so'm</div> -->
</div>

</div>

    </div>
    <div class="ms-3">
<table class="table">
    <tr>
      <th class="text-center"><i class="fas fa-magnifying-glass"></i></th>
      <th  class="text-center"><input :class="store.document.dark ? 'bg-dark text-light ':''" @input="xarajat_search" type="text" class="form-control w-75 m-auto" placeholder="Xarajatlat bo'yicha izlash"></th>
      <th class="text-center"><input :class="store.document.dark ? 'bg-dark text-light ':''" @input="data_time_search" type="datetime-local" class="form-control w-75 m-auto"></th>
      <th class="text-center"></th>
      <th  class="text-center"><input :class="store.document.dark ? 'bg-dark text-light ':''" type="date" @input="search_sana" class="form-control w-75 m-auto" placeholder="Sana bo'yicha izlash"></th>

    </tr>
</table>
        <table class="table" :class="store.document.dark ? 'table-dark table-striped ':''">
      <thead>
    <tr>
      <th scope="col" class="text-center">#</th>
      <th scope="col" class="text-center">Xarajat miqdori</th>
      <th scope="col" class="text-center">Vaqti</th>
      <th scope="col" class="text-center">Mahsulotlar</th>
      <th scope="col" class="text-center">Sanasi</th>

    </tr>
  </thead>
  <tbody>
    <tr v-for="(i,j) in data" :key="j">
      <th class="text-center"  scope="row">{{j + 1}}</th>
      <td class="text-center"><b>{{i.summa}}</b> so'm</td>
      <td class="text-center">{{i.time}}</td>
      <td class="text-center">
       <button @click="prevod(i.sale_done)" class="btn btn-primary">
        <i class="fas fa-info"></i>
       </button>

      </td>
      <td class="text-center" :title="i.sale_done[0]">{{i.sana}}</td>

    </tr>
  
  </tbody>

  </table>


    </div>
</template>
<script setup>
import { ref } from 'vue';
import { global_funksiya } from '../../store';
import {useRouter} from "vue-router";
//* start google firebase
import { doc, onSnapshot,collection, query, where, getDocs  } from "firebase/firestore";

import { db } from '../../google/index.js';
let store = global_funksiya();
let route = useRouter();
let data = ref([]);
let history_sale = ref(0)
// const q =;
let history_sale_today = ref(0);

let hisoblash = async ()=>{
    const querySnapshot = await getDocs(query(collection(db, "admin_sale_history"), where("useruid", "==", store.useruid)));
querySnapshot.forEach((doc) => {
  // console.log(doc.id, " => ", doc.data());
  history_sale.value += doc.data().summa;
  // console.log(doc.data().summa)
});
}
hisoblash();

let hisoblash_today = async ()=>{
    const querySnapshot = await getDocs( query(collection(db, "admin_sale_history"), where("sana", "==", (new Date()).toLocaleDateString())));
querySnapshot.forEach((doc) => {
  history_sale_today.value += doc.data().summa;
});  
}
hisoblash_today();
let path = ref(query(collection(db, "admin_sale_history"), where("useruid", "==", store.useruid)));
let jadval = async ()=>{
    data.value = [];
    const querySnapshot = await getDocs( path.value );
querySnapshot.forEach((doc) => {
//   console.log(doc.id, " => ", doc.data());
  data.value.push(doc.data());
});
}
jadval();

let xarajat_search = ()=>{
// console.log(event.target.value);
// console.log(isArray(pat/))
let new_data = ref([]);


}
let data_time_search = ()=>{
 path.value = (query(collection(db, "admin_sale_history"), where("time", "==", event.target.value)));
jadval()
}
let search_sana = ()=>{
    // console.log(event.target.value)
    let data = event.target.value.split("-");
    data = data.join("/");
    data = data.split("/");
    data.reverse();
  let swap = data [0];
  data[0] = data[1];
  data[1] = swap;
  
    console.log(data);
    // path.value = (query(collection(db, "admin_sale_history"), where("sana", "==", event.target.value)));
// jadval();
};
let prevod = (obj)=>{
store.prevod = obj;
route.push("/sale_done");
}
</script>
<style scoped></style>