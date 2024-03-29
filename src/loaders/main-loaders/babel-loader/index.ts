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
        [require.resolve('@babel/preset-env'), { targets: 'defaults', ...babelLoader?.presets?.env }],
        [require.resolve('@babel/preset-react'), { runtime: 'automatic', ...babelLoader?.presets?.react }],
        [require.resolve('@babel/preset-typescript'), { ...babelLoader?.presets?.typescript }],
      ],
    },
    exclude: path.resolve('node_modules'),
  };
};

export default getBabelLoader;
