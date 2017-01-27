import { uuid } from 'utils';
import {
  findIndex,
  propEq,
  unless,
  isNil,
  remove,
  append,
  pipe,
  __
} from 'ramda';

const setNodeSelect = (state, nodeId, selected) => {
  state.nodes = state.nodes
    .map(node => node.id === nodeId ? { ...node, selected } : node)
};

const getNodeIndex = (nodes, nodeId) => findIndex(propEq('id', nodeId))(nodes)
const bringNodeToFront = (nodes, index) =>
  pipe(
    remove(index, 1),
    append(nodes[index])
  )(nodes);

export default {
  namespaced: true,

  state: {
    nodes: []
  },

  mutations: {
    ADD_NODE: ({ nodes }, node) => nodes.push(node),
    SELECT_NODE: (state, nodeId) => {
      const nodeIndex = getNodeIndex(state.nodes, nodeId);
      state.nodes[nodeIndex].selected = true;
      state.nodes = bringNodeToFront(state.nodes, nodeIndex);
    },
    DESELECT_NODE: (state, nodeId) => setNodeSelect(state, nodeId, false),
  },

  getters: {
    listNodes: state => state.nodes
  },

  actions: {
    createNode({ commit }, properties) {
      commit('ADD_NODE', { id: uuid(), selected: false, ...properties });
    },
    unselectAllNodes({ state, commit }) {
      state
        .nodes
        .filter(({ selected }) => selected === true)
        .forEach(node => commit('DESELECT_NODE', node.id));
    },
    selectNode({ dispatch, commit }, nodeId) {
      dispatch('unselectAllNodes');
      commit('SELECT_NODE', nodeId);
    }
  }

};
