// todo fixme
/* eslint-disable @typescript-eslint/no-unsafe-assignment, no-unsafe-optional-chaining, @typescript-eslint/no-unsafe-member-access, no-nested-ternary */
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type webpack from 'webpack';
import type { WebpackOptions } from '../../../types';

export const getCssLoader = (options: WebpackOptions): webpack.RuleSetRule => {
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
            loader: 'style-loader',
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
          loader: 'css-loader',
          options: {
            sourceMap: isDev,
            ...cssLoader,
          },
        },
      postCssLoader === 'off'
        ? null
        : {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
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
              ...postCssLoader?.postcssOptions,
            },
            ...postCssLoader,
          },
        },
    ].filter(Boolean),
  };
};
