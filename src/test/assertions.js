import td from 'testdouble';

export const called = (t, expected, ...args) => {
  t.strictEqual(td.verify(expected, ...args), undefined);
}

export const notCalled = (t, expected) => {
  called(t, expected, { times: 0, ignoreExtraArgs: true });
}
