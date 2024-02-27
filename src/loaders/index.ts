import type webpack from 'webpack';
import type { WebpackOptions } from '../types';
import { getAssetsLoaders } from './asset-loaders';
import { getStyleLoaders } from './style-loaders';
import { getEsbuildLoader } from './esbuild-loader';
import { getSvgLoader } from './svgr-loader';
import { getSwcLoader } from './swc-loader';

export const createLoaders = (options: WebpackOptions): (webpack.RuleSetRule | null)[] => {
  const {
    mainLoader,
  } = options;

  const getMainLoader = () => {
    switch (mainLoader) {
      case 'swc':
        return getSwcLoader(options);
      case 'esbuild':
      default:
        return getEsbuildLoader(options);
    }
  };

  return [
    getMainLoader(),
    getSvgLoader(options),
    ...getStyleLoaders(options),
    ...getAssetsLoaders(options),
  ].filter(Boolean);
};
