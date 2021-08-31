<template lang="html">
  <v-container v-if="hypermediaObject">
    <v-card>
      <v-card-title class="accent">
        {{ hypermediaObject.classes.join(' / ') }}
      </v-card-title>
      <v-card-subtitle class="accent">
        {{ hypermediaObject.title }}
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <property-grid :properties="hypermediaObject.properties" />

        <link-list-view
          :links="hypermediaObject.links"
          v-if="hypermediaObject.links.length !== 0"
          :navigate-to-url="navigateToUrl"
          :execute-action="executeAction"
        />

        <action-list-view
          :actions="hypermediaObject.actions"
          :actions-with-parameters="hypermediaObject.actionsWithParameters"
          :classes="hypermediaObject.classes"
          :navigate-to-url="navigateToUrl"
          :execute-action="executeAction"
        />

        <embedded-list-view
          :embedded-hypermedia-objects="hypermediaObject.embeddedObjects"
          :embedded-hypermedia-links="hypermediaObject.embeddedLinks"
          :navigate-to-url="navigateToUrl"
          :execute-action="executeAction"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Vuetify from 'vuetify';
import { Component, Prop } from 'vue-property-decorator';
import { mdiInformation } from '@mdi/js';
import HypermediaObject from '@/domain/hypermedia/hypermediaObject';
import PropertyGrid from '@/components/hypermedia/PropertyGrid.vue';
import ActionWithParametersView from '@/components/hypermedia/ActionWithParametersView.vue';
import ActionView from '@/components/hypermedia/ActionView.vue';
import ActionListView from '@/components/hypermedia/ActionListView.vue';
import LinkListView from '@/components/hypermedia/LinkListView.vue';
import EmbeddedListView from '@/components/hypermedia/EmbeddedListView.vue';
import ExecuteActionParameter from '@/store/modules/application/types/executeActionParameter';

Vue.use(Vuetify);

@Component({
  components: {
    EmbeddedListView,
    ActionListView,
    ActionView,
    ActionWithParametersView,
    LinkListView,
    PropertyGrid,
  },
})
export default class HypermediaObjectViewWrapped extends Vue {
  @Prop({ required: true, type: String })
  public hypermediaObjectJson!: string;

  // @Prop({})
  // public hypermediaObject!: HypermediaObject;

  public get hypermediaObject(): HypermediaObject {
    return JSON.parse(this.hypermediaObjectJson);
  }

  @Prop({ required: true, type: Function })
  public navigateToUrl!: (url: string) => Promise<void>;

  @Prop({ required: true, type: Function })
  private executeAction!: (parameters: ExecuteActionParameter) => Promise<void>;

  public data() {
    return { mdiInformation };
  }
}
</script>

<style module lang="scss"></style>
