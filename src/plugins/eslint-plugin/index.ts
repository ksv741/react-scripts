import ESLintPlugin from 'eslint-webpack-plugin';
import path from 'path';
import semver from 'semver';
import type { WebpackOptions } from 'types';
import { getPackageVersion, hasPackage } from 'utils/helpers';

const getEslintPlugin = (options: WebpackOptions) => {
  const {
    paths,
    plugins: {
      eslintPlugin,
    } = {},
  } = options;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (!hasPackage('eslint') || eslintPlugin === 'off' || semver.lt(getPackageVersion('eslint')!, '8.0.0')) {
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
