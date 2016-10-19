export default function componentRenderer(components) {
  console.log('CR:', components);
  return {
    name: 'componentRenderer',
    components,
    functional: true,
    props: ['component'],
    render: (h, context) => h(components[context.props.component].default)
  }
}
