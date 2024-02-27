import path from 'path';

import type webpack from 'webpack';
import type { WebpackOptions } from '../types';

export const createResolvers = (options: WebpackOptions): webpack.ResolveOptions => {
  const {
    paths,
  } = options;

  return {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    mainFiles: ['index'],
    modules: [
      paths.src,
      path.resolve(paths.root),
      path.resolve(paths.root, 'node_modules'),
    ],
  };
};
