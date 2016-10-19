function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

export const componentList = requireAll(require.context('./', true, /\.\/[A-Za-z]+\/index\.js$/));

console.log('CL:', componentList);

const buildComponents = components =>
  components
    .map(c => ({ [c.default.name]: c.default }))
    // .reduce((acc, curr) => ({...acc, ...curr}), {});

console.log('CL2:', componentList);

const components = buildComponents(componentList);

console.log('CM:', components);

export default components;
