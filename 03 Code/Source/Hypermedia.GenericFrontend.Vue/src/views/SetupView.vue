<template lang="html">
  <v-container fluid fill-height class="overflow-y-auto wrapper-container">
    <v-container class="main-container">
      <v-container fluid fill-height ma-0 pa-0 v-if="!isIntroduced">
        <transition name="fade"><setup-form v-if="showForm"/></transition>
      </v-container>
      <setup-form v-else />
    </v-container>

    <v-container fluid fill-height ma-0 pa-0 v-if="!isIntroduced">
      <transition name="fade"><background-view v-if="showBackground"/></transition>
    </v-container>
    <background-view v-else />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Call, Sync } from 'vuex-pathify';
import HypermediaObjectView from '@/components/hypermedia/HypermediaObjectView.vue';
import LinkHistoryView from '@/components/history/LinkHistoryView.vue';
import RawObjectView from '@/components/hypermedia/RawObjectView.vue';
import SetupForm from '@/components/setup/SetupForm.vue';
import BackgroundView from '@/components/setup/BackgroundView.vue';

@Component({
  components: { BackgroundView, SetupForm, RawObjectView, LinkHistoryView, HypermediaObjectView },
})
export default class SetupView extends Vue {
  @Sync('setup/showBackground')
  private showBackground!: boolean;

  @Sync('setup/showForm')
  private showForm!: boolean;

  @Sync('setup/isIntroduced')
  private isIntroduced!: boolean;

  @Call('application/navigateToUrl')
  private navigateToUrl!: (schemaUrl: string) => Promise<void>;

  @Call('setup/introduceUser')
  private introduceUser!: () => Promise<void>;

  @Call('setup/updateIntroduce')
  private updateIntroduce!: () => Promise<void>;

  public created() {
    this.updateIntroduce();
  }

  public mounted() {
    this.introduceUser();
  }
}
</script>

<style lang="scss">
.wrapper-container {
  position: relative;
  align-items: flex-end !important;
  background-color: black;
  padding: 0;
}

.main-container {
  position: absolute;
  top: 50%;
  left: 50%;
  align-items: center;
  align-content: start;
  max-width: 50rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
