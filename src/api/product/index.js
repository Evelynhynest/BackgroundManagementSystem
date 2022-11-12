// 将4个模块请求的接口函数统一暴露

// 全部引入
import * as trademark from './trademark';
import * as attr from './attr';
import * as spu from './spu';
import * as sku from './sku';

// 统一暴露
export default {
  trademark,
  attr,
  spu,
  sku,
}