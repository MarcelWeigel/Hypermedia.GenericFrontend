<template lang="html">
  <v-container>
    <v-card>
      <v-card-title class="accent">Raw Hypermeida Object</v-card-title>

      <v-card-text class="text--primary mt-4">
        <vue-json-pretty :data="rawObject" showLine showLength :deep="2" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

@Component({
  components: { VueJsonPretty },
})
export default class RawObjectView extends Vue {
  @Prop({ required: true })
  public rawObject!: any;
}
</script>

<style module lang="scss"></style>
