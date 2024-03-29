import type webpack from 'webpack';
import type { WebpackOptions } from 'types';

const getSwcLoader = (options: WebpackOptions): webpack.RuleSetRule | null => {
  const {
    mode,
    loaders: {
      swcLoader,
    } = {},
    plugins: {
      reactRefreshPlugin,
    } = {},
  } = options;
  const isDev = mode === 'development';

  if (swcLoader === 'off') {
    return null;
  }

  return {
    test: /\.[j|t]sx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: require.resolve('swc-loader'),
    options: {
      ...swcLoader,
      sync: true,
      jsc: {
        loose: false,
        externalHelpers: false,
        keepClassNames: false,
        ...swcLoader?.jsc,
        parser: {
          syntax: 'typescript',
          tsx: true,
          dynamicImport: true,
          privateMethod: true,
          functionBind: true,
          exportDefaultFrom: true,
          exportNamespaceFrom: true,
          decorators: true,
          decoratorsBeforeExport: true,
          topLevelAwait: true,
          importMeta: true,
          ...swcLoader?.jsc?.parser,
        },
        transform: {
          ...swcLoader?.jsc?.transform,
          react: {
            runtime: 'automatic',
            development: isDev,
            refresh: isDev && reactRefreshPlugin !== 'off',
            ...swcLoader?.jsc?.transform?.react,
          },
        },
      },
    },
  };
};

export default getSwcLoader;
