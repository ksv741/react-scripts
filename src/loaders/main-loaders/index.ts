import type { WebpackOptions } from 'types';
import getTsLoader from './ts-loader';
import getBabelLoader from './babel-loader';
import getSwcLoader from './swc-loader';
import getEsbuildLoader from './esbuild-loader';

const getMainLoader = (options: WebpackOptions) => {
  const {
    mainLoader = 'esbuild',
  } = options;

  switch (mainLoader) {
    case 'babel':
      return getBabelLoader(options);
    case 'ts-loader':
      return getTsLoader(options);
    case 'swc':
      return getSwcLoader(options);
    case 'esbuild':
    default:
      return getEsbuildLoader(options);
  }
};

export default getMainLoader;
