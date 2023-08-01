/**
 * 在这里定义和登录注册相关的路由处理函数
 * 供/router/admin.js模块进行调用
 */

const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

const AdminModel = require('../models/AdminModel')

// 注册用户的处理函数
exports.register = (req, res) => {
  const adminInfo = req.body
  if (!adminInfo.name || !adminInfo.password) {
    return res.json({ status: 400, message: '用户名或者密码为空！' })
  }

  AdminModel.findOne({ name: adminInfo.name }).then(data => {
    if (data) {
      return res.status(400).json('用户名已被注册!');
    }
    else {
      const newAdmin = new AdminModel({
        name: req.body.name,
        password: req.body.password,
        identity: req.body.identity
      })
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin.save()
            .then(data => res.json(data))
            .catch(err => console.log(err))
        })
      })
    }
  })
}

// 登录的处理函数
exports.login = (req, res) => {
  const adminInfo = req.body

  AdminModel.findOne({ name: adminInfo.name }).then((data) => {
    if (!data) {
      return res.status(400).json('用户不存在!')
    }

    // 拿着用户输入的密码，和数据库中存储的密码进行对比
    const compareResult = bcrypt.compareSync(adminInfo.password, data.password)

    // 如果对比的结果为false,则证明用户输入的密码错误
    if (!compareResult) {
      return res.status(400).json('用户名或密码输入错误，请重新输入')
    }

    const admin = { ...data, password: '' }
    // 生成 token
    const tokenStr = jwt.sign(admin, config.jwtSecretKey, {
      expiresIn: '7 days' // token 有效期为 7 天
    })
    // // 将生成的 Token 字符串响应给客户端
    res.json({
      status: 200,
      message: '登录成功！',
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      token: 'Bearer ' + tokenStr,
    })
  })
}
