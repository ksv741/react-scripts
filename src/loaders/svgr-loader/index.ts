import type webpack from 'webpack';
import type { WebpackOptions } from '../../types';

export const getSvgLoader = (options: WebpackOptions): webpack.RuleSetRule | null => {
  const {
    loaders: {
      svgrLoader,
    } = {},
  } = options;

  if (svgrLoader === 'off') {
    return null;
  }

  return {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [{
      loader: '@svgr/webpack',
      options: {
        icon: true,
        ...svgrLoader,
      },
    }],
  };
};
