const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
          }
        }
      ]
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://106.ihuyi.com',//这里填入你要请求的接口的前缀
        ws:true,//代理websocked
        changeOrigin:true,//虚拟的站点需要更管origin
        pathRewrite:{
          '^/api':''//重写路径
        }
      }
    }
  }
})
