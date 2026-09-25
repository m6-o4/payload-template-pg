import * as migration_20260925_210034 from './20260925_210034';

export const migrations = [
  {
    up: migration_20260925_210034.up,
    down: migration_20260925_210034.down,
    name: '20260925_210034'
  },
];
