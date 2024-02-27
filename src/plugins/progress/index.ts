import webpack from 'webpack';
import type { WebpackOptions } from '../../types';

export const getProgressPlugin = (options: WebpackOptions) => {
  const {
    plugins: {
      progressPlugin,
    } = {},
  } = options;

  if (progressPlugin === 'off') {
    return null;
  }

  return new webpack.ProgressPlugin(progressPlugin);
};
