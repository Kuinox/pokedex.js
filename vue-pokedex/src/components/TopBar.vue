<template>
    <el-header class="header">
        <el-menu>
            
        </el-menu>
    </el-header>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ElementUI from "element-ui";

@Component
export default class TopBar extends Vue {}
</script>
<style lang="scss">
@import "@/element-variables.scss";
.header {
    background-color: $--color-primary;
}
</style>