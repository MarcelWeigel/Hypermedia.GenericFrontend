<template lang="html">
  <v-expansion-panel>
    <v-expansion-panel-header class="header-container">
      <v-row justify="center" align="center">
        <v-col cols="auto" class="pa-0" style="width: 4rem">
          <v-icon class="ml-3">{{ mdiLinkVariant }}</v-icon>
        </v-col>
        <v-col class="pa-0">
          <v-row>
            <v-col class="pa-0">
              <span class="panel-header">{{ hypermediaLink.classes.join(' ') }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pa-0">
              <span class="panel-subheader">Relation: {{ hypermediaLink.relations.join(' ') }}</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <link-button :url="hypermediaLink.hyperlink" @click="navigateToUrl" />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { mdiLinkVariant } from '@mdi/js';
import PropertyGrid from '@/components/hypermedia/PropertyGrid.vue';
import ActionListView from '@/components/hypermedia/ActionListView.vue';
import LinkListView from '@/components/hypermedia/LinkListView.vue';
import EmbeddedHypermediaLink from '../../domain/hypermedia/embeddedHypermediaLink';
import LinkButton from '../basic/LinkButton.vue';
import { Call } from 'vuex-pathify';

@Component({
  components: { LinkButton, ActionListView, LinkListView, PropertyGrid },
})
export default class EmbeddedLinkView extends Vue {
  @Prop({ required: true, type: EmbeddedHypermediaLink })
  public hypermediaLink!: EmbeddedHypermediaLink;

  @Prop({ required: true, type: Function })
  public navigateToUrl!: (url: string) => Promise<void>;

  public data() {
    return { mdiLinkVariant };
  }
}
</script>

<style module lang="scss"></style>
