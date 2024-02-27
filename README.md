## ksv741-react-scripts
***

### Быстрый способ запуска React приложений для сборки и разработки, с расширяемой настройкой webpack

### Содержание

- [`Установка`](#установка)
- [`Настройка`](#настройка)
- [`Использование`](#использование)
- [`Поддерживаемые файлы`](#поддерживаемые-файлы)
- [`Кастомизация`](#кастомизация)
  - [`Режим запуска`](#режим-запуска)
  - [`Конфигурация путей`](#конфигурация-путей)
  - [`Порт`](#порт)
  - [`Загрузчики`](#загрузчики)
  - [`Анализ`](#анализ)
  - [`Плагины`](#плагины)
  - [`Лоадеры`](#лоадеры)
  - [`Resolvers`](#resolvers)
  - [`Кэширование`](#кэширование)
- [`Расширенная конфигурация`](#расширенная-конфигурация)
    
***

### Установка

#### npm

```js
npm install ksv741-react-scripts
```

#### yarn

```js
yarn add ksv741-react-scripts
```

#### pnpm

```js
pnpm install ksv741-react-scripts
```

### Настройка
Библиотека предоставляет функцию `createConfig` для быстрого создания конфигурации `webpack` c набором предустановленных плагинов и лоадеров,

1. Создание файла конфигурации webpack

```js
 // webpack.config.js
 
const { createConfig } = require('ksv741-react-scripts');

module.exports = createConfig();
```
2. Добавление файла декларации для использования различных файлов совместно с TypeScript 
```js
// global.d.ts

/// <reference types="ksv741-react-scripts/global" />
```
3. Создание файлов инициализации

```html
<!-- public/index.html -->

<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```
 
```js
// src/index.js -  также доступно использование src/index.tsx и src/index.jsx

import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root')!;
const root = createRoot(domNode);

root.render(
  <h1>
    Hello ksv741
  </h1>,
);
```

### Использование

- `npx ksv741-react-scripts start` - для разработки
- `npx ksv741-react-scripts build` - для сборки

### Поддерживаемые файлы

- JavaScript (`.js`, `.jsx`)
- TypeScript (`.ts`, `.tsx`)
- Изображения (`.png`, `.jpg`, `.jpeg`, `.gif`, `.avif`, `.webp`)
- Шрифты (`.woff`, `.woff2`, `.eot`, `.ttf`, `.otf`)
- Стилизация (`.css`, `.scss`, `.sass`)
- Иконки (`.svg`)

### Кастомизация

Если необходимо подключить уже существующий проект со своей структурой папок, 
или хотим держать единый файл конфигурации для разработки и сборки, но исходя из каких-то условий настроить пути.  
Функция `createConfig` принимает объект с конфигурацией
```js
  {
    mode?: 'development' | 'production';
    paths?: {
      assets?: string;
      build?: string;
      entry?: string[] | string;
      html?: string;
      public?: string;
      root?: string;
      src?: string;
    };
    port?: number;
    devtool?: string | false;
    mainLoader?: 'esbuild' | 'swc' | 'babel' | 'ts-loader';
    svgLoader?: 'inline' | 'svgr';
    analyze?: boolean;
    plugins?: {
      htmlWebpackPlugin?: object | 'off';
      progressPlugin?: object | 'off';
      definePlugin?: object | 'off';
      forkTsCheckerPlugin?: object | 'off';
      eslintPlugin?: object | 'off';
      reactRefreshPlugin?: object | 'off';
      miniCssPlugin?: object | 'off';
      copyPlugin?: object | 'off';
      ignorePlugin?: object | 'off';
      analyzerPlugin?: object | 'off';
    }
    loaders?: {
      babelLoader?: object | 'off';
      cssLoader?: object | 'off';
      esbuildLoader?: object | 'off';
      fontLoader?: object | 'off';
      imageLoader?: object | 'off';
      inlineSvgLoader?: object | 'off';
      miniCssLoader?: object | 'off';
      postCssLoader?: object | 'off';
      sassLoader?: object | 'off';
      styleLoader?: object | 'off';
      svgrLoader?: object | 'off';
      swcLoader?: object | 'off';
      tsLoader?: object | 'off';
    };
  }
```
#### Режим запуска

- `mode` - режим запуска.

В режиме `production` включена минификация, отключены некоторые плагины. 
Не путать с параметром запуска приложения `start`, `build`, 
возможно запустить проект для разработки в режиме `production` или сбилдить проект в режиме `development`, иногда это позволяет получить нужную информацию.  
По умолчанию - `development` для `ksv741-react-scripts start` и `production` для `ksv741-react-scripts build`

#### Конфигурация путей
`paths` - объект с настройкой путей
- `assets` - путь до директории, в которой расположены файлы которые используются непосредственно в коде.  
По умолчанию: `public/assets`
- `build` - путь до директории, в которую будут собраны файлы   
По умолчанию: `build` 
- `entry` - файл(ы) точки входа  
По умолчанию: `src/index` с расширением `.tsx`, `.jsx`, `.js`, приоритет расширений в указанном порядке.
- `html` - файла шаблона index.html  
По умолчанию `public/index.html`
- `public` - путь до директории, в которой будут храниться файлы, которые попадут в сборку, 
   относительно этого пути будут искаться файл `html`    
По умолчанию - `public`
- `root` - путь, относительно которого будут резолвиться все остальные пути  
По умолчанию: текущая директория, откуда выполнена команда запуска (`cwd`)
- `src` - путь до директории с исходными файлами, относительно которого будет находиться файл `entry`  
По умолчанию - `src`

#### Порт
- `port` - порт, в котором будет запускаться dev server, для `mode = 'production'` настройка игнорируется  
По умолчанию: `3000`

#### Загрузчики
- `mainLoader` - главный загрузчик javascript/typescript файлов, доступны `esbuild`, `swc`, `babel`, `ts-loader`     
  По умолчанию: `esbuild`
- `svgLoader` - загрузчик `svg` файлов, доступны `inline` - загрузка файла строкой, `svgr` - загрузка файла как React компонент.  
  По умолчанию: `svgr`

#### Анализ
- `analyze` - запуск сервера на порту `8888`, для анализа сборки. Рекомендуется запускать совместно с `mode = 'production'`. Но допустим запуск и в режиме `development`  
  По умолчанию: `false`

#### Devtool
- `devtool` - [формат source-map](https://webpack.js.org/configuration/devtool/)  
  По умолчанию: `eval`

#### Плагины
- `plugins` - объект с настройками плагинов

Список используемых плагинов:
- [HTMLWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)
- [ProgressPlugin](https://webpack.js.org/plugins/progress-plugin), доступен только в режиме `development`
- [DefinePlugin](https://webpack.js.org/plugins/define-plugin)
- [ForkTsCheckerWebpackPlugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin)
- [ESLintPlugin](https://github.com/webpack-contrib/eslint-webpack-plugin), доступен только в режиме `development`, а также при наличии установленного пакета `eslint`
- [ReactRefreshWebpackPlugin](https://github.com/pmmmwh/react-refresh-webpack-plugin), доступен только в режиме `development`
- [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin), доступен только в режиме `production`
- [CopyPlugin](https://webpack.js.org/plugins/copy-webpack-plugin), доступен только в режиме `production`
- [IgnorePlugin](https://webpack.js.org/plugins/ignore-plugin), доступен только в режиме `production`
- [BundleAnalyzerPlugin](https://github.com/webpack-contrib/webpack-bundle-analyzer)

Для настройки плагина необходимо передать объект с конфигурацией или строку `off` для того чтобы отключить плагин:
- `htmlWebpackPlugin` - настройка плагина [HTMLWebpackPlugin](https://github.com/jantimon/html-webpack-plugin#options)  
По умолчанию: 
  ```
  {
    template: paths.html,
    favicon: path.resolve(paths.assets, 'favicon.ico'),
    title: 'My App',
  }
  ```
- `progressPlugin` - настройка плагина [ProgressPlugin](https://webpack.js.org/plugins/progress-plugin/#providing-object)
- `definePlugin` - настройка плагина [DefinePlugin](https://webpack.js.org/plugins/define-plugin/#usage)  
По умолчанию:  
  ```js
  {
    'process.env.IS_DEV': JSON.stringify(isDev),
    'process.env.APP_VERSION': JSON.stringify(process.env.npm_package_version),
  }
  ```
- `forkTsCheckerPlugin` - настройка плагина [ForkTsCheckerWebpackPlugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin?tab=readme-ov-file#options)
- `eslintPlugin` - настройка плагина [ESLintPlugin](https://github.com/webpack-contrib/eslint-webpack-plugin?tab=readme-ov-file#options)  
По умолчанию: 
  ```
  {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    failOnError: false,
    lintDirtyModulesOnly: true,
    exclude: [
      path.resolve(paths.root, 'node_modules'),
      paths.build,
    ]
  }
  ```
- `reactRefreshPlugin` - настройка плагина [ReactRefreshWebpackPlugin](https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/API.md#options)
- `miniCssPlugin` - настройка плагина [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/#options)  
По умолчанию:  
  ```js
  {
    filename: 'static/css/[name].[contenthash:8].css',
    chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
  }
  ```
- `copyPlugin` - настройка плагина [CopyPlugin](https://webpack.js.org/plugins/copy-webpack-plugin/#options)  
По умолчанию:
  ```js
  {
    patterns: [{
      from: path.resolve(paths.root, paths.public),
      globOptions: {
        ignore: [
          path.resolve(paths.root, paths.public, paths.html),
          path.resolve(paths.root, paths.public, paths.assets),
        ],
      },
      to: path.resolve(paths.root, paths.build),
    }]
  }
  ```
- `ignorePlugin` - настройка плагина [IgnorePlugin](https://webpack.js.org/plugins/ignore-plugin/#root)  
По умолчанию: 
  ```js
  {
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/,
  }
  ```
- `analyzerPlugin` - настройка плагина [BundleAnalyzerPlugin](https://github.com/webpack-contrib/webpack-bundle-analyzer?tab=readme-ov-file#options-for-plugin)

#### Лоадеры
- `loaders` - объект с настройками лоадеров

Список используемых лоадеров:
- [esbuild-loader](https://github.com/privatenumber/esbuild-loader) - лоадер для обработки `.tsx`, `.jsx`, `.ts`, `.js`  файлов, при указании настройки [`mainLoader: 'esbuild'`](#загрузчики)
- [swc-loader](https://github.com/swc-project/pkgs/tree/main/packages/swc-loader) - лоадер для обработки `.tsx`, `.jsx`, `.ts`, `.js`  файлов, при указании настройки [`mainLoader: 'swc'`](#загрузчики)
- [babel-loader](https://github.com/babel/babel-loader) - лоадер для обработки `.tsx`, `.jsx`, `.ts`, `.js`  файлов, при указании настройки [`mainLoader: 'babel'`](#загрузчики)
- [ts-loader](https://github.com/TypeStrong/ts-loader) - лоадер для обработки `.tsx`, `.jsx`, `.ts`, `.js`  файлов, при указании настройки [`mainLoader: 'ts-loader'`](#загрузчики)
- [@svgr/webpack](https://github.com/gregberge/svgr/tree/main/packages/webpack)- лоадер для обработки `.svg` файлов, для работы с файлами, как с React компонентами
- [svg-inline-loader](https://webpack.js.org/guides/asset-modules/)- лоадер для загрузки `.svg` файлов, для строки
- [style-loader](https://webpack.js.org/loaders/style-loader/) - лоадер для вставки стилей inline элементами в html, доступен в режиме `development`
- [mini-css-loader](https://webpack.js.org/plugins/mini-css-extract-plugin/#loader-options), доступен в режиме `production` - лоадер для формирование стилей `.css` файлами
- [css-loader](https://webpack.js.org/loaders/css-loader/) - лоадер для обработки `.css` файлов
- [postcss-loader](https://webpack.js.org/loaders/postcss-loader/) - лоадер для расширение функционала CSS
- [sass-loader](https://webpack.js.org/loaders/sass-loader/) - лоадер для обработки `.sass`, `.scss` файлов  
- [image-loader](https://webpack.js.org/guides/asset-modules/) - лоадер для обработки изображений в формате `.png`, `.jpg`, `.jpeg`, `.gif`, `.avif`, `.webp`
- [font-loader](https://webpack.js.org/guides/asset-modules/) - лоадер для обработки шрифтов в формате `.woff`, `.woff2`, `.eot`, `.ttf`, `.otf`

Для настройки лоадера необходимо передать объект с конфигурацией или строку `off` для того чтобы отключить лоадер:
- `esbuilLoader` - настройки для [esbuild-loader](https://github.com/privatenumber/esbuild-loader?tab=readme-ov-file#%EF%B8%8F-options)  
По умолчанию:
  ```js
  {
    loader: 'tsx',
  }
  ```
- `swcLoader` - настройки для [swc-loader](https://swc.rs/docs/configuration/swcrc)  
По умолчанию:  
  ```js
   {
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
        },
        transform: {
          react: {
            runtime: 'automatic',
            development: isDev,
            refresh: isDev,
          },
        },
        target: 'es2015',
        loose: false,
        externalHelpers: false,
        keepClassNames: false,
      },
    },
  ```
- `babelLoader` - настройки для [babel-loader](https://github.com/babel/babel-loader?tab=readme-ov-file#options)  
По умолчанию:
  ```js
   {
      presets: [
        ['@babel/preset-env', { targets: 'defaults' }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        ['@babel/preset-typescript'],
      ],
    }
  ```
- `tsLoader` - настройки для [ts-loader](https://github.com/TypeStrong/ts-loader?tab=readme-ov-file#loader-options)
- `svgrLoader` - настройка для [@svgr/webpack](https://react-svgr.com/docs/webpack/#options)  
По умолчанию: 
  ```js
  {
    icon: true,
  }
  ```
- `inlineSvgLoader` - настройка для опции `generator` [Assets Modules](https://webpack.js.org/guides/asset-modules/)
- `styleLoader` - настройка для [style-loader](https://webpack.js.org/loaders/style-loader/#options)  
- `miniCssLoader` - настойка для [MiniCssExtractPlugin.loader](https://webpack.js.org/plugins/mini-css-extract-plugin/#loader-options)  
- `cssLoader` - настройка для [css-loader](https://webpack.js.org/loaders/css-loader/#options)   
По умолчанию:
  ```js
  {
    sourceMap: mode === 'development',
  }
  ```
- `postCssLoader` - настройка для [postcss-loader](https://webpack.js.org/loaders/postcss-loader/#options)     
По умолчанию: 
  ```js
    {
      postcssOptions: {
        plugins: [
          [
            'postcss-preset-env',
            {
              browsers: 'last 2 versions',
              autoprefixer: true,
            },
          ],
        ],
      },
    }
  ```
- `sassLoader` - настройка для [sass-loader](https://webpack.js.org/loaders/sass-loader/#options)  
По умолчанию:
  ```js
  {
    sourceMap: mode === 'development',
  }
  ```
- `imageloader` - настройка для опции `generator` [Assets Modules](https://webpack.js.org/guides/asset-modules/)   
По умолчанию: 
  ```js
  {
    filename: 'static/images/[name].[contenthash:8][ext][query]',
  }
  ```
- `fontLoader` - настройка для опции `generator` [Assets Modules](https://webpack.js.org/guides/asset-modules/)   
По умолчанию: 
  ```js
  {
    filename: 'static/fonts/[hash][ext][query]'
  }
  ```

### Resolvers
- `resolver` - объект с настройками resolvers

Список используемых плагинов:
- [TsconfigPathsPlugin](https://github.com/dividab/tsconfig-paths-webpack-plugin) 

Для настройки плагина необходимо передать объект с конфигурацией или строку `off` для того чтобы отключить плагин:

- `tsConfigPathsPlugin` - настройки плагина [TsconfigPathsPlugin](https://github.com/dividab/tsconfig-paths-webpack-plugin?tab=readme-ov-file#options)  
По умолчанию:
  ```javascript
  resolvers: {
    plugins: {
      tsConfigPathsPlugin: {
        baseUrl: process.cwd()
      }
    }
  }
  ```
  
### Кэширование
- `cache` - объект с настройками кэширования
По умолчанию:
  ```javascript
  {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename]
      }
    }
  ```
### Расширенная конфигурация
Если текущей кастомизации не достаточно или Вы хотите добавить/изменить какой-то плагин или загрузчик, 
то это можно легко сделать, т.к. функция `createConfig` возвращает обычный объект с конфигурацией webpack, который можно изменить.

Например, давайте добавим плагин [ `compression-webpack-plugin`](https://www.npmjs.com/package/compression-webpack-plugin)

```js
// webpack.config.js
const { createConfig } = require('ksv741-react-scripts');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = () => {
  const baseConfig = createConfig({
    mode: 'production',
  });

  baseConfig.plugins.push(
    new CompressionPlugin({
      algorithm: 'gzip',
    }),
  );

  return baseConfig;
};
```
