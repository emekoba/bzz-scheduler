export const ModuleConfigs = {
  app: {
    entities: [],
  },
};

export const GET_ALL_ENTITIES = () => [
  ...new Set(
    [].concat.apply(
      [],
      Object.keys(ModuleConfigs).map((key) =>
        [].concat.apply([], ModuleConfigs[key].entities),
      ),
    ),
  ),
];
