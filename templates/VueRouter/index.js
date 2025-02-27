import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRoutes, anyRoutes } from './routes';
import eventEmitter from '../utils/eventEmitter';

let router = createRouter({
  // hash模式
  history: createWebHashHistory(),
  // routes: constantRoutes,
  routes: [...constantRoutes, ...anyRoutes],
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

// 监听token过期
eventEmitter.on('API:UN_AUTH', () => {
  router.push('/login');
});

// 监听登录事件
eventEmitter.on('API:LOGIN', () => {
  router.push('/');
});

export default router;
