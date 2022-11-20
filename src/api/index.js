// 将4个模块请求的接口函数统一暴露

// 全部引入
import * as trademark from './product/trademark';
import * as attr from './product/attr';
import * as spu from './product/spu';
import * as sku from './product/sku';

// 引入权限相关的接口文件
import * as user from './acl/user';
import role from './acl/role';
import permission from './acl/permission';

// 统一暴露
export default {
  trademark,
  attr,
  spu,
  sku,
  user,
  role,
  permission,
}