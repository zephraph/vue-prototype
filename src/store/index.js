import Vue from 'vue';
import Vuex from 'vuex';

import workflow from 'store/modules/workflow';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  modules: {
    workflow
  }
});

export default store;
