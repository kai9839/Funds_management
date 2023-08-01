//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let AdminSchema = new mongoose.Schema({
  // 用户名
  name: {
    type: String,
    required: true
  },
  // 密码
  password: {
    type: String,
    required: true
  },
  // 时间
  date: Date,
  identity: {
    type: String
  }
});

//创建模型对象  对文档操作的封装对象
let AdminModel = mongoose.model('admins', AdminSchema);

//暴露模型对象
module.exports = AdminModel;
