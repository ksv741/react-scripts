import type { WebpackOptions } from 'types';
import type webpack from 'webpack';
import getEsmLoader from './main-loaders/esm-loader';
import { getAssetsLoaders } from './asset-loaders';
import getMainLoader from './main-loaders';
import { getStyleLoaders } from './style-loaders';
import getSvgLoader from './svg-loaders';

const createLoaders = (options: WebpackOptions): (webpack.RuleSetRule | null)[] => [
  getEsmLoader(),
  getMainLoader(options),
  getSvgLoader(options),
  ...getStyleLoaders(options),
  ...getAssetsLoaders(options),
].filter(Boolean);

export default createLoaders;
