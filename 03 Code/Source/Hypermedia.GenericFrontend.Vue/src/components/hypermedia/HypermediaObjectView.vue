<template lang="html">
  <v-container v-if="hypermediaObject">
    <v-card>
      <v-card-title class="accent">
        {{ hypermediaObject.title }}
      </v-card-title>
      <v-card-subtitle class="accent">
        {{ hypermediaObject.classes.join(' / ') }}
      </v-card-subtitle>
      <v-card-text class="text--primary">
        <object-view-content
          :hypermedia-object="hypermediaObject"
          :navigate-to-url="navigateToUrl"
          :execute-action="executeAction"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import HypermediaObject from '@/domain/hypermedia/hypermediaObject';
import PropertyGrid from '@/components/hypermedia/PropertyGrid.vue';
import ActionWithParametersView from '@/components/hypermedia/ActionWithParametersView.vue';
import ActionView from '@/components/hypermedia/ActionView.vue';
import ActionListView from '@/components/hypermedia/ActionListView.vue';
import LinkListView from '@/components/hypermedia/LinkListView.vue';
import EmbeddedListView from '@/components/hypermedia/EmbeddedListView.vue';
import ObjectViewContent from '@/components/hypermedia/ObjectViewContent.vue';
import ExecuteActionParameter from '@/store/modules/application/types/executeActionParameter';

Vue.component('embedded-list-view', EmbeddedListView);

@Component({
  components: {
    ObjectViewContent,
    EmbeddedListView,
    ActionListView,
    ActionView,
    ActionWithParametersView,
    LinkListView,
    PropertyGrid,
  },
})
export default class HypermediaObjectView extends Vue {
  @Prop({ required: true, type: HypermediaObject })
  public hypermediaObject!: HypermediaObject;

  @Prop({ required: true, type: Function })
  public navigateToUrl!: (url: string) => Promise<void>;

  @Prop({ required: true, type: Function })
  private executeAction!: (parameters: ExecuteActionParameter) => Promise<void>;
}
</script>

<style module lang="scss"></style>
