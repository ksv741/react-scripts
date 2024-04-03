import type { WebpackOptions } from 'types';
import { ProvidePlugin } from 'webpack';

const getProvidePlugin = (options: WebpackOptions) => {
  const {
    plugins: {
      providePlugin,
    } = {},
  } = options;

  if (providePlugin === 'off') {
    return null;
  }

  return new ProvidePlugin({
    process: 'process/browser',
    ...providePlugin,
  });
};

export default getProvidePlugin;
