const db = require('./db')

db(() => {


  const express = require('express')
  const cors = require('cors')

  // 导入路由
  const adminRouter = require('./router/admin')
  const userInfoRouter = require('./router/userInfo')

  const app = express()

  // 全局中间件
  app.use(cors())
  // 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
  app.use(express.urlencoded({ extended: false }))

  // 路由
  app.use('/api/admin', adminRouter)
  app.use('/api/user', userInfoRouter)

  app.listen(3000, () => {
    console.log('Funds management api server running at http://127.0.0.3000:')
  })

})