<script lang="ts">
  import {materials} from '../stores';
  export let id: string;
  export let name = '';
  export let price: number;
  
  $: mode = id ? 'edit' : 'add';
  $: canSubmit = name !== '' && price > 0;
  
  function handleSubmit() {
    if (!canSubmit) {
      console.log('returned')
      return;
    }
  
    materials.update({id, name, price})
  
    name = '';
    price = undefined;
    id = undefined;
  }
  
  function cancel() {
    name = '';
    price = undefined;
    id = undefined;
  }
  </script>
  
  <form on:submit|preventDefault={handleSubmit}>
    <fieldset>
      <label for="nameField">Material </label>
      <input
        bind:value={name}
        type="text"
        placeholder="Wood, GLue, Etc."
        id="nameField"
      />
      <label for="priceField">price </label>
      <input
        bind:value={price}
        type="number"
        min="0"
        step="any"
        placeholder="Price"
        id="priceField"
      />
    </fieldset>
    <button disabled={!canSubmit} class="float-right" type="submit">{mode}</button>
    {#if mode === 'edit'}
      <button on:click={cancel} class="float-right" type="button">cancel</button>
    {/if}
  </form>
  
  <style>
  button {
    margin-left: 1rem;
  }
  button:disabled {
    cursor: not-allowed;
  }
  </style>
  