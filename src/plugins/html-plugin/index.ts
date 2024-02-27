import HTMLWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import type { WebpackOptions } from '../../types';

export const getHtmlPlugin = (options: WebpackOptions) => {
  const {
    paths,
    plugins: {
      htmlWebpackPlugin,
    } = {},
  } = options;

  if (htmlWebpackPlugin === 'off') {
    return null;
  }

  return new HTMLWebpackPlugin({
    template: paths.html,
    favicon: path.resolve(paths.assets, 'favicon.ico'),
    title: 'My App',
    ...htmlWebpackPlugin,
  });
};
