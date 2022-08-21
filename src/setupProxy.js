const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      //表示存储当前数据的目标路径
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  )
}
