module.exports = (config) => {
  config.addPassthroughCopy('src/css');
  config.addPassthroughCopy('src/images');
  config.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy("_redirects");

  return {
    dir: {
      input: 'src',
    },
  };
};
