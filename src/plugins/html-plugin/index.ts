import fs from 'fs';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import type { WebpackOptions } from 'types';

const getHtmlPlugin = (options: WebpackOptions) => {
  const {
    paths,
    plugins: {
      htmlWebpackPlugin,
    } = {},
  } = options;

  if (htmlWebpackPlugin === 'off') {
    return null;
  }

  if (!fs.existsSync(paths.html)) {
    throw new Error(`index.html file not found. Define path to index.html file or create one in "${paths.public}" directory`);
  }

  const isExistFavicon = fs.existsSync(path.resolve(paths.assets, 'favicon.ico'));

  return new HTMLWebpackPlugin({
    template: paths.html,
    favicon: isExistFavicon && path.resolve(paths.assets, 'favicon.ico'),
    title: 'My App',
    ...htmlWebpackPlugin,
  });
};

export default getHtmlPlugin;
