const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/pepper-help/',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "My Vue App";
        return args;
      })
  }
})
