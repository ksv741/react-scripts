import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { WebpackOptions } from 'types';

const createDevServer = (options: WebpackOptions): DevServerConfiguration => {
  const {
    devServer,
  } = options;

  return {
    port: 3000,
    open: false,
    historyApiFallback: true,
    hot: true,
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
    },
    ...devServer,
  };
};

export default createDevServer;
