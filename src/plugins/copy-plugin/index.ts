import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';
import type { WebpackOptions } from 'types';

const getCopyPlugin = (options: WebpackOptions) => {
  const {
    paths,
    plugins: {
      copyPlugin,
    } = {},
  } = options;

  if (copyPlugin === 'off') {
    return null;
  }

  return new CopyPlugin({
    patterns: [
      {
        from: path.resolve(paths.root, paths.public),
        globOptions: {
          ignore: [
            path.resolve(paths.root, paths.public, paths.html),
            path.resolve(paths.root, paths.public, paths.assets),
          ],
        },
        to: path.resolve(paths.root, paths.build),
        noErrorOnMissing: true,
      },
      ...copyPlugin?.patterns ?? [],
    ].filter(Boolean),
    options: copyPlugin?.options,
  });
};

export default getCopyPlugin;
