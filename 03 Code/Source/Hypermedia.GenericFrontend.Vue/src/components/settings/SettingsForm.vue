<template lang="html">
    <v-container fluid fill-height ma-0 pa-0>
        <v-row no-gutters style="height: 100%">
            <v-col>
                <v-card>
                    <v-card-title class="accent">
                        Settings
                    </v-card-title>
                    <v-card-subtitle class="accent">
                        hier you can change the look and feel of the application
                    </v-card-subtitle>

                    <v-card-text>
                        <v-row no-gutters style="height: 100%">
                            <v-col>
                                <v-text-field v-model="defaultApiUrl" label="Default Api Url"
                                              style="margin-right: 15px"/>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
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
                                        @change="useWebComponents"
                                ></v-switch>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import {Call, Sync} from 'vuex-pathify';

    @Component({
        components: {},
    })
    export default class SettingsForm extends Vue {
        @Sync('settings/defaultApiUrl')
        private defaultApiUrl!: string;

        @Sync('settings/isDarkTheme')
        private isDarkTheme!: boolean;

        @Sync('settings/showRawObject')
        private showRawObject!: boolean;

        @Sync('settings/useWebComponents')
        private useWebComponents!: boolean;

        @Call('settings/saveSettings')
        private saveSettings!: () => Promise<void>;

        public async changeTheme() {
            await this.saveSettings();
            this.$vuetify.theme.dark = this.isDarkTheme;
        }
    }
</script>

<style module lang="scss"></style>
