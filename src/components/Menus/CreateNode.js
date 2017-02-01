export default {
  title: 'Create Node',
  fields: [
    {
      type: 'form',
      label: 'Name',
      action(dispatch, value) {
        dispatch('workflow/node/create', { name: value });
      }
    }
  ]
};
