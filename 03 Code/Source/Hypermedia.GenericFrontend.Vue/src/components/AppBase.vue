<template lang="html">
    <v-app class="fill-height">
        <v-app-bar fixed app>
            <v-app-bar-nav-icon @click.stop="showDrawer = !showDrawer"></v-app-bar-nav-icon>

            <router-link to="/">
                <v-icon size="64px">{{ mdiRocketLaunch }}</v-icon>
            </router-link>

            <v-toolbar-title style="display:inline-block;" class="ml-3">
                {{ toolbarTitle }}
            </v-toolbar-title>

            <v-spacer/>

            <slot name="header"/>

            <!--      <v-btn text key="logout" @click="logout()">-->
            <!--        <span class="hidden-sm-and-down">Logout</span>-->
            <!--        <v-icon class="ml-2">{{ mdiLogout }}</v-icon>-->
            <!--      </v-btn>-->
        </v-app-bar>

        <v-navigation-drawer v-model="showDrawer" temporary absolute width="250" id="drawer">
            <v-list dense class="pt-0">
                <v-list-item :to="{ name: 'setup-view' }">
                    <v-list-item-action>
                        <v-icon>{{ mdiTransitConnectionVariant }}</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>Setup</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item :to="{ name: 'hypermedia-view' }" v-if="apiUrl">
                    <v-list-item-action>
                        <v-icon>{{ mdiFileDocument }}</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>Hypermedia</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item :to="{ name: 'settings-view' }">
                    <v-list-item-action>
                        <v-icon>{{ mdiCog }}</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>Settings</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content class="pl-2">
                        <v-switch
                                v-model="isDarkTheme"
                                hide-details
                                inset
                                label="Turn Dark Theme on"
                                @change="changeTheme"
                        ></v-switch>
                        <v-switch
                                v-model="showRawObject"
                                hide-details
                                inset
                                label="Show Raw Object"
                                @change="saveSettings"
                        ></v-switch>
                        <v-switch
                                v-model="useWebComponents"
                                hide-details
                                inset
                                label="Use Web Components"
                                @change="saveSettings"
                        ></v-switch>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main fill-height>
            <transition mode="out-in">
                <router-view :key="routeKey"/>
            </transition>
        </v-main>
    </v-app>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    import {
        mdiCheckboxMultipleBlank,
        mdiClipboardPulse,
        mdiFileDocument,
        mdiFileSearch,
        mdiFileTree,
        mdiLogout,
        mdiRocketLaunch,
        mdiTransitConnectionVariant,
        mdiCog,
        mdiPinwheelOutline,
    } from '@mdi/js';
    import {Call, commit, Sync} from 'vuex-pathify';
    import HypermediaObject from '@/domain/hypermedia/hypermediaObject';
    import {LocalStorageService} from '@/services/localStorage/localStorageService';

    @Component
    export default class AppBase extends Vue {
        @Prop(String)
        public statusText!: string;

        @Sync('application/apiUrl')
        private apiUrl!: string;

        @Call('settings/loadSettings')
        private loadSettings!: () => Promise<void>;

        @Sync('settings/isDarkTheme')
        private isDarkTheme!: boolean;

        @Sync('settings/showRawObject')
        private showRawObject!: boolean;

        @Sync('settings/useWebComponents')
        private useWebComponents!: boolean;

        @Call('settings/saveSettings')
        private saveSettings!: () => Promise<void>;

        @Call('application/updateStateFromTransientState')
        private updateStateFromTransientState!: () => Promise<void>;

        public async changeTheme() {
            await this.saveSettings();
            this.$vuetify.theme.dark = this.isDarkTheme;
        }

        public get publicPath() {
            return process.env.BASE_URL;
        }

        public get routeKey() {
            if (!this.$route) {
                return Math.random().toString();
            }

            const helper = this.$route.matched[0].meta.key;
            return helper ? helper(this.$route) : undefined;
        }

        public get toolbarColor() {
            // if (this.isDevelopmentEnv) {
            //   return 'blue-grey darken-2';
            // } else if (this.isOnStaging) {
            //   return 'teal darken-2';
            // } else if (this.isOnProductionAndDeveloperUser) {
            //   return 'deep-orange darken-4';
            // }
            return 'grey darken-3';
        }

        public get toolbarTitle() {
            // if (this.isDevelopmentEnv) {
            //   return 'Auftragsbrowser | Development';
            // } else if (this.isOnStaging) {
            //   return 'Auftragsbrowser | Staging';
            // } else if (this.isOnProductionAndDeveloperUser) {
            //   return 'Auftragsbrowser | Production';
            // }
            return 'Hypermedia Generic Frontend';
        }

        public get isDevelopmentEnv() {
            return process.env.NODE_ENV === 'development';
        }

        public get isOnStaging() {
            return process.env.VUE_APP_SENTRY_ENVIRONMENT === 'staging';
        }

        public get isOnProductionAndDeveloperUser() {
            return process.env.VUE_APP_SENTRY_ENVIRONMENT === 'production';
        }

        public showDrawer = false;

        public async created() {
            await this.loadSettings();
            this.$vuetify.theme.dark = this.isDarkTheme;
        }

        public data() {
            return {
                mdiLogout,
                mdiClipboardPulse,
                mdiFileTree,
                mdiCheckboxMultipleBlank,
                mdiFileSearch,
                mdiFileDocument,
                mdiRocketLaunch,
                mdiTransitConnectionVariant,
                mdiCog,
                mdiPinwheelOutline,
            };
        }
    }
</script>

<style lang="scss">
    html {
        overflow-y: hidden !important;
        height: 100%;
    }

    main {
        height: 100%;
    }

    .v-input.theme-switcher {
        flex: 0 0 auto;
        margin-top: 22px !important;
    }

    .project-filter {
        max-width: 300px !important;
    }
</style>
