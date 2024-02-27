import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import type { WebpackOptions } from '../../types';

export const getForkTsCheckerPlugin = (options: WebpackOptions) => {
  const {
    plugins: {
      forkTsCheckerPlugin,
    } = {},
  } = options;

  if (forkTsCheckerPlugin === 'off') {
    return null;
  }

  return new ForkTsCheckerWebpackPlugin(forkTsCheckerPlugin);
};
