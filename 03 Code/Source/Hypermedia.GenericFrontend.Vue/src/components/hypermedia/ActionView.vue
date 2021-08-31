<template lang="html">
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row>
        <v-col cols="1" class="pa-0 pl-2">
          <v-icon>{{ mdiFormatTextVariant }}</v-icon>
        </v-col>
        <v-col class="pa-0 pt-1">
          {{ action.name }}
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row>
        <v-col>
          <v-btn class="mr-4" @click="execute" v-if="isExecuteButtonShown(actionModule)">
            Execute
          </v-btn>
        </v-col>
        <v-col>
          <p v-if="isOkMessageShown(actionModule)" class="green--text">
            <v-icon color="green">{{ mdiCheck }}</v-icon>
            Action was sucessfull
          </p>
          <p v-if="isErrorMessageShown(actionModule)" class="red--text">
            <v-icon color="red">{{ mdiAlertCircle }}</v-icon>
            <b>Error</b> {{ getStatusMessage(actionModule) }}
          </p>
        </v-col>
      </v-row>

      <v-row v-if="actionModule && actionModule.isExecutingAction">
        <v-col>
          <p class="search-result-title">
            <v-icon>{{ mdiInformation }}</v-icon>
            Executing action ...
          </p>
          <div class="text-center ma-12">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Call, Sync } from 'vuex-pathify';

import Dictionary from '@/utils/dictionary';
import HypermediaAction from '@/domain/hypermedia/hypermediaAction';
import { ActionModule } from '@/store/modules/application/types';
import ExecuteActionParameter from '@/store/modules/application/types/executeActionParameter';
import Guid from '@/utils/guid';
import { mdiCheck, mdiFormatTextVariant, mdiInformation } from '@mdi/js';
import ResultType from '@/domain/hypermedia/results/resultType';

@Component({
  components: {},
})
export default class ActionView extends Vue {
  public id: string = Guid.newGuid();

  @Prop({ required: true, type: HypermediaAction })
  public action!: HypermediaAction;

  @Sync('application/actionModules')
  private actionModules!: Dictionary<ActionModule>;

  @Prop({ required: true, type: Function })
  private executeAction!: (parameters: ExecuteActionParameter) => Promise<void>;

  public isOkMessageShown(actionModule: ActionModule) {
    return actionModule?.actionResult?.resultType === ResultType.Siren;
  }

  public isErrorMessageShown(actionModule: ActionModule) {
    return actionModule?.actionResult?.resultType === ResultType.Error;
  }

  public isExecuteButtonShown(actionModule: ActionModule) {
    return !actionModule || !actionModule?.isExecutingAction;
  }

  public get actionModule() {
    return this.actionModules[this.id];
  }

  public getStatusMessage(actionModule: ActionModule) {
    return actionModule?.actionResult?.errorResult?.content;
  }

  public execute() {
    this.executeAction(new ExecuteActionParameter(this.id, this.action));
  }

  public data() {
    return { mdiInformation, mdiFormatTextVariant, mdiCheck };
  }
}
</script>

<style module lang="scss"></style>
