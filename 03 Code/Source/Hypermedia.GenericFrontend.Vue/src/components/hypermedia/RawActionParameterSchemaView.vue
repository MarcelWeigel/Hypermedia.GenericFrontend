<template lang="html">
  <v-container>
    <v-card>
      <v-card-title class="accent">Raw Action Parameter Schema</v-card-title>

      <v-card-text class="text--primary mt-4">
        <v-expansion-panels :multiple="true" :hover="true">
          <v-expansion-panel v-for="schemaModule in relevantSchemaModules" :key="schemaModule.schemaUrl">
            <v-expansion-panel-header>
              {{ getLabel(schemaModule.schemaUrl) }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <vue-json-pretty :data="schemaModule.schema" showLine showLength :deep="2" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import Dictionary from '@/utils/dictionary';
import { SchemaModule } from '@/store/modules/application/types';
import { getUrlShortName } from '@/utils/getUrlShortName';

@Component({
  components: { VueJsonPretty },
})
export default class RawActionParameterSchemaView extends Vue {
  @Prop({ required: true, type: Array })
  public classes!: string[];

  @Prop({ required: true })
  public schemaModules!: Dictionary<SchemaModule>;

  public getLabel(schemaUrl: string) {
    return getUrlShortName(schemaUrl);
  }

  public get relevantSchemaModules(): SchemaModule[] {
    return Object.keys(this.schemaModules)
      .map((k) => this.schemaModules[k])
      .filter((s) => s.classes?.some((r) => this.classes.includes(r)));
  }
}
</script>

<style module lang="scss"></style>
