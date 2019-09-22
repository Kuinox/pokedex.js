<template>
    <div class="pokemonList">
        <div v-for="pokemon in getFilteredList()" :key="pokemon.id">
            <PokemonInfoComponent v-bind:pokemonName="pokemon.name" :pokemonId="pokemon.id" />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { getPokemonStore, PokemonStore, PokemonName } from "kuinox-pokedex-backend";
import PokemonInfoComponent from "./PokemonInfoComponent.vue";
@Component({
    components: {
        PokemonInfoComponent
    }
})
export default class PokemonList extends Vue {
    @Prop({ required: true })
    searchText!: string;
    pokemonStore: PokemonStore = getPokemonStore();
    pokemons: PokemonName[];
    constructor() {
        super();
        this.pokemons = this.pokemonStore.getPokemonsWithId();
    }

    private getFilteredList() {
        return this.pokemons.filter((p) => p.name.match(new RegExp(".*" + this.searchText + ".*")));
    }
}
</script>

<style>
.pokemonList {
    display: flex;
    flex-direction: row;
    width: 100%;
}
</style>