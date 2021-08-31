<template lang="html">
    <v-container fluid fill-height ma-0 pa-0>
        <v-card width="40rem">
            <v-card-title class="accent">
                Hypermedia Setup
            </v-card-title>
            <v-card-subtitle class="accent">
                enter the url to the EntryPoint
            </v-card-subtitle>
            <v-card-text class="text-right">
                <v-form v-model="valid">
                    <v-row no-gutters>
                        <v-col>
                            <v-text-field
                                    v-model="apiUrlInputField"
                                    label="Api Url"
                                    v-on:keyup.enter="submitApi"
                                    style="margin-right: 15px"
                            />
                        </v-col>
                    </v-row>
                </v-form>
                <v-btn :disabled="!valid" @click="submitApi" class="primary">
                    Take Off
                </v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import {Call, commit, Sync} from 'vuex-pathify';

    @Component({
        components: {},
    })
    export default class ConfigureForm extends Vue {
        public valid = false;
        public apiUrlInputField = '';

        @Sync('settings/defaultApiUrl')
        private defaultApiUrl!: string;

        @Call('application/navigateToUrl')
        private navigateToUrl!: (schemaUrl: string) => Promise<void>;

        public mounted() {
            this.apiUrlInputField = this.defaultApiUrl;
        }

        public submitApi() {
            if (this.apiUrlInputField !== '') {
                const apiUrl = this.apiUrlInputField.trim();
                commit('application/SET_API_URL', apiUrl);
                this.apiUrlInputField = '';
                this.navigateToUrl(apiUrl);
                this.$router.push({
                    name: 'hypermedia-view',
                });
            }
        }
    }
</script>

<style module lang="scss"></style>
