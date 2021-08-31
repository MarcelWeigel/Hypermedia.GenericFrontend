<template lang="html">
    <v-container fluid fill-height ma-0 pa-0>
        <img :src="`${publicPath}img/background/space.jpg`" width="100%" height="100%" class="background-image" alt=""/>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class BackgroundView extends Vue {
        public get publicPath() {
            return process.env.BASE_URL;
        }
    }
</script>

<style module lang="scss"></style>
