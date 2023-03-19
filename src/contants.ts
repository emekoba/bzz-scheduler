import { Media } from './entities/media.entity';

export const ModuleConfigs = {
  app: {
    entities: [Media],
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
