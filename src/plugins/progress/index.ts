import webpack from 'webpack';
import type { WebpackOptions } from 'types';

const getProgressPlugin = (options: WebpackOptions) => {
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

export default getProgressPlugin;
