import path from 'path';
import type webpack from 'webpack';
import type { WebpackOptions } from 'types';

const getBabelLoader = (options: WebpackOptions): webpack.RuleSetRule | null => {
  const {
    loaders: {
      babelLoader,
    } = {},
  } = options;

  if (babelLoader === 'off') {
    return null;
  }

  return {
    test: /\.[j|t]sx?$/,
    loader: require.resolve('babel-loader'),
    options: {
      ...babelLoader,
      presets: [
        ['@babel/preset-env', { targets: 'defaults', ...babelLoader?.presets?.env }],
        ['@babel/preset-react', { runtime: 'automatic', ...babelLoader?.presets?.react }],
        ['@babel/preset-typescript', { ...babelLoader?.presets?.typescript }],
      ],
    },
    exclude: path.resolve('node_modules'),
  };
};

export default getBabelLoader;
