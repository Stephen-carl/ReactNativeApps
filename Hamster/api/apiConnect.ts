import { useUserStore } from '@/store/userStore';
import axios from 'axios';
const API_URL = process.env.EXPO_PUBLIC_BASEURLLIVE
const TEST_URL = process.env.EXPO_PUBLIC_BASEURLTEST

const apiClient = axios.create({
  baseURL: TEST_URL,
  timeout: 10000,       // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});


//request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const token = useUserStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => Promise.reject(error)
);

export default apiClient;