<template>
  <div>
    <button class="pokemonButton">
      <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + this.pokemonId + '.png'" />
      {{this.pokemonName}}
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { getPokemonStore, PokemonStore, PokemonName } from "kuinox-pokedex-backend";

@Component
export default class PokemonInfoComponent extends Vue {
    @Prop({ required: true })
    pokemonName!: string;
    
    @Prop({ required: true })
    pokemonId!: number;
    pokemonStore: PokemonStore = getPokemonStore();
}
</script>

<style>
.pokemonButton{
  display: flex;
  flex-direction: column;
}
</style>