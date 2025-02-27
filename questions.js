export default [
  // 语言
  // 框架
  {
    type: 'list',
    name: 'framework',
    message: '请选择框架(必选)',
    choices: ['Vue3'],
  },
  // 网络请求库
  {
    type: 'list',
    name: 'httpLibrary',
    message: '请选择网络请求库',
    choices: ['Axios', null],
  },
  // 状态管理
  {
    type: 'list',
    name: 'store',
    message: '请选择状态管理',
    choices: ['Pinia', 'Vuex', null],
  },
  // 路由
  {
    type: 'list',
    name: 'router',
    message: '请选择路由',
    choices: ({ framework }) => {
      switch (framework) {
        case 'Vue3':
          return ['VueRouter', null];
        case 'Vue2':
          return ['VueRouter'];
        case 'React':
          return ['ReactRouter'];
        default:
          return [];
      }
    },
  },
  // UI库
  {
    type: 'list',
    name: 'UI',
    message: '请选择UI库',
    choices: ({ framework }) => {
      switch (framework) {
        case 'Vue3':
          return ['ElementPlus', null];
        case 'Vue2':
          return ['ElementUI'];
        default:
          return [];
      }
    },
    default: true,
  },
  // 构建工具
  {
    type: 'list',
    name: 'bundler',
    message: '请选择构建工具(必选)',
    choices: ['Vite', 'Webpack'],
  },
];
