<template lang="html">
  <v-expansion-panel>
    <v-expansion-panel-header class="header-container">
      <v-row justify="center" align="center">
        <v-col cols="auto" class="pa-0" style="width: 4rem">
          <v-icon class="ml-3">{{ mdiBuffer }}</v-icon>
        </v-col>
        <v-col class="pa-0">
          <v-row>
            <v-col class="pa-0">
              <span class="panel-header">{{ hypermediaObject.classes.join(' ') }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pa-0">
              <span class="panel-subheader">Relation: {{ hypermediaObject.relations.join(' ') }}</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <object-view-content
        :hypermedia-object="hypermediaObject"
        :navigate-to-url="navigateToUrl"
        :execute-action="executeAction"
      />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { mdiBuffer } from '@mdi/js';
import PropertyGrid from '@/components/hypermedia/PropertyGrid.vue';
import ActionListView from '@/components/hypermedia/ActionListView.vue';
import LinkListView from '@/components/hypermedia/LinkListView.vue';
import EmbeddedHypermediaObject from '@/domain/hypermedia/embeddedHypermediaObject';
import EmbeddedListView from '@/components/hypermedia/EmbeddedListView.vue';
import ObjectViewContent from '@/components/hypermedia/ObjectViewContent.vue';
import ExecuteActionParameter from '@/store/modules/application/types/executeActionParameter';

Vue.component('embedded-list-view', EmbeddedListView);

@Component({
  components: { ObjectViewContent, EmbeddedListView, ActionListView, LinkListView, PropertyGrid },
})
export default class EmbeddedObjectView extends Vue {
  @Prop({ required: true, type: EmbeddedHypermediaObject })
  public hypermediaObject!: EmbeddedHypermediaObject;

  @Prop({ required: true, type: Function })
  public navigateToUrl!: (url: string) => Promise<void>;

  @Prop({ required: true, type: Function })
  private executeAction!: (parameters: ExecuteActionParameter) => Promise<void>;

  public data() {
    return { mdiBuffer };
  }
}
</script>

<style module lang="scss"></style>
