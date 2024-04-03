import fs from 'fs';
import type { WebpackOptions } from 'types';

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { REACT_APP } from 'utils/constants';
import { resolveApp } from 'utils/helpers';

const dotenvPath = resolveApp('.env');
const dotenvFiles = [
  `${dotenvPath}.${process.env.NODE_ENV}.local`,
  process.env.NODE_ENV !== 'test' && `${dotenvPath}.local`,
  `${dotenvPath}.${process.env.NODE_ENV}`,
  dotenvPath,
].filter(Boolean);

dotenvFiles.forEach((dotenvFile) => {
  if (!dotenvFile) {
    return;
  }

  if (fs.existsSync(dotenvFile)) {
    dotenvExpand.expand(dotenv.configDotenv({
      path: dotenvFile,
    }));
  }
});

export const getClientEnvironment = (options: WebpackOptions) => {
  const { mode } = options;
  const isDev = mode === 'development';

  const raw = Object.keys(process.env)
    .filter((key) => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        env[key] = process.env[key];

        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV,
        IS_DEV: isDev,
        APP_VERSION: process.env.npm_package_version,
      },
    );

  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      env[key] = JSON.stringify(raw[key]);

      return env;
    }, {}),
  };

  return {
    raw,
    stringified,
  };
};
