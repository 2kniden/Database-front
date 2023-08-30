const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // proxyTable: {
  //   '/api':{
  //     target: "http://8.130.25.70:5555",
  //     changeOrigin:true,
  //     pathRewrite:{
  //         '^/api':''
  //     }
  //   }
  // },
  transpileDependencies: true
})
