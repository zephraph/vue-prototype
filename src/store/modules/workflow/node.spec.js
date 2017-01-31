import { equals } from 'ramda';

import { isUUID } from 'utils';

import node, {
  actOnNode,
  updateNode,
  removeNode,
  bringNodeToFront,
  forAllNodes,
  CREATE, DELETE, SELECT, SELECT_ALL,
  DESELECT, DESELECT_ALL, SET_NAME, SET_POSITION
} from './node';

test('actOnNode() does not call callback when no nodes are present', () => {
  const callback = jest.fn();

  actOnNode([], 0, callback);

  expect(callback).not.toHaveBeenCalled();
});

test('actOnNode() does not call callback when expected node not present', () => {
  const callback = jest.fn();
  actOnNode([{ id: 12345 }], 0, callback);

  expect(callback).not.toHaveBeenCalled();
});

test('actOnNode() calls given callback for matching node', () => {
  const callback = jest.fn();

  actOnNode([{ id: 12345 }], 12345, callback);

  expect(callback).toHaveBeenCalledWith(0);
});

test('updateNode() should update a property on the given node', () => {
  const given = { id: 1, name: 'hello' };
  const expected = { id: 1, name: 'world' };
  const nodes = [given];

  updateNode(nodes, given.id, { name: expected.name });
  expect(nodes[0]).toEqual(expected);
});

test('removeNode() should remove matching node', () => {
  const nodes = [{ id: 1 }, { id: 2 }];
  const expected = [{ id: 2 }];

  removeNode(nodes, 1);
  expect(nodes).toEqual(expected);
});

test('bringNodeToFront() should move specified node to the beginning of the nodes array', () => {
  const nodes = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const expected = [{ id: 1 }, { id: 3 }, { id: 2}];
  bringNodeToFront(nodes, 2);
  expect(nodes).toEqual(expected);
});

test('forAllNodes() should call callback on all nodes', () => {
  const nodes = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const callback = jest.fn();

  forAllNodes(nodes, callback);
  expect(callback).toHaveBeenCalledTimes(3);
});

test(`node.mutations.${CREATE} should create a new node`, () => {
  const nodes = [];
  const expected = [{ id: 1 }];

  node.mutations[CREATE](nodes, expected[0]);
  expect(nodes).toEqual(expected);
});

test(`node.mutations.${DELETE} should delete a given node`, () => {
  const nodes = [{ id: 1 }];
  const expected = [];

  node.mutations[DELETE](nodes, nodes[0].id);
  expect(nodes).toEqual(expected);
});

test(`node.mutations.${SELECT} should set selected to true for given node`, () => {
  const nodes = [{ id: 1, selected: false }];
  const expected = [{ id: 1, selected: true }];

  node.mutations[SELECT](nodes, nodes[0].id);
  expect(nodes).toEqual(expected);
});

test(`node.mutations.${SELECT_ALL} should set selected on all nodes to true`, () => {
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
  expect(nodes).toEqual(expected);
});

test(`node.mutations.${DESELECT} should set selected to false for given node`, () => {
  const nodes = [{ id: 1, selected: true }];
  const expected = [{ id: 1, selected: false }];

  node.mutations[DESELECT](nodes, nodes[0].id);
  expect(nodes).toEqual(expected);
});


test(`node.mutations.${DESELECT_ALL} should set selected on all nodes to false`, () => {
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
  expect(nodes).toEqual(expected);
});

test(`node.mutations.${SET_NAME} should set the name on the given node`, () => {
  const nodes = [{ id: 1 }];
  const expected = [{ id: 1, name: 'test' }];

  node.mutations[SET_NAME](nodes, expected[0]);
  expect(nodes).toEqual(expected);
});

test(`node.mutations.${SET_POSITION} should set the position of the given node`, () => {
  const nodes = [{ id: 1 }];
  const expected = [{ id: 1, x: 0, y: 0 }];

  node.mutations[SET_POSITION](nodes, expected[0])
  expect(nodes).toEqual(expected);
});

test(`node.actions.create should commit the create mutation with specified params`, () => {
  const commit = jest.fn();
  const expected = {
    selected: false,
    name: '',
    x: 0,
    y: 5
  };

  const validateCreate = ({ id, ...args }) => {
    expect(args).toEqual(expected);
    return isUUID(id);
  };

  node.actions.create({ commit }, { y: 5 });
  expect(commit).toHaveBeenCalled();

  const [mutation, properties] = commit.mock.calls[0];
  expect(isUUID(properties.id)).toBeTruthy();
  expect(properties).toMatchObject(expected);
});
