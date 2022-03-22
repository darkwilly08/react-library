/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({
      flexbox: 'no-2009',
    }),
  ],
};
