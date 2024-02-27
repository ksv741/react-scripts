import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import type { WebpackOptions } from 'types';
import { hasPackage } from 'utils/helpers';

const getForkTsCheckerPlugin = (options: WebpackOptions) => {
  const {
    plugins: {
      forkTsCheckerPlugin,
    } = {},
  } = options;

  if (forkTsCheckerPlugin === 'off' || !hasPackage('typescript')) {
    return null;
  }

  return new ForkTsCheckerWebpackPlugin({
    ...forkTsCheckerPlugin,
    typescript: {
      ...forkTsCheckerPlugin?.typescript,
    },
  });
};

export default getForkTsCheckerPlugin;
