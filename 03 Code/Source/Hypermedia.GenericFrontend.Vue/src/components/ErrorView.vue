<template>
  <v-container fill-height>
    <v-row justify-center fill-height>
      <v-card dark width="100%" class="text-xs-center pa-7">
        <v-card-title class="display-2 text-xs-center" style="display: block;">
          Error [{{ $route.params.message }}]
        </v-card-title>
        <v-card-text class="title" v-if="$route && $route.params.message === 'not-allowed'">
          You are not allowed to access this page
        </v-card-text>
        <v-card-text class="title" v-if="$route && $route.params.message === 'no-config'">
          Could not load config. Please create in the application root folder a 'config.js' file. You can find a
          template named 'config.js.template'.
        </v-card-text>
        <v-card-actions class="text-xs-center" v-if="$route && $route.params.path">
          <v-row column align-center>
            <v-btn class="headline" :to="$route && $route.params.path && decodeURIComponent($route.params.path)">
              Retry
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Error extends Vue {}
</script>
