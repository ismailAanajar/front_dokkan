import type { StorybookConfig } from '@storybook/nextjs';

const path = require('path');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: '@storybook/addon-styling',
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: true,
      },
    },
  ],
  webpackFinal: async (config, { configType }) => {
    //@ts-ignore
    config.resolve.alias = {
    //@ts-ignore

      ...config.resolve.alias,
      '@dokkan': path.resolve(__dirname, "../src/"),
    };

    return config;
  }   ,
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
