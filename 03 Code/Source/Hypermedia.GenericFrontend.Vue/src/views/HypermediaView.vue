<template lang="html">
    <v-container fluid fill-height class="overflow-y-auto">
        <v-container fill-height v-if="apiUrl !== ''">
            <v-row no-gutters style="height:4rem">
                <v-col>
                    <link-history-view :link-history="history"/>
                </v-col>
            </v-row>
            <v-row no-gutters style="height: 100%">
                <v-col id="hov">
                    <hypermedia-object-view
                            v-if="hypermediaObject"
                            :hypermedia-object="hypermediaObject"
                            :key="hypermediaObject.classes[0]"
                            :navigate-to-url="navigateToUrl"
                            :execute-action="executeAction"
                    />
                </v-col>
                <v-col v-if="showRawObject">
                    <raw-object-view v-if="hypermediaObject" :raw-object="rawObject"/>
                    <raw-action-parameter-schema-view
                            v-if="hypermediaObject"
                            :schema-modules="schemaModules"
                            :classes="hypermediaObject.classes"
                    />
                </v-col>
            </v-row>
        </v-container>
        <v-alert dismissible color="red" type="error" border="left" class="error-message" v-if="errorResult">
            <div class="title">{{ errorResult.statusCode }}: {{ errorResult.statusText }}</div>
            <div><p v-html="renderErrorContent(errorResult.content)"></p></div>
        </v-alert>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import {Call, Sync} from 'vuex-pathify';
    import RawObjectView from '@/components/hypermedia/RawObjectView.vue';
    import LinkHistoryView from '@/components/history/LinkHistoryView.vue';
    import HypermediaObjectView from '@/components/hypermedia/HypermediaObjectView.vue';
    import HypermediaObject from '@/domain/hypermedia/hypermediaObject';
    import LinkHistory from '@/domain/history/linkHistory';
    import {mdiAlertCircle, mdiInformation} from '@mdi/js';
    import Dictionary from '@/utils/dictionary';
    import {SchemaModule} from '@/store/modules/application/types';
    import RawActionParameterSchemaView from '@/components/hypermedia/RawActionParameterSchemaView.vue';
    import ErrorResult from '@/domain/hypermedia/results/errorResult';
    import ExecuteActionParameter from '@/store/modules/application/types/executeActionParameter';
    import HypermediaObjectViewWrapped from '@/components/hypermedia/HypermediaObjectViewWrapped.vue';
    import wrap from '@vue/web-component-wrapper';

    @Component({
        components: {RawActionParameterSchemaView, RawObjectView, LinkHistoryView, HypermediaObjectView},
    })
    export default class HypermediaView extends Vue {
        @Sync('application/apiUrl')
        private apiUrl!: string;
        @Sync('application/currentUrl')
        private currentUrl!: string;

        @Sync('application/hypermediaObject')
        private hypermediaObjectX!: HypermediaObject;

        @Sync('application/rawObject')
        private rawObject!: any;

        @Sync('application/schemaModules')
        private schemaModules!: Dictionary<SchemaModule>;

        @Sync('application/history')
        private history!: LinkHistory;

        @Sync('application/errorResult')
        private errorResult!: ErrorResult;

        @Sync('settings/showRawObject')
        private showRawObject!: boolean;

        @Call('application/navigateToUrl')
        private navigateToUrl!: (url: string) => Promise<void>;

        @Call('application/executeAction')
        private executeAction!: (parameters: ExecuteActionParameter) => Promise<void>;

        @Call('application/updateStateFromTransientState')
        private updateStateFromTransientState!: () => Promise<void>;

        @Call('application/updateTransientState')
        private updateTransientState!: () => Promise<void>;

        public renderErrorContent(content: string): string {
            return content.replace(/(?:\r\n|\r|\n)/g, '<br>');
        }

        private get hypermediaObject(): HypermediaObject {
            return this.hypermediaObjectX;
        }

        public data() {
            return {mdiInformation, mdiAlertCircle};
        }

        public async mounted() {
            await this.updateStateFromTransientState();
            if (this.currentUrl) {
                await this.navigateToUrl(this.currentUrl);
            }

            const elementRef = document.getElementById('hov');

            if (elementRef) {
                console.log('Element found!');
                // let shadow = elementRef.attachShadow({ mode: 'closed' });

                // const script = document.createElement('script');
                // // script.src = 'assets/pdf-viewer-ui.js';
                //
                // script.setAttribute('src', '//localhost:8080/assets/pdf-viewer-ui.js');
                // script.async = true;
                //
                // script.onload = function() {
                //   script.onload = null;
                //
                //   const element: HTMLElement = document.createElement('pdf-viewer-ui');
                //   //elementRef.appendChild(element);
                //   shadow.appendChild(element);
                //
                //   // const webComponent = <any>element;
                //
                //   // webComponent.title = "MyDokument.pdf";
                //   // webComponent.pageCount = 3;
                //   // webComponent.currentPage = 1;
                //   // webComponent.contents = {};
                //   // webComponent.onChangePage = AppComponent.pageChange;
                // };
                // // document.head.appendChild(script);
                // // shadow.appendChild(script);

                // const link = document.createElement('link');
                // link.rel = 'stylesheet';
                // link.setAttribute('src', '//localhost:8080/assets/pdf-viewer-ui.css');
                // // document.head.appendChild(script);
                // shadow.appendChild(link);

                // var client = new XMLHttpRequest();
                // client.open('GET', '//localhost:8080/assets/pdf-viewer-ui.css');
                // client.onreadystatechange = function() {
                //   let content = client.responseText;
                //   let style = document.createElement('style');
                //   style.innerText = content;
                //   shadow.appendChild(style);
                //
                //   // let style = document.createElement('style');
                //   // style.innerText = '.menu-bar { background-color: red; }';
                //   shadow.appendChild(style);
                // };
                // client.send();

                //       style.textContent = `
                // .menu-bar {
                //   background-color: red;
                // }`;
                //
                //       shadow.appendChild(style);
            } else {
                console.log('Element not found!');
            }

            // const script = document.createElement('script');
            // script.src = 'http://localhost:4200/assets/image-viewer.js';
            // script.async = true;
            //
            // script.onload = () => {
            //   const element = document.createElement('image-viewer') as any;
            //   document.getElementById('hov')?.appendChild(element);
            //   element.hypermediaObject = this.hypermediaObject;
            // };
            // document.body.appendChild(script);

            // document.appendChild(script);

            // const hypermediaObjectViewWrap = wrap(Vue, HypermediaObjectViewWrapped);
            // window.customElements.define('hypermedia-object-view', hypermediaObjectViewWrap);
            // const hypermediaObjectVieElement = document.createElement('hypermedia-object-view');
            // hypermediaObjectVieElement.setAttribute('hypermedia-object-json', JSON.stringify(this.hypermediaObject));
            //
            // document.getElementById('hov')?.appendChild(hypermediaObjectVieElement);
        }
    }
</script>

<style lang="scss">
    .error-message {
        position: absolute !important;
        top: 4rem;
        right: 2rem;
        background-color: white;
    }
</style>
