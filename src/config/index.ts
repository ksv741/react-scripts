import getCache from 'cache';
import * as fs from 'fs';
import path from 'path';
import process from 'process';
import type webpack from 'webpack';
import createDevServer from 'dev-server';
import createLoaders from 'loaders';
import getOptimization from 'optimization';
import createOutput from 'output';
import createPlugins from 'plugins';
import createResolvers from 'resolvers';
import type { WebpackMode, WebpackOptions, WebpackPaths } from 'types';

const getDefaultEntryPath = (rootDir: string, some?: string[] | string): string[] | string => {
  if (Array.isArray(some)) {
    // @ts-ignore
    return some.map((entry) => getDefaultEntryPath(rootDir, entry));
  }

  if (some && path.isAbsolute(some)) {
    return some;
  }

  const definedFile = some && path.resolve(rootDir, some);
  const indexTsx = path.resolve(rootDir, 'index.tsx');
  const indexTs = path.resolve(rootDir, 'index.ts');
  const indexJsx = path.resolve(rootDir, 'index.jsx');
  const indexJs = path.resolve(rootDir, 'index.js');

  switch (true) {
    case definedFile && fs.existsSync(definedFile):
      return definedFile;

    case fs.existsSync(indexTsx):
      return indexTsx;

    case fs.existsSync(indexTs):
      return indexTs;

    case fs.existsSync(indexJsx):
      return indexJsx;

    case fs.existsSync(indexJs):
      return indexJs;

    default:
      throw new Error(`Has no ${definedFile ?? 'index.tsx/index.ts/index.jsx/index.js'} file in ${rootDir} directory`);
  }
};

const getDefaultPath = ({ root, defaultDirectory, currentPath }: Record<string, string | undefined>) => {
  if (!currentPath) {
    // @ts-ignore
    return path.resolve(root, defaultDirectory);
  }

  if (path.isAbsolute(currentPath)) {
    return currentPath;
  }

  // @ts-ignore
  return path.resolve(root, currentPath);
};

const getDefaultPaths = (initialPaths?: WebpackPaths): WebpackPaths => {
  const root = initialPaths?.root ?? path.resolve(process.cwd());

  const publicPath = getDefaultPath({
    root,
    defaultDirectory: 'public',
    currentPath: initialPaths?.public,
  });
  const src = getDefaultPath({
    root,
    defaultDirectory: 'src',
    currentPath: initialPaths?.src,
  });
  const assets = getDefaultPath({
    root: publicPath,
    defaultDirectory: 'assets',
    currentPath: initialPaths?.assets,
  });
  const build = getDefaultPath({
    root,
    defaultDirectory: 'build',
    currentPath: initialPaths?.build,
  });
  const html = getDefaultPath({
    root: publicPath,
    defaultDirectory: 'index.html',
    currentPath: initialPaths?.html,
  });
  const entry = getDefaultEntryPath(src, initialPaths?.entry);

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
    mainLoader,
    svgLoader,
    port = 3000,
    devtool = 'inline-source-map',
    plugins,
    loaders,
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

  const options: WebpackOptions = {
    mode,
    analyze,
    mainLoader,
    svgLoader,
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
    loaders,
  };

  const isDev = mode === 'development';

  return {
    context: process.cwd(),
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
    cache: getCache(options),
  };
};

export default createConfig;
