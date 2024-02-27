import fs from 'fs';
import type { PackageJson } from 'types';

export const hasPackage = (packageName: string) => {
  if (!packageName) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-non-null-assertion
  const packageJson: PackageJson = JSON.parse(fs.readFileSync(process.env.npm_package_json!, 'utf8'));

  return Boolean(packageJson.dependencies[packageName] || packageJson.devDependencies[packageName]);
};
