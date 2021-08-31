<template lang="html">
    <v-container ma-0 pa-0 mb-4>
        <v-expansion-panels :multiple="true" :hover="true">
            <action-view v-for="action in actions" :key="action.hyperlink" :action="action"
                         :execute-action="executeAction"/>

            <action-with-parameters-view
                    v-for="action in actionsWithParameters"
                    :key="action.hyperlink"
                    :action="action"
                    :classes="classes"
            />
        </v-expansion-panels>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    import HypermediaActionWithParameters from '@/domain/hypermedia/hypermediaActionWithParameters';

    import HypermediaAction from '@/domain/hypermedia/hypermediaAction';
    import Guid from '@/utils/guid';
    import ActionWithParametersView from './ActionWithParametersView.vue';
    import ActionView from '@/components/hypermedia/ActionView.vue';
    import ExecuteActionParameter from '@/store/modules/application/types/executeActionParameter';

    @Component({
        components: {ActionView, ActionWithParametersView},
    })
    export default class ActionListView extends Vue {
        public id: string = Guid.newGuid();

        @Prop({required: true, type: Array})
        public classes!: string[];

        @Prop({required: true, type: Array})
        public actions!: HypermediaAction[];

        @Prop({required: true, type: Array})
        public actionsWithParameters!: HypermediaActionWithParameters[];

        @Prop({required: true, type: Function})
        private executeAction!: (parameters: ExecuteActionParameter) => Promise<void>;
    }
</script>

<style module lang="scss"></style>
