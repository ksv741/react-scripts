import type webpack from 'webpack';
import type { WebpackOptions } from 'types';
import getCssLoader from '../css-loader';

const getSassLoader = (options: WebpackOptions): webpack.RuleSetRule | null => {
  const {
    mode,
    loaders: {
      sassLoader,
    } = {},
  } = options;
  const isDev = mode === 'development';

  if (sassLoader === 'off') {
    return null;
  }

  return {
    test: /\.s[ac]ss$/i,
    use: [
      // @ts-ignore
      ...getCssLoader(options).use,
      {
        loader: 'sass-loader',
        options: {
          sourceMap: isDev,
          ...sassLoader,
        },
      },
    ],
  };
};

export default getSassLoader;
