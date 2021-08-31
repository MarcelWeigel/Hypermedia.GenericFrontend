<template lang="html">
  <v-container v-if="linkHistory" class="pa-0 pl-4 pr-4">
    <v-row>
      <v-col class="pa-0">
        <link-button
          v-for="hyperlink in linkHistory.hyperlinks"
          :key="hyperlink"
          :url="hyperlink"
          @click="navigateToUrl"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Call } from 'vuex-pathify';
import LinkHistory from '@/domain/history/linkHistory';
import LinkButton from '@/components/basic/LinkButton.vue';

@Component({
  components: { LinkButton },
})
export default class LinkHistoryView extends Vue {
  @Prop({ required: true, type: LinkHistory })
  public linkHistory!: LinkHistory;

  @Call('application/navigateToUrl')
  private navigateToUrl!: (url: string) => Promise<void>;
}
</script>

<style module lang="scss"></style>
