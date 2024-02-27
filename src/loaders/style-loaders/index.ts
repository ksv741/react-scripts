import type webpack from 'webpack';
import type { WebpackOptions } from '../../types';
import { getCssLoader } from './css-loader';
import { getSassLoader } from './sass-loader';

export const getStyleLoaders = (options: WebpackOptions): (webpack.RuleSetRule | null)[] => [
  getCssLoader(options),
  getSassLoader(options),
];
