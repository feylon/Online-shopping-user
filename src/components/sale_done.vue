<template>
<div class="h5 mt-3">Sotib olingan mahsulotlar</div>
<div class="container">
    <table :class="store.document.dark ? 'table-dark table-striped ':''"  class="table">
      <thead>
    <tr >
      <th scope="col">#</th>
      <th scope="col">Nomi</th>
      <th scope="col">Mahsulot narxi</th>
      <th scope="col">Miqdori</th>
      <th scope="col">Umumiy narx</th>

    </tr>
  </thead>
  <tbody>
    <tr v-for="(i,j) in store.prevod" :key="j">
      <th scope="row">{{j + 1}}</th>
      <td>{{i.nomi}}</td>
      <td>{{i.narx}}</td>
      <td>{{i.miqdor}}</td>
      <td>{{i.hisob}}</td>

    </tr>
   
  </tbody>

  </table>
</div>

</template>
<script setup>
import { global_funksiya } from '../../store';
let store = global_funksiya();
// console.log(store.prevod);
</script>
<style></style>