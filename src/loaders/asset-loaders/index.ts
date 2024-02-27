import type webpack from 'webpack';
import type { WebpackOptions } from '../../types';
import { getFontLoader } from './font-loader';
import { getImageLoader } from './image-loader';

export const getAssetsLoaders = (options: WebpackOptions): (webpack.RuleSetRule | null)[] => [
  getImageLoader(options),
  getFontLoader(options),
];
