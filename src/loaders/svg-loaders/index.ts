import getInlineSvgLoader from 'loaders/svg-loaders/inline-svg-loader';
import getSvgrLoader from 'loaders/svg-loaders/svgr-loader';
import type { WebpackOptions } from 'types';

const getSvgLoader = (options: WebpackOptions) => {
  const {
    svgLoader = 'svgr',
  } = options;

  switch (svgLoader) {
    case 'inline':
      return getInlineSvgLoader(options);

    case 'svgr':
    default:
      return getSvgrLoader(options);
  }
};

export default getSvgLoader;
