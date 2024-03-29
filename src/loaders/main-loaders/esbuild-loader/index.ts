import path from 'path';
import type webpack from 'webpack';
import type { WebpackOptions } from 'types';

const getEsbuildLoader = (options: WebpackOptions): webpack.RuleSetRule | null => {
  const {
    paths,
    loaders: {
      esbuildLoader,
    } = {},
  } = options;

  if (esbuildLoader === 'off') {
    return null;
  }

  return {
    test: /\.[j|t]sx?$/,
    loader: require.resolve('esbuild-loader'),
    options: {
      loader: 'tsx',
      jsx: 'automatic',
      ...esbuildLoader,
    },
    exclude: path.resolve(paths.root, 'node_modules'),
  };
};

export default getEsbuildLoader;
