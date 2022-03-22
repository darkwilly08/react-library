module.exports = {
  stories: ['../**/*.stories.@(js|mdx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      // use: [
      //   'style-loader',
      //   {
      //     loader: 'css-loader',
      //     options: {
      //       importLoaders: 1,
      //       modules: true,
      //     },
      //   },
      //   'sass-loader',
      // ],
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });
    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    });
    return config;
  },
};
