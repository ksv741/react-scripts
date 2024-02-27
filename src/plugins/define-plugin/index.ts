import webpack from 'webpack';
import type { WebpackOptions } from '../../types';

export const getDefinePlugin = (options: WebpackOptions) => {
  const {
    mode,
    plugins: {
      definePlugin,
    } = {},
  } = options;
  const isDev = mode === 'development';

  if (definePlugin === 'off') {
    return null;
  }

  return new webpack.DefinePlugin({
    'process.env.IS_DEV': JSON.stringify(isDev),
    'process.env.APP_VERSION': JSON.stringify(process.env.npm_package_version),
    ...definePlugin,
  });
};
