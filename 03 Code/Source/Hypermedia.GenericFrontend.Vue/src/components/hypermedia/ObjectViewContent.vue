<template lang="html">
  <!--  <v-container v-if="hypermediaObject.classes[0] === 'Image' && useWebComponents">-->
  <!--    <div class="text-center">-->
  <!--      <v-dialog v-model="dialog" width="1200" height="800">-->
  <!--        <template v-slot:activator="{ on }">-->
  <!--          <v-img-->
  <!--            :src="hypermediaObject.properties[0].value"-->
  <!--            alt="Preview"-->
  <!--            v-on="on"-->
  <!--            height="200"-->
  <!--            contain-->
  <!--            class="ma-5"-->
  <!--            style="cursor: pointer"-->
  <!--          ></v-img>-->
  <!--        </template>-->
  <!--        <v-card>-->
  <!--          <v-card-title class="headline grey lighten-2" primary-title>-->
  <!--            Image-->
  <!--          </v-card-title>-->
  <!--          <v-card-text>-->
  <!--            <v-img :src="hypermediaObject.properties[1].value" alt="Full" height="800" contain></v-img>-->
  <!--          </v-card-text>-->
  <!--        </v-card>-->
  <!--      </v-dialog>-->
  <!--    </div>-->
  <!--  </v-container>-->
  <!--  <v-container v-else>-->
  <div v-if="hypermediaObject.classes[0] === 'Image' && useWebComponents"></div>
  <v-container v-else>
    <property-grid :properties="hypermediaObject.properties" />

    <link-list-view
      :links="hypermediaObject.links"
      :navigate-to-url="navigateToUrl"
      v-if="hypermediaObject.links.length !== 0"
    />

    <action-list-view
      :actions="hypermediaObject.actions"
      :actions-with-parameters="hypermediaObject.actionsWithParameters"
      :classes="hypermediaObject.classes"
      :execute-action="executeAction"
    />

    <embedded-list-view
      :embedded-hypermedia-objects="hypermediaObject.embeddedObjects"
      :embedded-hypermedia-links="hypermediaObject.embeddedLinks"
      :navigate-to-url="navigateToUrl"
      :execute-action="executeAction"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import EmbeddedListView from '@/components/hypermedia/EmbeddedListView.vue';
import ActionListView from '@/components/hypermedia/ActionListView.vue';
import LinkListView from '@/components/hypermedia/LinkListView.vue';
import PropertyGrid from '@/components/hypermedia/PropertyGrid.vue';
import { Call, Sync } from 'vuex-pathify';
import HypermediaObject from '@/domain/hypermedia/hypermediaObject';
import ExecuteActionParameter from '@/store/modules/application/types/executeActionParameter';

@Component({
  components: { EmbeddedListView, ActionListView, LinkListView, PropertyGrid },
})
export default class ObjectViewContent extends Vue {
  public dialog = false;

  @Prop({ required: true, type: HypermediaObject })
  public hypermediaObject!: HypermediaObject;

  @Prop({ required: true, type: Function })
  public navigateToUrl!: (url: string) => Promise<void>;

  @Prop({ required: true, type: Function })
  private executeAction!: (parameters: ExecuteActionParameter) => Promise<void>;

  @Sync('settings/useWebComponents')
  private useWebComponents!: boolean;

  created(): void {
    // console.log('hypermediaObject created');
    if (this.useWebComponents && this.hypermediaObject && this.hypermediaObject?.classes[0] === 'Image') {
      this.addViaElement();
    }
  }

  updated(): void {
    // if (this.hypermediaObject && this.hypermediaObject?.classes[0] === 'Image') {
    //   this.addViaElement();
    // }
  }

  addViaElement() {
    console.log('hypermediaObject created');
    const script = document.createElement('script');
    script.src = 'http://localhost:4200/assets/image-viewer.js';
    script.async = true;

    script.onload = () => {
      const element = document.createElement('image-viewer') as any;
      this.$el.appendChild(element);
      element.hypermediaObject = this.hypermediaObject;
      element.navigateToUrl = this.navigateToUrl;
    };
    document.body.appendChild(script);
  }

  addViaIfrmae() {
    const iframe = document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.onload = () => {
      const document = iframe.contentDocument;
      if (document) {
        this.updateLoop(iframe);
        const script = document.createElement('script');
        script.src = 'http://localhost:4200/assets/image-viewer.js';
        script.async = true;

        script.onload = () => {
          const element = document.createElement('image-viewer') as any;
          document.body.appendChild(element);
          element.hypermediaObject = this.hypermediaObject;
        };
        document.body.appendChild(script);
      }
    };

    this.$el.appendChild(iframe);
  }

  updateLoop(iframe: HTMLIFrameElement) {
    const document = iframe.contentDocument;
    if (document) {
      setTimeout(() => {
        iframe.style.height = document.body.offsetHeight + 'px';
        this.updateLoop(iframe);
      }, 100);
    }
  }
}
</script>

<style module lang="scss"></style>
