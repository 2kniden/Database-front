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
      '/code': {
        target: 'http://106.ihuyi.com',//这里填入你要请求的接口的前缀
        changeOrigin:true,//虚拟的站点需要更管origin
        pathRewrite:{
          '^/code':''//重写路径
        }
      },
      '/api':{
        target: "http://8.130.25.70:5000/api",
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  },
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
