import webpack from 'webpack';
import type { WebpackOptions } from '../../types';

export const getIgnorePlugin = (options: WebpackOptions) => {
  const {
    plugins: {
      ignorePlugin,
    } = {},
  } = options;

  if (ignorePlugin === 'off') {
    return null;
  }

  return new webpack.IgnorePlugin({
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/,
    ...ignorePlugin,
  });
};
