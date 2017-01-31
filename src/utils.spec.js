import { uuid, isUUID } from 'utils';

test('uuid() should satisfy isUUID()', () => {
  expect(isUUID(uuid())).toBeTruthy();
});
