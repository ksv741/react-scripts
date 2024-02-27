import * as fs from 'fs';
import path from 'path';
import process from 'process';
import type webpack from 'webpack';
import { createDevServer } from '../dev-server';
import { createLoaders } from '../loaders';
import { getOptimization } from '../optimization';
import { createOutput } from '../output';
import { createPlugins } from '../plugins';
import { createResolvers } from '../resolvers';
import type { WebpackMode, WebpackOptions, WebpackPaths } from '../types';

const getDefaultEntryPath = (rootDir: string) => {
  const indexTsx = path.resolve(rootDir, 'index.tsx');
  const indexJsx = path.resolve(rootDir, 'index.jsx');
  const indexJs = path.resolve(rootDir, 'index.js');

  switch (true) {
    case fs.existsSync(indexTsx):
      return indexTsx;

    case fs.existsSync(indexJsx):
      return indexJsx;

    case fs.existsSync(indexJs):
      return indexJs;

    default:
      throw new Error(`Has no index.tsx/index.jsx/index.js file in ${rootDir} directory`);
  }
};

const getDefaultPaths = (initialPaths?: WebpackPaths): WebpackPaths => {
  const root = initialPaths?.root ?? path.resolve(process.cwd());
  const publicPath = initialPaths?.public ?? path.resolve(root, 'public');
  const src = initialPaths?.src ?? path.resolve(root, 'src');
  const assets = initialPaths?.assets ?? path.resolve(publicPath, 'assets');
  const build = initialPaths?.build ?? path.resolve(root, 'build');
  const entry = getDefaultEntryPath(src);
  const html = initialPaths?.html ?? path.resolve(publicPath, 'index.html');

  return {
    root,
    public: publicPath,
    assets,
    src,
    entry,
    build,
    html,
  };
};

const getDefaultMode = (): WebpackMode => {
  const isServe = process.argv.slice(2)[0] === 'serve';

  return isServe ? 'development' : 'production';
};

const createConfig = (params?: WebpackOptions): webpack.Configuration => {
  const {
    mode = getDefaultMode(),
    analyze = false,
    mainLoader = 'esbuild',
    port = 3000,
    devtool = 'inline-source-map',
    plugins,
  } = params ?? {};
  const {
    assets,
    html,
    build,
    root,
    entry,
    public: publicPath,
    src,
  } = getDefaultPaths(params?.paths);

  if (!fs.existsSync(html)) {
    throw new Error(`index.html file not found. Define path to index.html file or create one in "${publicPath}" directory`);
  }

  const options: WebpackOptions = {
    mode,
    analyze,
    mainLoader,
    port,
    paths: {
      assets,
      html,
      build,
      root,
      entry,
      src,
      public: publicPath,
    },
    plugins,
  };

  const isDev = mode === 'development';

  return {
    mode,
    entry,
    output: createOutput(options),
    plugins: createPlugins(options),
    module: {
      rules: createLoaders(options),
    },
    resolve: createResolvers(options),
    devtool: isDev ? devtool : false,
    devServer: createDevServer(options),
    // eslint-disable-next-line no-undefined
    optimization: !isDev ? getOptimization(options) : undefined,
  };
};

export { createConfig };
