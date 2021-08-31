<template lang="html">
  <v-btn class="ma-2 pa-2" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <v-tooltip v-if="url" :bottom="true">
      <template v-slot:activator="{ on }">
        <span class="pa-2" v-on="on">
          <v-icon v-if="!isHovered">{{ mdiLinkVariant }}</v-icon>
          <v-icon v-if="isHovered" @click="onClickOnCopyToClipboard(url)">
            {{ mdiClipboardOutline }}
          </v-icon>
        </span>
      </template>
      <span>
        Copy <b>{{ url }}</b> to clipboard
      </span>
    </v-tooltip>

    <v-tooltip v-if="url" :bottom="true">
      <template v-slot:activator="{ on }">
        <span class="pa-2" v-on="on" @click="navigateToUrl(url)"> {{ getButtonLabel(url) }}</span>
      </template>
      <span>
        Go to <b>{{ url }}</b>
      </span>
    </v-tooltip>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { mdiClipboard, mdiClipboardOutline, mdiLinkVariant } from '@mdi/js';
import { getUrlShortName } from '@/utils/getUrlShortName';
import Guid from '@/utils/guid';
import CopyToClipboardHelper from '@/utils/copyToClipboardHelper';

@Component({
  components: {},
})
export default class LinkButton extends Vue {
  public isHovered = false;

  @Prop({ required: true, type: String })
  public url!: string;

  @Prop({ type: String })
  public label!: string;

  public navigateToUrl() {
    this.$emit('click', this.url);
  }

  public data() {
    return { mdiLinkVariant, mdiClipboardOutline };
  }

  public getButtonLabel(hyperlink: string) {
    let name = this.label ? this.label : getUrlShortName(hyperlink);
    if (Guid.isGuid(name)) {
      const subLink = hyperlink.replace('/' + name, '');
      name = getUrlShortName(subLink);
    }
    return name.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  public onClickOnCopyToClipboard(url: string) {
    CopyToClipboardHelper.copy(url);
  }
}
</script>

<style module lang="scss"></style>
