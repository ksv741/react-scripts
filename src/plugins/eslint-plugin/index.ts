import ESLintPlugin from 'eslint-webpack-plugin';
import path from 'path';
import type { WebpackOptions } from 'types';
import { hasPackage } from 'utils/helpers';

const getEslintPlugin = (options: WebpackOptions) => {
  const {
    paths,
    plugins: {
      eslintPlugin,
    } = {},
  } = options;

  if (!hasPackage('eslint') || eslintPlugin === 'off') {
    return null;
  }

  return new ESLintPlugin({
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    failOnError: false,
    lintDirtyModulesOnly: true,
    ...eslintPlugin,
    exclude: [
      path.resolve(paths.root, 'node_modules'),
      paths.build,
      ...eslintPlugin?.exclude ?? [],
    ].filter(Boolean),
  });
};

export default getEslintPlugin;
