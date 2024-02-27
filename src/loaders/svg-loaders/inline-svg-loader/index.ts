import type { WebpackOptions } from 'types';

const getInlineSvgLoader = (options: WebpackOptions) => {
  const {
    loaders: {
      inlineSvgLoader,
    } = {},
  } = options;

  if (inlineSvgLoader === 'off') {
    return null;
  }

  return {
    test: /\.svg$/i,
    type: 'asset/source',
    generator: {
      filename: 'static/icons/[hash][ext][query]',
      ...inlineSvgLoader,
    },
  };
};

export default getInlineSvgLoader;
