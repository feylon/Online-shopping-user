<template>
<form @change.prevent="summni_hisobla">
    <div class="container mt-3">
<div class=" align-items-center justify-content-between">
    <button @click.prevent="router.go(-1)" class="btn btn-primary d-block"><i class="fas fa-arrow-left-long"></i></button>

<!-- {{ data }} -->
<div class="h5 mb-3 mt-3 ms-3 d-block">Sotib olinayotgan tovarlar</div>

</div>
        <table v-if="data.length" class="table"  :class="store.document.dark ? 'table-dark table-striped ':''">
      <thead>
    <tr>
      <th class="text-center" scope="col">#</th>
      <th class="text-center" scope="col">Tovarlar</th>
      <th class="text-center" scope="col">Narxi</th>
      <th class="text-center" scope="col">Mavjud</th>
      <th class="text-center" scope="col">Miqdor </th>
      <th class="text-center" scope="col">Hisob</th>
      <th class="text-center" scope="col">* </th>

        </tr>
  </thead>
  <tbody >
    <tr v-for="(i,j) in data" :key="j">
      <th class="text-center" scope="row">{{j + 1}}</th>
      <td class="text-center">{{i.name}}</td>
      <td class="text-center">{{i.narx - (i.narx * i.discount) / 100}}</td>
      <td class="text-center">{{i.hajm}} {{ i.hisob }}</td>
      <td class="text-center"><input :class="store.document.dark ? 'bg-dark text-light ':''" @input="hisob((i.narx - (i.narx * i.discount) / 100),j,i.hajm)" :max="i.hajm" :min="0" type="number" class="form-control  text-center w-50      m-auto" value="0" ></td>
     <!-- <td class="text-center">
        <select name="" id="">
            <option class="form-control-select" v-for="i in parseInt(i.hajm)" value="i">{{i}}</option>
        </select>
     </td> -->
     <td class="text-center">{{ data1[j].hisob }}  so'm</td>
      <td class="text-center"><button :title="i.name" type="button" @click.prevent=delete_item(i.name) class="btn btn-outline-danger"><i class="far fa-trash-can"></i></button></td>


    </tr>
    <tr >
        <td ></td>
        <td ><div class="h6">Hammasi :</div></td>

        <td ></td>
        <td></td>
        <td></td>

        <td  class="text-end h6 text-center" :class="poor?'text-danger':''">{{summa}} so'm
        <br><span v-if="(poor )">  Mablag' yetarli emas</span>
        </td>
        <td></td>
    </tr>
  </tbody>

  </table>

  <div v-else class="d-flex align-items-center justify-content-center">
   
<div class="h6 mt-5 text-secondary"> <i class="fas fa-triangle-exclamation"></i>  Ma'lumot mavjud emas</div>
</div>
<div  v-if="data2.length!=0" ref="document" class="document">
    <table    class="table">
   <thead>
    <th class="text-center" scope="col">#</th>
      <th class="text-center" scope="col">Tovar</th>
      <th class="text-center" scope="col">Hisobi</th>
      <th class="text-center" scope="col">Narxi</th>
      <th class="text-center" scope="col">Umumiy narx</th>
   </thead>
   <tbody>
    <tr v-for="(i,j) in data2">
        <td class="text-center">{{ j + 1 }}</td>  
        <td class="text-center">{{i.nomi}}</td>
        <td class="text-center">{{i.miqdor}}</td>
        <td class="text-center">{{i.narx}}</td>
        <td class="text-center">{{i.hisob}} so'm</td>


    </tr>
    <tr>
        <td></td>
        <td colspan="3"><div class="h6">Hammasi :</div></td>

        <td   class="text-end h6 text-center" >{{summa}} so'm</td>

    </tr>
    <tr>
        <td></td>
        <td colspan="3"><div class="h6">Vaqt :</div></td>

        <td   class="text-end h6 text-center" >{{real_time}}</td>

    </tr>
   </tbody>
</table>
</div>
</div>
</form>
<div @click="sale" v-if="!poor && summa" class="fixed_section  text-light align-items-center d-flex justify-content-center">
  <button :disabled="disabled_button?true:false" class="btn btn-outline-primary w-100">
 Sotib olish 
  </button>
</div>
</template>
<script setup>
import { global_funksiya } from '../../store/index.js';
import { useRouter } from 'vue-router';
/* Google firebase */
import { doc, onSnapshot, getDoc, setDoc, updateDoc, collection,deleteDoc, orderBy, limit, where, query   } from "firebase/firestore";
// import {db} from "../../google/index.js";
import { ref,onMounted } from "vue";
import { getDatabase,set } from "firebase/database";
import {db1} from "../../boshqa/index2.js";
import ref1 from "../../boshqa/index.js";
import { db } from '../../google/index.js';
import { getStorage,  uploadBytes } from "firebase/storage";

const storage = getStorage();
let store = global_funksiya();

let disabled_button = ref(false)
let document = ref()
let real_time = ref();
let router = useRouter();
let data = ref([]);
let data1 = ref([]);
let data2 = ref([])
let table = ref("");
let summa = ref(0);
let poor = ref(false);
setTimeout(() => {
    
}, 1000);
store.sale_brands.forEach((i)=>{
data1.value.push(
    {
        nomi:i,
        miqdor:0,
        hisob:0

    }
)   

let get_Data_test = async ()=>{
  const docSnap = await getDoc( doc(db, "brands", i));

if (docSnap.exists()) {
  data.value.push(docSnap.data());

}
}
get_Data_test();
    
});
let data1_delete_item = ref()
let delete_item = (name)=>{
    data1.value.forEach(i=>{
        i.hisob = 0;
    })
    event.preventDefault();
    summa.value = 0;
    // summni_hisobla();
    data1_delete_item.value = store.sale_brands.indexOf(name);
    data1.value.splice(data1_delete_item.value,1);
    data.value = data.value.slice(0,0);
    // console.log("sasas")
    // console.log(data1.value)
    // console.log(data.value)
    
    store.sale_brands.splice(store.sale_brands.indexOf(name),1);
    store.sale_brands.forEach((i)=>{
      let get_Data_test = async ()=>{
  const docSnap = await getDoc( doc(db, "brands", i));

if (docSnap.exists()) {
  data.value.push(docSnap.data());

}
}
get_Data_test();
});

};

let hisob = (narx,index,hajm)=>{
    if(event.target.value == "")event.target.value = "0"
    if(parseInt(event.target.value) > parseInt(hajm))event.target.value = hajm;
// console.log(narx, event.target.value);
data1.value[index].hisob = narx * event.target.value;
data1.value[index].miqdor = parseInt(event.target.value);;
data1.value[index].narx = narx;
}
let summni_hisobla  = ()=>{
  //  console.log("start hisobla")
    summa.value = 0;
    data1.value.forEach((i)=>{
        summa.value +=i.hisob;
    });
    if(store.userdata.money < summa.value){poor.value = true}
    else {poor.value = false};
    
}
/* Sotib olish boshlandi */
let sale = async ()=>{
  disabled_button.value = !disabled_button.value;
    for(let i of data1.value){
       if(!i.hisob || !i.miqdor){continue;}
        data2.value.push(i);

    }

// console.log(data2.value);

// for(let i of data2.value)
for(let i of data2.value)
{
let hajm = ref();
const docRef = doc(db, "brands", i.nomi);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  // console.log("Document data:", parseInt(docSnap.data().hajm));
  hajm.value = parseInt(docSnap.data().hajm) - i .miqdor;
  // console.log(hajm.value);

await updateDoc(docRef, {
  hajm: hajm.value.toString()
});
}


let get_pay_bank = async ()=>{
let bankdoc =  await getDoc(doc(db, "bank", "online-shopping"))
if(bankdoc.exists()){
  // console.log(bankdoc.data(),bankdoc.data().money)
let money =  parseInt(bankdoc.data().money) + summa.value;
await updateDoc(doc(db, "bank", "online-shopping"), {
  money: money
});
}else {
  // console.log("Malumot mavjud emas")
}
}
get_pay_bank();
}
data2.value.time = (new Date()).toLocaleDateString();
let timer = new Date();
let timer2 = timer
timer = `${timer.getFullYear()} ${timer.getMonth() + 1} ${timer.getDate()} ${timer.getHours()} ${timer.getMinutes()} ${timer.getSeconds()}`;
await setDoc(doc(db, "admin_sale_history", timer),
{
  sale_done : data2.value,
  useruid : store.useruid,
  ismi : store.userdata.ism,
  familiya : store.userdata.familiya,
  email :  store.userdata.email,
  time :(new Date()).toLocaleString(),
  summa : summa.value,
  sana:(new Date()).toLocaleDateString()
}
);


let my_money = ref();
const docRef = doc(db, "users", store.useruid);
const user_money = await getDoc(docRef);

if (user_money.exists()) {
  // console.log("Document data:", user_money.data().money);
  my_money = user_money.data().money;
  // console.log(my_money,"sasas");
  my_money = my_money - summa.value;


await updateDoc(docRef, {
  money: my_money

});
real_time.value = timer2.toLocaleTimeString();
html2pdf(document.value);
store.sale_brands = [];
data.value = [];
summa.value = 0;
data2.value = [];
router.push("/brands")
}





}


// console.log()
</script>
<style scoped>
.fixed_section{
  position: fixed;
  bottom: 30px;
  right: 50px;
  width: 100px;
  height: 40px;
  border-radius: 10px;
}
.qr-img{
    width: 400px;
    height: 400px;
    display: block;
    margin: auto;
}
</style>