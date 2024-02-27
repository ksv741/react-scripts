import path from 'path';
import type webpack from 'webpack';
import type { WebpackOptions } from 'types';

const createOutput = (options: WebpackOptions): webpack.Configuration['output'] => {
  const {
    paths,
    mode,
  } = options;

  const isDev = mode === 'development';

  const devOutput: webpack.Configuration['output'] = {
    filename: '[name][fullhash].js',
    path: path.resolve(paths.build),
    publicPath: '/',
  };

  const productionOutput: webpack.Configuration['output'] = {
    filename: 'static/js/[name].[contenthash:8].js',
    path: path.resolve(paths.build),
    publicPath: '/',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    clean: true,
    assetModuleFilename: 'static/assets/[hash][ext][query]',
  };

  return isDev ? devOutput : productionOutput;
};

export default createOutput;
