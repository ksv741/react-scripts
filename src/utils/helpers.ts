import fs from 'fs';
import path from 'path';
import type { PackageJson } from 'types';

export const getPackageVersion = (packageName: string) => {
  if (!packageName || !process.env.npm_package_json) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const packageJson: PackageJson = JSON.parse(fs.readFileSync(process.env.npm_package_json, 'utf8'));

  return packageJson.dependencies[packageName] || packageJson.devDependencies[packageName];
};

export const hasPackage = (packageName: string) => Boolean(getPackageVersion(packageName));

export const appDirectory = fs.realpathSync(process.cwd());

export const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);
