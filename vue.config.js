const port = 8097
const env = process.env.NODE_ENV
console.log(env)
module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  devServer: {
    port,
    host: '0.0.0.0',
    // host: '192.168.0.172',
    https: false,
    open: true, //配置自动启动浏览器
    overlay: {
      warning: true,
      errors: true
    }
  }
}
