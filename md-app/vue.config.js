const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      fallback: {
        "querystring": require.resolve("querystring-es3")
      }
    }
  }
}