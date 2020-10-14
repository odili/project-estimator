<script>
  import {createEventDispatcher} from 'svelte'
  import {materials} from '../stores'
import Del from './Del.svelte';

const dispatch = createEventDispatcher()

const formatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: "NGN"
})
$: total = $materials.reduce((sum, mat)=> mat.price + sum, 0 )
function edit({id, name, price}){
  dispatch('edit', {id, name, price})
}
</script>
<h1>{formatter.format(total)}</h1>
<table class="primary">
  <thead>
    <tr>
      <th>Material</th>
      <th colspan="2">Price</th>
    </tr>
  </thead>
  <tbody>
    {#each $materials as material (material.id) }
      <tr>
        <td on:click={edit(material)} class="edit">{material.name}</td>
        <td>{formatter.format(material.price)}</td>
        <td><Del id={material.id}/></td>
      </tr>
    {/each}
    <tr>
      <td>Total</td>
      <td colspan="2">{formatter.format(total)}</td>
      </tr>
  </tbody>
</table>

<style>
  table {
    width: 100%;
  }
.edit {
  cursor: pointer;
}
</style>