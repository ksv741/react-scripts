import webpack from 'webpack';
import type { WebpackOptions } from 'types';
import { getClientEnvironment } from './dotenv';

const getDefinePlugin = (options: WebpackOptions) => {
  const {
    plugins: {
      definePlugin,
    } = {},
  } = options;

  if (definePlugin === 'off') {
    return null;
  }

  return new webpack.DefinePlugin({
    ...getClientEnvironment(options).stringified,
    ...definePlugin,
  });
};

export default getDefinePlugin;
