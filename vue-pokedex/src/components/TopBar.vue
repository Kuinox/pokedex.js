<template>
    <header class="topBar center lightPadding strongBackground">
        Kuinox's pokedex
        <form>
            <input type="text" placeholder="Search..." @input="searchCallback($event.target.value)" />
        </form>
    </header>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class TopBar extends Vue {
    @Prop({required: true})
    public readonly searchCallback!: (searchText: any) => void;
}
</script>
<style lang="scss">
.topBar {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    max-height: 10vh;
    min-height: 4vh;
    height: 35px;
    display: flex;
}

.strongBackground {
    background-color: #9083a3;
}

.center {
    align-items: center;
}

.lightPadding {
    padding: 5px 5px 5px 5px;
}
</style>