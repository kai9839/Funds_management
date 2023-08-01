// 导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 这里直接要用路由处理函数模块 不懂的可以看前一篇博客
const userHandler = require('../router_handler/userInfo_handler')

// 新增
router.post('/add', userHandler.userAdd)

// 查询所有数据
router.get('/allUsers', userHandler.userAll)

// 编辑
router.post('/edit/:id', userHandler.userEdit)

// 删除
router.delete('/delete/:id', userHandler.userDelete)

// 向外共享对象
module.exports = router
