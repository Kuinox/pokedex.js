<template>
    <div id="app">
        <TopBar v-bind:searchCallback="textInput" />
        <PokemonList :searchText="searchText" />
    </div>
</template>

<script lang="ts">
import TopBar from "./components/TopBar.vue";
import PokemonList from "./components/PokemonList.vue";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    components: {
        TopBar,
        PokemonList
    }
})
export default class App extends Vue {
    private searchText: string = "";
    textInput(search: string) {
        this.searchText = search;
    }
}
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
}
body {
    width: 100%;
    height: 100%;
    margin: 0 0 0 0;
}
</style>
