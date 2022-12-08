const CracoLessPlugin = require("craco-less");
const path = require("path");
const theme = require("./theme");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: theme, //配置主题
            javascriptEnabled: true,
          },
        },
      },
      devServer: {
        //本地代理
        proxy: {
          "/hehe": {
            target: "https://shopapi.smartisan.com",
            pathRewrite: {
              "^/hehe": "",
            },
            changeOrigin: true,
          },
        },
      },
    },
  ],
};
