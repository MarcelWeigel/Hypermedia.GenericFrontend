import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { colors } from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: { dark: true, themes: { dark: { accent: colors.teal.lighten2 } } },
  icons: {
    iconfont: 'mdiSvg',
  },
});
