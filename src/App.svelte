<script lang="ts">
  import { onMount } from 'svelte'
  import {materials} from './stores'
import Form from './components/Form.svelte';
import Table from './components/Table.svelte';
import type { Material } from './types/material.type';
let id: string;
let name: string;
let price: number;

function editMaterial(material: Material){
id = material.id
name = material.name
price = material.price
}

onMount(()=>{
  if( localStorage.getItem('materials')){
  materials.set(JSON.parse(localStorage.getItem('materials')))
}
})
</script>

<svelte:head>
  <title>Project Estimator</title>
</svelte:head>

<main>

  <h1>Project Estimator</h1>
  
  <Form bind:id bind:name bind:price/>
  
  <Table on:edit={(e) => editMaterial(e.detail)} />
</main>



<style>
main {
  width: 80%;
  flex: 1;
  justify-content: center;
  align-content: center;
  margin: 0 auto;
}
</style>
