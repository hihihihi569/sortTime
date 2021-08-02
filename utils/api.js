import axios from 'axios'
import { BASE_URL } from './utils'

// 创建axios实例
export const API = axios.create({
   baseURL: BASE_URL
})