import type webpack from 'webpack';
import type { WebpackOptions } from '../../types';

export const getSwcLoader = (options: WebpackOptions): webpack.RuleSetRule | null => {
  const {
    mode,
    loaders: {
      swcLoader,
    } = {},
  } = options;
  const isDev = mode === 'development';

  if (swcLoader === 'off') {
    return null;
  }

  return {
    test: /\.[j|t]sx?$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'swc-loader',
      options: {
        sync: true,
        jsc: {
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
            react: {
              runtime: 'automatic',
              development: isDev,
              refresh: isDev,
              ...swcLoader?.jsc?.transform?.react,
            },
            ...swcLoader?.jsc?.transform,
          },
          target: 'es2015',
          loose: false,
          externalHelpers: false,
          keepClassNames: false,
          ...swcLoader?.jsc,
        },
        ...swcLoader,
      },
    },
  };
};
