import { unless, isNil, findIndex, propEq, pipe } from 'ramda';
import { uuid } from 'utils';

// Mutations
export const CREATE = 'CREATE';
export const DELETE = 'DELETE';
export const SELECT = 'SELECT';
export const SELECT_ALL = 'SELECT_ALL';
export const DESELECT = 'DESELECT';
export const DESELECT_ALL = 'DESELECT_ALL';
export const SET_NAME = 'SET_NAME';
export const SET_POSITION = 'SET_POSITION';

const indexEqualsNegativeOne = i => i === -1;

export const actOnNode = (nodes, id, callback) =>
  pipe(
    findIndex(propEq('id', id)),
    unless(indexEqualsNegativeOne, callback)
  )(nodes);

export const updateNode = (nodes, id, properties) =>
  actOnNode(nodes, id, index => {
    nodes[index] = { ...nodes[index], ...properties };
  });

export const removeNode = (nodes, id) =>
  actOnNode(nodes, id, index => {
    nodes.splice(index, 1);
  });

export const bringNodeToFront = (nodes, id) =>
  actOnNode(nodes, id, index => {
    nodes.push(nodes.splice(index, 1)[0]);
  });

export const forAllNodes = (nodes, callback) => {
  for (let i = 0; i < nodes.length; ++i) {
    callback(i);
  }
}

export default {
  namespaced: true,
  state: [],
  mutations: {
    [CREATE]: (nodes, node) => nodes.push(node),
    [DELETE]: (nodes, id) => removeNode(nodes, id),
    [SELECT]: (nodes, id) => updateNode(nodes, id, { selected: true }),
    [SELECT_ALL]: (nodes) => forAllNodes(nodes, index => nodes[index].selected = true),
    [DESELECT]: (nodes, id) => updateNode(nodes, id, { selected: false }),
    [DESELECT_ALL]: (nodes) => forAllNodes(nodes, index => nodes[index].selected = false),
    [SET_NAME]: (nodes, { id, name }) => updateNode(nodes, id, { name }),
    [SET_POSITION]: (nodes, { id, x, y }) => updateNode(nodes, id, { x, y })
  },
  actions: {
    create({ commit }, properties) {
      commit(CREATE, {
        id: uuid(),
        selected: false,
        name: '',
        x: 0, y: 0,
        ...properties
      });
    },
    delete: ({ commit }, id) => commit(DELETE, id),
    select({ dispatch, commit, state }, id) {
      dispatch('deselectAll');
      commit(SELECT, id);
      bringNodeToFront(state, id);
    },
    selectAll: ({ commit }) => commit(SELECT_ALL),
    addToSelection: ({ commit }, id) => commit(SELECT, id),
    deselect: ({ commit }, id) => commit(DESELECT, id),
    deselectAll: ({ commit }) => commit(DESELECT_ALL),
    setPosition: ({ commit }, {id, x, y}) => commit(SET_POSITION, {id, x, y})
  },
  getters: {
    listAll: nodes => nodes,
    filter: (nodes, callback) => nodes.filter(callback)
  }
};
