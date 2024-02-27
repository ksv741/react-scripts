import path from 'path';
import type webpack from 'webpack';
import type { WebpackOptions } from 'types';

const getTsLoader = (options: WebpackOptions): webpack.RuleSetRule | null => {
  const {
    loaders: {
      tsLoader,
    } = {},
  } = options;

  if (tsLoader === 'off') {
    return null;
  }

  return {
    test: /\.[j|t]sx?$/,
    loader: 'ts-loader',
    options: {
      ...tsLoader,
    },
    exclude: path.resolve('node_modules'),
  };
};

export default getTsLoader;
