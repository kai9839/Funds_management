const UserModel = require("../models/UserModel");

// 添加用户
exports.userAdd = (req, res) => {
  const fields = { ...req.body }

  UserModel(fields)
    .save()
    .then((data) => {
      res.json({
        msg: '添加成功！',
        data: data
      })
    }).catch(err => {
      return res.status(400).json(err)
    })
}

// 查询所有用户
exports.userAll = (req, res) => {
  UserModel.find().then(data => {
    res.json({
      msg: '查询成功！',
      data: data
    })
  }).catch(err => {
    return res.status(400).json(err)
  })
}

// 编辑
exports.userEdit = (req, res) => {

  UserModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set:
        { ...req.body }
    },
    { new: true }
  ).then(data => {
    res.json({
      msg: '修改成功！',
      data: data
    })
  }).catch(err => {
    res.status(400).json(err)
  })
}

// 删除
exports.userDelete = (req, res) => {
  UserModel.findOneAndRemove({ _id: req.params.id }).then(data => {
    res.json({
      msg: '删除成功！',
      data: data
    })
  }).catch(err => {
    res.status(400).json('删除失败！')
  })
}