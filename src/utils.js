export const requireAll = (requireContext, { beforeRequire, afterRequire } = {}) =>
  requireContext.keys().map(context => {
    if (beforeRequire)
      beforeRequire(context);

    requireContext(context);

    if (afterRequire)
      afterRequire(context)
  });

const s4 = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

export const uuid = () =>
  `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
