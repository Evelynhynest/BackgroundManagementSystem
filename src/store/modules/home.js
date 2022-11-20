import mockRequest from '@/utils/mockRequest';
const status = {
  list: {},
};
const mutations = {
  GETDATA(state, list) {
    state.list = list;
  }
};
const actions = {
  // 发请求获取首页的 mock 数据
  async getData({commit}) {
    let result = await mockRequest.get('/home/list');
    // console.log(result);
    if(result.code === 20000) {
      commit('GETDATA', result.data);
    }
  }
};
const getters = {};

export default {
  status,
  mutations,
  actions,
  getters,
}