import { test } from 'qunitjs';
import td, { matchers } from 'testdouble';
import { equals } from 'ramda';

import { isUUID } from 'utils';
import { called, notCalled } from 'test/assertions';

import node, {
  actOnNode,
  updateNode,
  removeNode,
  bringNodeToFront,
  forAllNodes,
  CREATE, DELETE, SELECT, SELECT_ALL,
  DESELECT, DESELECT_ALL, SET_NAME, SET_POSITION
} from './node';

test('actOnNode() does not call callback when no nodes are present', t => {
  const callback = td.function('callback');

  actOnNode([], 0, callback);

  notCalled(t, callback());
});

test('actOnNode() does not call callback when expected node not present', t => {
  const callback = td.function('callback');
  actOnNode([{ id: 12345 }], 0, callback);

  notCalled(t, callback());
});

test('actOnNode() calls given callback for matching node', t => {
  const callback = td.function('callback');

  actOnNode([{ id: 12345 }], 12345, callback);

  called(t, callback(0));
});

test('updateNode() should update a property on the given node', t => {
  const given = { id: 1, name: 'hello' };
  const expected = { id: 1, name: 'world' };
  const nodes = [given];

  updateNode(nodes, given.id, { name: expected.name });
  t.deepEqual(nodes[0], expected);
});

test('removeNode() should remove matching node', t => {
  const nodes = [{ id: 1 }, { id: 2 }];
  const expected = [{ id: 2 }];

  removeNode(nodes, 1);
  t.deepEqual(nodes, expected);
});

test('bringNodeToFront() should move specified node to the beginning of the nodes array', t => {
  const nodes = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const expected = [{ id: 1 }, { id: 3 }, { id: 2}];
  bringNodeToFront(nodes, 2);
  t.deepEqual(nodes, expected);
});

test('forAllNodes() should call callback on all nodes', t => {
  const nodes = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const callback = td.function('callback');

  forAllNodes(nodes, callback);

  called(t, callback(matchers.isA(Number)), { times: 3 });
});

test(`node.mutations.${CREATE} should create a new node`, t => {
  const nodes = [];
  const expected = [{ id: 1 }];

  node.mutations[CREATE](nodes, expected[0]);
  t.deepEqual(nodes, expected);
});

test(`node.mutations.${DELETE} should delete a given node`, t => {
  const nodes = [{ id: 1 }];
  const expected = [];

  node.mutations[DELETE](nodes, nodes[0].id);
  t.deepEqual(nodes, expected);
});

test(`node.mutations.${SELECT} should set selected to true for given node`, t => {
  const nodes = [{ id: 1, selected: false }];
  const expected = [{ id: 1, selected: true }];

  node.mutations[SELECT](nodes, nodes[0].id);
  t.deepEqual(nodes, expected);
});

test(`node.mutations.${SELECT_ALL} should set selected on all nodes to true`, t => {
  const nodes = [
    { id: 1, selected: false },
    { id: 2, selected: true },
    { id: 3, selected: false }
  ];
  const expected = [
    { id: 1, selected: true },
    { id: 2, selected: true },
    { id: 3, selected: true }
  ];

  node.mutations[SELECT_ALL](nodes);
  t.deepEqual(nodes, expected);
});

test(`node.mutations.${DESELECT} should set selected to false for given node`, t => {
  const nodes = [{ id: 1, selected: true }];
  const expected = [{ id: 1, selected: false }];

  node.mutations[DESELECT](nodes, nodes[0].id);
  t.deepEqual(nodes, expected);
});


test(`node.mutations.${DESELECT_ALL} should set selected on all nodes to false`, t => {
  const nodes = [
    { id: 1, selected: true },
    { id: 2, selected: true },
    { id: 3, selected: false }
  ];
  const expected = [
    { id: 1, selected: false },
    { id: 2, selected: false },
    { id: 3, selected: false }
  ];

  node.mutations[DESELECT_ALL](nodes);
  t.deepEqual(nodes, expected);
});

test(`node.mutations.${SET_NAME} should set the name on the given node`, t => {
  const nodes = [{ id: 1 }];
  const expected = [{ id: 1, name: 'test' }];

  node.mutations[SET_NAME](nodes, expected[0]);
  t.deepEqual(nodes, expected);
});

test(`node.mutations.${SET_POSITION} should set the position of the given node`, t => {
  const nodes = [{ id: 1 }];
  const expected = [{ id: 1, x: 0, y: 0 }];

  node.mutations[SET_POSITION](nodes, expected[0])
  t.deepEqual(nodes, expected);
});

test(`node.actions.create should commit the create mutation with specified params`, t => {
  const commit = td.function('commit');
  const expected = {
    selected: false,
    name: '',
    x: 0,
    y: 5
  };

  const validateCreate = ({ id, ...args }) => {
    t.deepEqual(args, expected);
    return isUUID(id);
  };

  node.actions.create({ commit }, { y: 5 });
  called(t, commit(CREATE, matchers.argThat(validateCreate)));
});
