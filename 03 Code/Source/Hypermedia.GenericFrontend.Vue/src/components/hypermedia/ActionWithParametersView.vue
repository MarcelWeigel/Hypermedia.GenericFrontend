import {ResultType} from "@/domain/hypermedia/hypermediaActionResult";
<template lang="html">
  <v-expansion-panel @click="onItemClick()">
    <v-expansion-panel-header>
      <v-row>
        <v-col cols="1" class="pa-0 pl-2">
          <v-icon>{{ mdiFormatTextRotationNone }}</v-icon>
        </v-col>
        <v-col class="pa-0 pt-1">
          {{ action.name }}
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form v-model="formValid" v-if="isFormShown(schemaModule, actionModule)">
        <v-jsonschema-form
          :schema="schemaModule.schema"
          :model="dataObject"
          :options="options"
          :key="getKey()"
          @error="showError"
          @change="showChange"
          @input="showInput"
        />
        <v-row>
          <v-col><v-btn class="mr-4" @click="execute" :disabled="!formValid">Execute</v-btn></v-col>
          <v-col>
            <p v-if="isOkMessageShown(actionModule)" class="green--text">
              <v-icon color="green">{{ mdiCheck }}</v-icon>
              Action was sucessfull
              <v-btn class="ma-2" @click="navigateToResult(actionModule)" v-if="hasActionResultLocation(actionModule)">
                {{ getButtonLabel(actionModule.actionResult.location) }}
              </v-btn>
            </p>
            <p v-if="isErrorMessageShown(actionModule)" class="red--text">
              <v-icon color="red">{{ mdiAlertCircle }}</v-icon>
              <b>Error</b> {{ getStatusMessage(actionModule) }}
            </p>
          </v-col>
        </v-row>
      </v-form>

      <v-row v-if="schemaModule && schemaModule.isLoadingSchema">
        <v-col>
          <p class="search-result-title">
            <v-icon>{{ mdiInformation }}</v-icon>
            Loading schema ...
          </p>
          <div class="text-center ma-12">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
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
import HypermediaActionWithParameters from '@/domain/hypermedia/hypermediaActionWithParameters';

import Vuetify from 'vuetify';
import Draggable from 'vuedraggable';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Swatches from 'vue-swatches';
import 'vue-swatches/dist/vue-swatches.css';
import VJsonschemaForm from '@koumoul/vuetify-jsonschema-form';
import '@koumoul/vuetify-jsonschema-form/dist/main.css';
import { Sketch } from 'vue-color';
import Dictionary from '@/utils/dictionary';
// prettier-ignore
import ExecuteActionWithParParameter from '@/store/modules/application/types/executeActionWithParParameter';
import { ActionModule, SchemaModule } from '@/store/modules/application/types';
import { mdiAlertCircle, mdiCheck, mdiFormatTextRotationNone, mdiInformation } from '@mdi/js';
import Guid from '@/utils/guid';
import LoadSchemaParameter from '@/store/modules/application/types/loadSchemaParameter';
import { getUrlShortName } from '@/utils/getUrlShortName';
import ResultType from '@/domain/hypermedia/results/resultType';

Vue.use(Vuetify);
Vue.use(VueAxios, axios);

Vue.component('swatches', Swatches);
Vue.component('draggable', Draggable);
Vue.component('color-picker', Sketch);

@Component({
  components: {
    VJsonschemaForm,
  },
})
export default class ActionWithParameterView extends Vue {
  public dataObject: any = {};
  public options: any = {
    debug: false,
    disableAll: false,
    autoFoldObjects: true,
  };
  public formValid = false;
  public id: string = Guid.newGuid();

  @Prop({ required: true, type: HypermediaActionWithParameters })
  public action!: HypermediaActionWithParameters;

  @Prop({ required: true, type: Array })
  public classes!: string[];

  @Sync('application/actionModules')
  private actionModules!: Dictionary<ActionModule>;

  @Sync('application/schemaModules')
  private schemaModules!: Dictionary<SchemaModule>;

  @Call('application/loadFormSchema')
  private loadFormSchema!: (parameter: LoadSchemaParameter) => Promise<void>;

  @Call('application/executeActionWithParameters')
  private executeActionWithParameters!: (actionWithParameter: ExecuteActionWithParParameter) => Promise<void>;

  @Call('application/navigateToUrl')
  private navigateToUrl!: (schemaUrl: string) => Promise<void>;

  public mounted() {
    if (this.action?.parameter.prefilledValue) {
      this.dataObject = this.action?.parameter.prefilledValue;
    }
  }

  public getKey(): string {
    return this.dataObject?.toString();
  }

  public get actionModule() {
    return this.actionModules[this.id];
  }

  public get schemaModule() {
    return this.schemaModules[this.action.parameter.schemaUrl];
  }

  public isFormShown(schemaModule: SchemaModule, actionModule: ActionModule) {
    return (schemaModule && schemaModule.isSchemaLoaded) || (actionModule && !actionModule.isExecutingAction);
  }

  public isOkMessageShown(actionModule: ActionModule) {
    return actionModule?.actionResult?.resultType === ResultType.Siren;
  }

  public isErrorMessageShown(actionModule: ActionModule) {
    return actionModule?.actionResult?.resultType === ResultType.Error;
  }

  public hasActionResultLocation(actionModule: ActionModule) {
    return !!actionModule.actionResult?.location;
  }

  public navigateToResult(actionModule: ActionModule) {
    if (actionModule.actionResult?.location) {
      this.navigateToUrl(actionModule.actionResult?.location);
    }
  }

  public showError(err: string) {
    window.alert(err);
  }

  public showChange(e: any) {
    // console.log('"change" event', e);
  }

  public showInput(e: any) {
    // console.log('"input" event', e);
  }

  public getStatusMessage(actionModule: ActionModule) {
    return actionModule?.actionResult?.errorResult?.content;
  }

  public getButtonLabel(location: string) {
    return getUrlShortName(location);
  }

  public onItemClick() {
    this.loadFormSchema(new LoadSchemaParameter(this.classes, this.action.parameter.schemaUrl));
  }

  public execute() {
    this.executeActionWithParameters(new ExecuteActionWithParParameter(this.id, this.action, this.dataObject));
  }

  public data() {
    return { mdiInformation, mdiCheck, mdiAlertCircle, mdiFormatTextRotationNone };
  }
}
</script>

<style module lang="scss"></style>
