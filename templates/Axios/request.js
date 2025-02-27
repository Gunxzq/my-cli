import axios from 'axios';
import useUserStore from '../store/modules/user';
import { Toast } from 'vant';
import '../../node_modules/vant/es/toast/style';
import eventEmitter from './eventEmitter';
// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000,
});
// 添加请求与响应拦截器
request.interceptors.request.use(config => {
  // config配置对象，headers请求头可携带公共参数
  const UserStore = useUserStore();
  if (UserStore.token) config.headers.Authorization = 'Bearer ' + UserStore.token;
  return config;
});

request.interceptors.response.use(
  reponse => {
    return reponse.data;
  },
  error => {
    let message = '';
    const status = error.response.status;
    switch (status) {
      case 401:
        message = 'token过期';
        // 触发无权限事件
        eventEmitter.emit('API:UN_AUTH');
        break;
      case 403:
        message = '无权访问';
        break;
      case 404:
        message = '请求地址错误';
        break;
      case 500:
        message = '服务器出现问题';
        break;
      default:
        message = '网络问题';
        break;
    }
    // 提示错误信息
    Toast(message);
    return Promise.reject(error);
  },
);
export default request;
