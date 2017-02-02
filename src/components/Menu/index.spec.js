import Menu from './index';
import { render } from 'test-utils';

const makeProps = props => ({
  'props': {
    ...props
  }
});

test('Should create an empty menu with the given title', async () => {
  const props = makeProps({
    title: 'test'
  });
  const result = await render(h => <Menu try="this" {...props}/>);

  expect(result).toMatchSnapshot();
});
