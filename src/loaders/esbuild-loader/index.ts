import path from 'path';
import type webpack from 'webpack';
import type { WebpackOptions } from '../../types';

export const getEsbuildLoader = (options: WebpackOptions): webpack.RuleSetRule | null => {
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
    loader: 'esbuild-loader',
    options: {
      loader: 'tsx',
      ...esbuildLoader,
    },
    exclude: path.resolve(paths.root, 'node_modules'),
  };
};
