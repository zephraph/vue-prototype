import { unless, isNil, findIndex, propEq, pipe } from 'ramda';
import { uuid } from 'utils';

// Mutations
const CREATE = 'CREATE';
const DELETE = 'DELETE';
const SELECT = 'SELECT';
const SELECT_ALL = 'SELECT_ALL';
const DESELECT = 'DESELECT';
const DESELECT_ALL = 'DESELECT_ALL';
const SET_NAME = 'SET_NAME';
const SET_POSITION = 'SET_POSITION';

const actOnNode = (nodes, id, callback) =>
  pipe(
    findIndex(propEq('id', id)),
    unless(isNil, callback)
  )(nodes);

const updateNode = (nodes, id, properties) =>
  actOnNode(nodes, id, index => {
    nodes[index] = { ...nodes[index], ...properties };
  });

const removeNode = (nodes, id) =>
  actOnNode(nodes, id, index => {
    nodes.splice(index, 1);
  });

const bringNodeToFront = (nodes, id) =>
  actOnNode(nodes, id, index => {
    nodes.unshift(nodes.splice(index, 1));
  });

const forAllNodes = (nodes, callback) => {
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
    select({ dispatch, commit }, id) {
      dispatch('deselectAll');
      commit(SELECT, id);
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
