import type webpack from 'webpack';
import type { WebpackOptions } from '../../../types';

export const getImageLoader = (options: WebpackOptions): webpack.RuleSetRule | null => {
  const {
    loaders: {
      imageLoader,
    } = {},
  } = options;

  if (imageLoader === 'off') {
    return null;
  }

  return {
    test: /\.(png|jpg|jpeg|gif|avif|webp)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'static/images/[name].[contenthash:8][ext][query]',
      ...imageLoader,
    },
  };
};
