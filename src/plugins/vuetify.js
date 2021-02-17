import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#2854CB',
        primary_hover: '#012689',
        primary_disable: '#84A5FF',
        secondary: '#C4C4C4',
        secondary_hover: '#848484',
        secondary_disable: '#EBEBEB',
        success: '#28A745',
        success_hover: '#218838',
        success_disable: '#74C686',
        error: '#DC3545',
        warning: '#FFC107',
        warning_hover: '#E0A800',
        warning_disable: '#FFD75E',
        text: '#212529',
      },
    },
  },
});
