import type { ReactRefreshPluginOptions } from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types';
import type { Config as SvgrLoaderOptions } from '@svgr/core';
import type { Config as SwcLoaderOptions } from '@swc/core';
import type CopyPlugin from 'copy-webpack-plugin';
import type { LoaderOptions as EsbuildLoaderOptions } from 'esbuild-loader';
import type ESLintWebpackPlugin from 'eslint-webpack-plugin';
import type { ForkTsCheckerWebpackPluginOptions } from 'fork-ts-checker-webpack-plugin/lib/plugin-options';
import type HtmlWebpackPlugin from 'html-webpack-plugin';
import type MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { LoaderOptions as MiniCssLoaderOptions } from 'mini-css-extract-plugin';
import type { PostCSSLoaderOptions } from 'postcss-loader/dist/config';
import type webpack from 'webpack';
import type { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import type SassLoader from 'sass-loader';

type WebpackMode = 'development' | 'production';

type WebpackMainLoaders = 'esbuild' | 'swc';

type WebpackPaths = {
  entry: string[] | string;
  build: string;
  root: string;
  html: string;
  src: string;
  public: string;
  assets: string;
};

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace AssetsLoader {
  type Options = {
    filename?: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace StyleLoader {
  type InjectType =
    'autoStyleTag' | 'lazyAutoStyleTag' | 'lazySingletonStyleTag' | 'lazyStyleTag' | 'linkTag' | 'singletonStyleTag' | 'styleTag';

  type Insert =
    | string
    | ((htmlElement: HTMLElement, options: Record<string, unknown>) => void);

  type Attributes = Record<string, unknown>;

  type StyleTagTransform =
    | string
    | ((
      css: string,
      styleElement: HTMLStyleElement,
      options: Record<string, unknown>
    ) => void);

  type Base = number;

  type EsModule = boolean;

  type Options = {
    injectType?: InjectType;
    attributes?: Attributes;
    insert?: Insert;
    styleTagTransform?: StyleTagTransform;
    base?: Base;
    esModule?: EsModule;
  };
}

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace CssLoader {
  type Url =
    | boolean
    | {
      filter: (url: string, resourcePath: string) => boolean;
    };

  type ImportFn =
    | boolean
    | {
      filter: (
        url: string,
        media: string,
        resourcePath: string,
        supports?: string,
        layer?: string
      ) => boolean;
    };
  type Modules =
    boolean | 'global' | 'icss' | 'local' | 'pure' | {
      auto: RegExp | boolean | ((resourcePath: string) => boolean);
      mode:
      'global' | 'icss' | 'local' | 'pure' | ((resourcePath: string) => 'global' | 'icss' | 'local' | 'pure');
      localIdentName: string;
      localIdentContext: string;
      localIdentHashSalt: string;
      localIdentHashFunction: string;
      localIdentHashDigest: string;
      localIdentRegExp: RegExp | string;
      getLocalIdent: (
        // @ts-ignore
        context: webpack.loader.LoaderContext,
        localIdentName: string,
        localName: string
      ) => string;
      namedExport: boolean;
      exportGlobals: boolean;
      exportLocalsConvention:
        | 'asIs'
        | 'camelCase'
        | 'camelCaseOnly'
        | 'dashes'
        | 'dashesOnly'
        | ((name: string) => string);
      exportOnlyLocals: boolean;
    };
  type SourceMap = boolean;
  type ImportLoaders = number;
  type EsModule = boolean;
  type ExportType = 'array' | 'css-style-sheet' | 'string';

  type Options = {
    url?: Url;
    import?: ImportFn;
    modules?: Modules;
    sourceMap?: SourceMap;
    importLoaders?: ImportLoaders;
    esModule?: EsModule;
    exportType?: ExportType;
  };
}

type WebpackOptions = {
  mode: WebpackMode;
  paths: WebpackPaths;
  port: number;
  mainLoader: WebpackMainLoaders;
  analyze: boolean;
  devtool?: webpack.Configuration['devtool'];
  plugins?: {
    htmlWebpackPlugin?: HtmlWebpackPlugin.Options | 'off';
    progressPlugin?: ConstructorParameters<typeof webpack.ProgressPlugin>[0] | 'off';
    definePlugin?: ConstructorParameters<typeof webpack.DefinePlugin>[0] | 'off';
    forkTsCheckerPlugin?: ForkTsCheckerWebpackPluginOptions | 'off';
    eslintPlugin?: ESLintWebpackPlugin.Options | 'off';
    reactRefreshPlugin?: ReactRefreshPluginOptions | 'off';
    miniCssPlugin?: MiniCssExtractPlugin.PluginOptions | 'off';
    copyPlugin?: CopyPlugin.PluginOptions | 'off';
    ignorePlugin?: ConstructorParameters<typeof webpack.IgnorePlugin>[0] | 'off';
    analyzerPlugin?: BundleAnalyzerPlugin.Options | 'off';
  };
  loaders?: {
    esbuildLoader?: EsbuildLoaderOptions | 'off';
    swcLoader?: SwcLoaderOptions | 'off';
    svgrLoader?: SvgrLoaderOptions | 'off';
    styleLoader?: StyleLoader.Options | 'off';
    cssLoader?: CssLoader.Options | 'off';
    miniCssLoader?: MiniCssLoaderOptions | 'off';
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    postCssLoader?: PostCSSLoaderOptions | 'off';
    sassLoader?: SassLoader.Options | 'off';
    imageLoader?: AssetsLoader.Options | 'off';
    fontLoader?: AssetsLoader.Options | 'off';
  };
};

type WebpackEnv = {
  mode?: WebpackMode;
  port?: number;
  mainLoader?: WebpackMainLoaders;
  analyze?: boolean;
};

export type {
  WebpackMode,
  WebpackPaths,
  WebpackOptions,
  WebpackEnv,
  WebpackMainLoaders,
};
