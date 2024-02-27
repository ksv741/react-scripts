import process from 'process';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import type { WebpackOptions } from 'types';
import { hasPackage } from 'utils/helpers';

const getTsConfigPathsPlugin = (options: WebpackOptions) => {
  const {
    resolvers: {
      plugins: {
        tsConfigPathsPlugin = {},
      } = {},
    } = {},
  } = options;

  if (tsConfigPathsPlugin === 'off' || !hasPackage('typescript')) {
    return null;
  }

  return new TsconfigPathsPlugin({
    baseUrl: process.cwd(),
    ...tsConfigPathsPlugin,
  });
};

export default getTsConfigPathsPlugin;
