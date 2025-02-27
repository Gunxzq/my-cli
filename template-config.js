export default {
  // 语言
  //框架
  Vue3: {
    type: 'dependencies',
    value: () => {
      return {
        vue: '^3.5.13',
      };
    },
    fielsToAdd: [
      {
        path: 'src/main.js',
        action: 'copy',
        source: 'Vue3/main.js.ejs',
      },
      {
        path: 'src/App.vue',
        action: 'copy',
        source: 'Vue3/App.vue',
      },
      {
        path: 'index.html',
        action: 'copy',
        source: 'Vue3/index.html',
      },
    ],
  },
  // 请求库
  Axios: {
    type: 'dependencies',
    value: () => {
      return {
        axios: '^1.7.9',
      };
    },
    fielsToAdd: [
      {
        path: 'src/api',
        action: 'mkdir',
        content: {},
      },
      {
        path: 'src/utils',
        action: 'mkdir',
        content: {},
      },
      {
        path: 'src/utils/request.js',
        action: 'copy',
        source: 'Axios/request.js',
      },
    ],
  },
  // 状态管理
  Vuex: {
    type: 'dependencies',
    value: () => {
      return {
        axios: '^1.7.9',
      };
    },
    fielsToAdd: [
      {
        path: 'src/store',
        action: 'mkdir',
        content: {},
      },
      {
        path: 'src/store/index.js',
        action: 'copy',
        source: 'Vuex/index.js',
      },
      {
        path: 'src/store/modules',
        action: 'mkdir',
        content: {},
      },
    ],
  },
  Pinia: {
    type: 'dependencies',
    value: () => {
      return {
        pinia: '^3.0.1',
      };
    },
    fielsToAdd: [
      {
        path: 'src/store',
        action: 'mkdir',
        content: {},
      },
      {
        path: 'src/store/index.js',
        action: 'copy',
        source: 'Pinia/index.js',
      },
      {
        path: 'src/store/modules',
        action: 'mkdir',
        content: {},
      },
    ],
  },
  // 路由
  VueRouter: {
    type: 'dependencies',
    value: () => {
      return { 'vue-router': '^4.5.0' };
    },
    fielsToAdd: [
      {
        path: 'src/router',
        action: 'mkdir',
        content: {},
      },
      {
        path: 'src/router/index.js',
        action: 'copy',
        source: 'VueRouter/index.js',
      },
      {
        path: 'src/router/routes.js',
        action: 'copy',
        source: 'VueRouter/routes.js',
      },
    ],
  },
  // UI库
  ElementPlus: {
    type: 'dependencies',
    // 接收一个对象，这个对象包含了依赖
    value: obj => {
      // 生成相关的依赖对象数组
      let objList = Object.keys(obj)
        .map(key => {
          switch (key) {
            case 'vue':
              return {
                '@element-plus/icons-vue': '^2.3.1',
              };
            default:
              return null;
          }
        })
        .filter(key => key);

      // 合并最终对象
      let resultObj = Object.assign({ 'element-plus': '^2.8.6' }, ...objList);
      return resultObj;
    },
  },
  ElementUI: {
    type: 'dependencies',
  },
  // 国际化
  // 规范化
  ESLint_prettier: {
    type: 'devDependencies',
    value: obj => {
      // 生成相关的依赖对象数组
      let objList = Object.keys(obj)
        .map(key => {
          switch (key) {
            case 'vue':
              return {
                'prettier-plugin-vue': '^3.2.31',
                'eslint-plugin-vue': '^9.30.0',
              };
            case 'typescript':
              return {
                'typescript-eslint': '^8.12.2',
              };
            default:
              return null;
          }
        })
        .filter(key => key);

      // 合并最终对象
      let resultObj = Object.assign(
        {
          eslint: '^8.38.0',
          '@eslint/js': '^9.14.0',
          'eslint-plugin-import': '^2.31.0',
          'eslint-plugin-node': '^^11.1.0',
          'eslint-plugin-prettier': '^5.2.1',
          'eslint-config-prettier': '^8.10.0',
          prettier: '^3.3.3',
        },
        ...objList,
      );
      return resultObj;
    },
    fielsToAdd: [],
  },
  Babel: {
    type: 'devDependencies',
    value: obj => {
      // 生成相关的依赖对象数组
      let objList = Object.keys(obj)
        .map(key => {
          switch (key) {
            case 'eslint':
              return {
                '@babel/eslint-parser': '^7.25',
              };
            default:
              return null;
          }
        })
        .filter(key => key);
      // 合并最终对象
      let resultObj = Object.assign(
        {
          '@babel/core': '^7.26.0',
        },
        ...objList,
      );
      return resultObj;
    },
  },
  // 构建工具
  Vite: {
    type: 'devDependencies',
    value: obj => {
      // 生成相关的依赖对象数组
      let objList = Object.keys(obj)
        .map(key => {
          switch (key) {
            case 'vue':
              return {
                '@vitejs/plugin-vue': '^5.2.1',
              };
            case 'tailwindcss':
              return {
                '@tailwindcss/vite': '^4.0.7',
              };
            case 'sass':
              return {
                'sass-loader': '^16.0.2',
              };
            case 'mock':
              return {
                'vite-plugin-mock': '^3.0.2',
              };
            case 'babel':
              return {
                'vite-plugin-babel': '^3.0.2',
              };
            default:
              return null;
          }
        })
        .filter(key => key);

      // 合并最终对象
      let resultObj = Object.assign({ vite: '^6.0.5' }, ...objList);
      return resultObj;
    },
    script: () => {
      return {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview',
      };
    },
    fielsToAdd: [
      {
        path: 'vite.config.js',
        action: 'copy',
        source: 'Vite/vite.config.js.ejs',
      },
    ],
  },
};
