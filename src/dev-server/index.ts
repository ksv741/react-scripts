import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { WebpackOptions } from '../types';

export const createDevServer = (options: WebpackOptions): DevServerConfiguration => {
  const {
    port,
  } = options;

  return {
    port,
    open: false,
    historyApiFallback: true,
    hot: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
    },
  };
};
