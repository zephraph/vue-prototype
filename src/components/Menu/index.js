import MenuSection from './Section';
import MenuField from './Field';

export default {
  functional: true,
  render: (h, { props }) =>
    <MenuSection title={ props.title }></MenuSection>,
  props: {
    title: String,
    fields: Array
  },
  components: {
    MenuField
  }
}
