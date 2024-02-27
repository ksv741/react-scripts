import ESLintPlugin from 'eslint-webpack-plugin';
import path from 'path';
import type { WebpackOptions } from '../../types';

export const getEslintPlugin = (options: WebpackOptions) => {
  const {
    paths,
    plugins: {
      eslintPlugin,
    } = {},
  } = options;

  const hasEslintPackage = Boolean(process.env.npm_package_dependencies_eslint
    ?? process.env.npm_package_devDependencies_eslint);

  if (!hasEslintPackage || eslintPlugin === 'off') {
    return null;
  }

  const getExcludeArray = () => {
    // todo fixme
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!eslintPlugin?.exclude) {
      return [];
    }

    if (Array.isArray(eslintPlugin.exclude)) {
      return eslintPlugin.exclude;
    }

    return [eslintPlugin.exclude];
  };

  return new ESLintPlugin({
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    failOnError: false,
    lintDirtyModulesOnly: true,
    exclude: [
      path.resolve(paths.root, 'node_modules'),
      paths.build,
      ...getExcludeArray(),
    ].filter(Boolean),
    ...eslintPlugin,
  });
};
