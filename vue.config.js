const { defineConfig } = require("@vue/cli-service");
const opts = {
  pluginOptions: {
    electronBuilder: {
      // nodeIntergration: true
      preload: "src/preload.js"
      // mainProcessFile: "./src/electron/background.js",
      // rendererProcessFile: "./src/app/main.js",
      // mainProcessWatch: ["electron/index.js", "src/main.js"],
    }
  }
}

module.exports = defineConfig({
  ...opts,
  transpileDependencies: true,
});
