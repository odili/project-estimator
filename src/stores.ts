import { writable } from 'svelte/store';
import type { Material } from './types/material.type';

const materialTore = (key = 'materials', initial: Material[] = []) => {
  const { subscribe, set, update } = writable(initial);


  return {
    subscribe,
    set: (value: Material[]) => {
      localStorage.setItem(key, JSON.stringify(value));
      return set(value);
    },
    update: (material: Material) => {
      update((store: Material[]) => {
        let itemIndex = store.findIndex((s) => (s.id === material.id));
        if (itemIndex >= 0) {
          store[itemIndex] = material

          localStorage.setItem(key, JSON.stringify(store));
          return store;
        }

        const item = {
          name: material.name,
          price: material.price,
          id: String(new Date().getTime()),
        };
        localStorage.setItem(key, JSON.stringify([item, ...store]));

        return [...store, item];
      });
    },
    remove: (id: string) => {
      update((store: Material[]) => {
        const deleted = store.filter(s => s.id !== id)
        localStorage.setItem(key, JSON.stringify(deleted));
        return deleted
      }
      )
    }
  };
};

export const materials = materialTore('materials', []);
