import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import BASE_URL from '../utils/url'

axios.defaults.baseURL = `${BASE_URL}/api`

axios.interceptors.request.use(async (config) => {
  try{
    const token = await AsyncStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config;
  } catch (err) {
    console.log(err)
    return config;
  }
});

export default axios