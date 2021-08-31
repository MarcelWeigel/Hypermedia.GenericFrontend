<template lang="html">
  <v-container class="pa-0">
    <template>
      <v-treeview :items="properties" :open-on-click="false" :dense="true" class="pa-0">
        <template v-slot:label="{ item, leaf, open }">
          <v-row v-if="leaf">
            <v-col cols="auto">{{ item.name }}</v-col>
            <v-col>
              <span :class="$style.value">
                {{ formatValue(item.value, item.type) }}
              </span>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="1">
              <v-icon>
                {{ open ? 'mdi-animation' : 'mdi-animation-outline' }}
              </v-icon>
            </v-col>
            <v-col cols="11">{{ item.name }}</v-col>
          </v-row>
        </template>
      </v-treeview>
    </template>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ValuePropertyInfo, { PropertyType } from '@/domain/hypermedia/valuePropertyInfo';
import ObjectPropertyInfo from '@/domain/hypermedia/objectPropertyInfo';

@Component({
  components: { PropertyGrid },
  name: 'PropertyGrid',
})
export default class PropertyGrid extends Vue {
  @Prop({ required: true, type: Array })
  public properties!: (ObjectPropertyInfo | ValuePropertyInfo)[];

  public formatValue(value: any, type: PropertyType): string {
    switch (type) {
      case PropertyType.string:
        return `"${value}"`;
      case PropertyType.number:
        return value;
      case PropertyType.array:
        return value.join(', ');
      case PropertyType.nullvalue:
        return 'null';
      case PropertyType.boolean:
        return value ? 'true' : 'false';
      case PropertyType.object:
        return value ? value : 'null';
    }
    return '';
  }
}
</script>

<style module lang="scss">
.value {
  white-space: normal !important;
  font-weight: bold;
}
</style>
