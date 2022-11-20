import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes, constantRoutes, anyRoutes } from '@/router'
// import { resetRouter, asyncRoutes } from '@/router'
import router from '@/router';

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    // 服务器返回的菜单信息（根据不同的角色，返回的标记，数组里面的元素是字符串）
    routes: [],
    // 用户登录后的角色信息
    buttons: [],
    // 按钮权限信息
    roles: [],
    // 对比结果：项目中已有的异步路由与服务器返回的标记信息进行对比确定的最终需要展示的结果
    resultAsyncRoutes: [],
    // 用户最终需要展示的所有路由
    resultAllRoutes: [],
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 存储用户信息
  SET_USERINFO(state, userInfo) {
    // 用户名
    state.name = userInfo.name;
    // 用户头像
    state.avatar = userInfo.avatar;
    // 菜单权限的标记
    state.routes = userInfo.routes;
    // 按钮权限的标记
    state.buttons = userInfo.buttons;
    // 角色信息
    state.roles = userInfo.roles;
  },
  // 最终计算出来的异步路由
  SET_RESULTASYNCROUTES(state, asyncRoutes) {
    // console.log('----', asyncRoutes);
    // let test = constantRoutes.concat(asyncRoutes, anyRoutes);
    // console.log('test',test);
    // console.log('!!asyncRoutes:', asyncRoutes);
    // vuex保存当前用户的异步路由，注意：一个用户需要展示的最终路由需要包括：常量、异步和任意路由
    state.resultAsyncRoutes = asyncRoutes;
    // console.log('???', state.resultAsyncRoutes);
    // 计算出一个用户需要展示的所有路由
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes);
    // state.resultAllRoutes = test;
    // console.log('###', state.resultAllRoutes);
    // state.resultAllRoutes = constantRoutes.concat(asyncRoutes, anyRoutes);
    // 给路由器添加新的路由
    router.addRoutes(state.resultAllRoutes);
  }
}

// 定义一个函数，对比两个数组，得出结果：当前用户到底显示哪些异步路由
const computedAsyncRoutes = (asyncRoutes, routes) => {
  // console.log(asyncRoutes, 1111);
  // console.log(routes, 2222);
  // 过滤出当前用户需要展示的异步路由
  return asyncRoutes.filter(item => {
    // 数组中没有该元素返回 -1，如果有该元素则返回其索引值
    if(routes.indexOf(item.name) !== -1) {
      // 递归判断子路由
      if(item.children&&item.children.length) {
        // console.log(1111);
        item.children = computedAsyncRoutes(item.children, routes);
        // console.log('children：',item.children);
      }
      return true;
    }
  })
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    // 解构出用户名与密码
    const { username, password } = userInfo
    /* return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    }) */
    let result = await login({ username: username.trim(), password: password });
    // console.log(result);
    // 注意：当前登录请求现在使用的是mock的数据，mock数据code是20000
    if(result.code === 20000) {
      commit('SET_TOKEN', result.data.token);
      setToken(result.data.token);
      return 'ok';
    } else {
      return Promise.reject(new Error('failed'));
    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // 获取用户信息：返回的数据包含，用户名name、用户头像avatar、routes（返回的标志，不同用户应该展示哪些菜单的标记）、用户角色信息roles、按钮的信息（按钮权限用的标记）buttons
        const { data } = response
        // console.log(data);

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        // vuex存储用户的全部信息
        commit('SET_USERINFO', data);
        // let re = computedAsyncRoutes(asyncRoutes, data.routes);
        // console.log('re',re);
        commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(asyncRoutes, data.routes));

        // const { name, avatar } = data

        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

