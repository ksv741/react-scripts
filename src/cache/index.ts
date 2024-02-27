import type { WebpackOptions } from 'types';
import type webpack from 'webpack';

const getCache = (options: WebpackOptions): webpack.Configuration['cache'] => {
  const { cache = {} } = options;

  if (cache === 'off') {
    // eslint-disable-next-line no-undefined
    return undefined;
  }

  return {
    type: 'filesystem',
    ...cache,
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    buildDependencies: {
      config: [__filename],
      // @ts-ignore
      ...cache.buildDependencies,
    },
  };
};

export default getCache;
