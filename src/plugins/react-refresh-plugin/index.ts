import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import type { WebpackOptions } from '../../types';

export const getReactRefreshPlugin = (options: WebpackOptions) => {
  const {
    plugins: {
      reactRefreshPlugin,
    } = {},
  } = options;

  if (reactRefreshPlugin === 'off') {
    return null;
  }

  return new ReactRefreshWebpackPlugin({
    overlay: false,
    ...reactRefreshPlugin,
  });
};
