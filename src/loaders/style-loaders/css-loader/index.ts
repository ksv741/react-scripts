// todo fixme
/* eslint-disable @typescript-eslint/no-unsafe-assignment, no-unsafe-optional-chaining, @typescript-eslint/no-unsafe-member-access, no-nested-ternary */
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type webpack from 'webpack';
import type { WebpackOptions } from 'types';

const getCssLoader = (options: WebpackOptions): webpack.RuleSetRule => {
  const {
    mode,
    loaders: {
      styleLoader,
      miniCssLoader,
      cssLoader,
      postCssLoader,
    } = {},
  } = options;
  const isDev = mode === 'development';

  return {
    test: /\.css$/,
    use: [
      isDev
        ? styleLoader === 'off'
          ? null
          : {
            loader: require.resolve('style-loader'),
            options: styleLoader,
          }
        : miniCssLoader === 'off'
          ? null
          : {
            loader: MiniCssExtractPlugin.loader,
            options: miniCssLoader,
          },
      cssLoader === 'off'
        ? null
        : {
          loader: require.resolve('css-loader'),
          options: {
            sourceMap: isDev,
            ...cssLoader,
            modules: {
              localIdentName: '[local]--[hash:5]',
              // @ts-ignore
              ...cssLoader?.modules,
            },
          },
        },
      postCssLoader === 'off'
        ? null
        : {
          loader: require.resolve('postcss-loader'),
          options: {
            ...postCssLoader,
            postcssOptions: {
              ...postCssLoader?.postcssOptions,
              plugins: [
                [
                  'postcss-preset-env',
                  {
                    browsers: 'last 2 versions',
                    autoprefixer: true,
                  },
                ],
                ...postCssLoader?.postcssOptions?.plugins ?? [],
              ].filter(Boolean),
            },
            sourceMap: isDev,
          },
        },
    ].filter(Boolean),
  };
};

export default getCssLoader;
