import axios from 'axios'
import { getApiBaseUrl } from '@/helpers/http/getApiBaseUrl.js'

const axiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
})

export {
  axiosInstance
}
