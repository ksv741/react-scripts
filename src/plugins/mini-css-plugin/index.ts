import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { WebpackOptions } from 'types';

const getMiniCssPlugin = (options: WebpackOptions) => {
  const {
    plugins: {
      miniCssPlugin,
    } = {},
  } = options;

  if (miniCssPlugin === 'off') {
    return null;
  }

  return new MiniCssExtractPlugin({
    filename: 'static/css/[name].[contenthash:8].css',
    chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    ...miniCssPlugin,
  });
};

export default getMiniCssPlugin;
