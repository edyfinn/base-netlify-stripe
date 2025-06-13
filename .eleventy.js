module.exports = (config) => {
  config.addPassthroughCopy('src/css');
  config.addPassthroughCopy('src/images');
  config.addPassthroughCopy('src/js');
  config.addPassthroughCopy("_redirects");

  return {
    dir: {
      input: 'src',
    },
  };
};
