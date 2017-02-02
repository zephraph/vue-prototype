import { render } from 'test-utils';
import Socket from './Socket.vue';

test('Socket component should render in correct place for input', async () => {
  const result = await render(h => <Socket width={ 10 }/>);
  expect(result).toMatchSnapshot();
});

test('Socket component should render in correct place for output', async () => {
  const result = await render(h => <Socket type="output" width={ 10 }/>);
  expect(result).toMatchSnapshot();
});
