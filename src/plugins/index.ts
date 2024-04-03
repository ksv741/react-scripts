import type webpack from 'webpack';
import type { WebpackOptions } from 'types';
import getProvidePlugin from './provide-plugin';
import getBundleAnalyzerPlugin from './bundle-analyzer-plugin';
import getCopyPlugin from './copy-plugin';
import getDefinePlugin from './define-plugin';
import getEslintPlugin from './eslint-plugin';
import getForkTsCheckerPlugin from './fork-ts-checker-plugin';
import getHtmlPlugin from './html-plugin';
import getIgnorePlugin from './ignore-plugin';
import getMiniCssPlugin from './mini-css-plugin';
import getProgressPlugin from './progress';
import getReactRefreshPlugin from './react-refresh-plugin';

const createPlugins = (options: WebpackOptions): webpack.Configuration['plugins'] => {
  const {
    mode,
  } = options;
  const isDev = mode === 'development';

  const developmentPlugins = [
    getHtmlPlugin(options),
    getProgressPlugin(options),
    getProvidePlugin(options),
    getDefinePlugin(options),
    getForkTsCheckerPlugin(options),
    getEslintPlugin(options),
    getReactRefreshPlugin(options),
    getBundleAnalyzerPlugin(options),
  ];

  const productionPlugins = [
    getHtmlPlugin(options),
    getProvidePlugin(options),
    getDefinePlugin(options),
    getMiniCssPlugin(options),
    getForkTsCheckerPlugin(options),
    getCopyPlugin(options),
    getIgnorePlugin(options),
    getBundleAnalyzerPlugin(options),
  ];

  const plugins = isDev ? developmentPlugins : productionPlugins;

  // @ts-ignore
  return plugins.filter(Boolean);
};

export default createPlugins;
