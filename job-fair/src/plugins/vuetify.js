import '@mdi/font/css/materialdesignicons.css' 
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi' || 'mdiSvg' // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#e09e50',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        title:'#072a40',
        colorIcon:'#d39656',
        
      },
    },
  },
});
