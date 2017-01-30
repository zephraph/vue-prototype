import { test } from 'qunitjs';

import { uuid, isUUID } from 'utils';

test('uuid() should satisfy isUUID()', t => {
  t.ok(isUUID(uuid()));
});
