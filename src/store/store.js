import Vue  from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    search:""
  },
  getters:{
    getSearch(state){
      return state.search;
    }
  },
  mutations:{
    setSearch(state,val){
      state.search = val;
    }
  },
  actions:{

  },
  modules: {
    'front': {
      namespaced: true,
      state: {
        homeSearch: "",
        search: Function
      },
      getters: {
        homeSearch: state => state.homeSearch,
        search: state => state.search
      },
      mutations: {
        homeSearch: (state, payload) => state.homeSearch = payload,
        search: (state, payload) => state.search = payload
      }
    },
    'back': {
      namespaced: true,
      state: {
        url: "",
        menus: [],
        menusList: [],
        menusLoading: true,
      },
      getters: {
        /**
         * 获取url
         * @param state
         */
        url(state) {
          return state.url;
        },
        /**
         * 获取菜单
         * @param state
         */
        menus(state){
          return state.menus;
        },
        menusLoading(state) {
          return state.menusLoading;
        },
        menuList(state){
          return state.menusList;
        }
      },
      mutations: {
        /**
         * 设置url
         * @param state
         * @param data
         */
        url(state, data) {
          state.url = data;
        },
        /**
         * 设置menus
         * @param state
         * @param data
         */
        menus(state, data) {
          state.menus = data;
          let list= [];
          function method(menus) {
            for (let menu of menus) {
              list.push({
                id: menu.id,
                layer: menu.layer,
                name: menu.name,
                icon: menu.icon,
                parent: menu.parent,
                type: menu.type,
                url: menu.url,
                menus: menu.menus
              });
              if (menu.menus) method(menu.menus);
            }
          }
          method(data);
          //平铺菜单属性
          state.menusList = list;
        },
        menusLoading(state, data) {
          state.menusLoading = data;
        }
      }
    }
  }
})

