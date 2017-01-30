import { test } from 'qunitjs';
import td, { matchers } from 'testdouble';

import { called, notCalled } from 'test/assertions';

import node, {
  actOnNode,
  updateNode,
  removeNode,
  bringNodeToFront,
  forAllNodes
} from './node';

test('actOnNode does not call callback when no nodes are present', t => {
  const callback = td.function('callback');

  actOnNode([], 0, callback);

  notCalled(t, callback());
});

test('actOnNode does not call callback when expected node not present', t => {
  const callback = td.function('callback');
  actOnNode([{ id: 12345 }], 0, callback);

  notCalled(t, callback());
});

test('actOnNode calls given callback for matching node', t => {
  const callback = td.function('callback');

  actOnNode([{ id: 12345 }], 12345, callback);

  called(t, callback(0));
});

test('updateNode should update a property on the given node', t => {
  const given = { id: 1, name: 'hello' };
  const expected = { id: 1, name: 'world' };
  const nodes = [given];

  updateNode(nodes, given.id, { name: expected.name });
  t.deepEqual(nodes[0], expected);
});

test('removeNode should remove matching node', t => {
  const nodes = [{ id: 1 }, { id: 2 }];
  const expected = [{ id: 2 }];

  removeNode(nodes, 1);
  t.deepEqual(nodes, expected);
});

test('bringNodeToFront should move specified node to the beginning of the nodes array', t => {
  const nodes = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const expected = [{ id: 2}, { id: 1 }, { id: 3 }];
  bringNodeToFront(nodes, 2);
  t.deepEqual(nodes, expected);
});

test('forAllNodes should call callback on all nodes', t => {
  const nodes = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const callback = td.function('callback');

  forAllNodes(nodes, callback);

  called(t, callback(matchers.isA(Number)), { times: 3 });
});
