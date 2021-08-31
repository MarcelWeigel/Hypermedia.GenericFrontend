<template lang="html">
  <v-container fluid class="pa-0">
    <link-button
      v-for="link in links"
      :key="link.hyperlink"
      :url="link.hyperlink"
      @click="navigateToUrl"
      :label="link.relations[0]"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import HypermediaLink from '../../domain/hypermedia/hypermediaLink';
import { Call } from 'vuex-pathify';
import LinkButton from '@/components/basic/LinkButton.vue';

@Component({
  components: { LinkButton },
})
export default class LinkListView extends Vue {
  @Prop({ required: true, type: Array })
  public links!: HypermediaLink[];

  @Prop({ required: true, type: Function })
  public navigateToUrl!: (url: string) => Promise<void>;
}
</script>

<style module lang="scss"></style>
