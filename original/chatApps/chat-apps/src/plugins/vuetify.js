import '@mdi/font/css/materialdesignicons.css' // css-loaderを使用していることを確認する。
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
      iconfont: 'mdi', // default - only for display purposes
    },  
});
