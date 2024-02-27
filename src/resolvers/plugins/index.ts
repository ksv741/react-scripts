import type webpack from 'webpack';
import type { WebpackOptions } from 'types';
import getTsConfigPathsPlugin from './tsconfig-paths-webpack-plugin';

const getResolversPlugins = (options: WebpackOptions): webpack.ResolveOptions['plugins'] => [
  getTsConfigPathsPlugin(options),
].filter(Boolean);

export default getResolversPlugins;
