import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import type { WebpackOptions } from 'types';

const getBundleAnalyzerPlugin = (options: WebpackOptions) => {
  const {
    analyze,
    plugins: {
      analyzerPlugin,
    } = {},
  } = options;

  if (!analyze || analyzerPlugin === 'off') {
    return null;
  }

  return new BundleAnalyzerPlugin(analyzerPlugin);
};

export default getBundleAnalyzerPlugin;
