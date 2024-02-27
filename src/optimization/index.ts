import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import type webpack from 'webpack';
import type { WebpackOptions } from '../types';

export const getOptimization = (options: WebpackOptions): webpack.Configuration['optimization'] => {
  const {
    mode,
  } = options;
  const isDev = mode === 'development';

  return {
    minimize: !isDev,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    runtimeChunk: {
      name: (entrypoint: { name: string }) => `runtime-${entrypoint.name}`,
    },
  };
};
