<template lang="html">
  <v-container fluid fill-height class="overflow-y-auto">
    <v-container fill-height>
      <settings-form />
    </v-container>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import SettingsForm from '@/components/settings/SettingsForm.vue';

@Component({
  components: { SettingsForm },
})
export default class SettingsView extends Vue {}
</script>

<style lang="scss"></style>
