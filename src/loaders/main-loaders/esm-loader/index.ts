const getEsmLoader = () => ({
  test: /\.m?js/,
  resolve: {
    fullySpecified: false,
  },
});

export default getEsmLoader;
