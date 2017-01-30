import 'qunitjs/qunit/qunit.css';
import qunit from 'qunitjs';

import { requireAll } from 'utils';

const testList = require.context('../', true, /\.spec\.js/);

requireAll(testList, {
  beforeRequire: context => qunit.module(context)
});

qunit.start();
