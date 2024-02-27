import type webpack from 'webpack';
import type { WebpackOptions } from 'types';

const getFontLoader = (options: WebpackOptions): webpack.RuleSetRule | null => {
  const {
    loaders: {
      fontLoader,
    } = {},
  } = options;

  if (fontLoader === 'off') {
    return null;
  }

  return {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'static/fonts/[hash][ext][query]',
      ...fontLoader,
    },
  };
};

export default getFontLoader;
