<template lang="html">
  <v-container ma-0 pa-0 mb-4>
    <v-expansion-panels :multiple="true" :hover="true" :focusable="true">
      <embedded-object-view
        v-for="(object, i) in embeddedHypermediaObjects"
        :key="'EmbeddedObject_' + i"
        :hypermedia-object="object"
        :navigate-to-url="navigateToUrl"
        :execute-action="executeAction"
      />
      <embedded-link-view
        v-for="(link, i) in embeddedHypermediaLinks"
        :key="'EmbeddedLink_' + i"
        :hypermedia-link="link"
        :navigate-to-url="navigateToUrl"
      />
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import EmbeddedHypermediaObject from '../../domain/hypermedia/embeddedHypermediaObject';
import EmbeddedObjectView from '@/components/hypermedia/EmbeddedObjectView.vue';
import { mdiBuffer } from '@mdi/js';
import EmbeddedLinkView from '@/components/hypermedia/EmbeddedLinkView.vue';
import EmbeddedHypermediaLink from '@/domain/hypermedia/embeddedHypermediaLink';
import ExecuteActionParameter from '@/store/modules/application/types/executeActionParameter';

@Component({
  components: { EmbeddedLinkView, EmbeddedObjectView },
})
export default class EmbeddedListView extends Vue {
  @Prop({ required: true, type: Array })
  public embeddedHypermediaObjects!: EmbeddedHypermediaObject[];

  @Prop({ required: true, type: Array })
  public embeddedHypermediaLinks!: EmbeddedHypermediaLink[];

  @Prop({ required: true, type: Function })
  public navigateToUrl!: (url: string) => Promise<void>;

  @Prop({ required: true, type: Function })
  private executeAction!: (parameters: ExecuteActionParameter) => Promise<void>;

  public data() {
    return { mdiBuffer };
  }
}
</script>

<style module lang="scss">
.header-container {
  padding: 8px 16px;
}
.panel-header {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  word-break: break-all;
}
.panel-subheader {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem;
  letter-spacing: 0.0071428571em;
}
</style>
