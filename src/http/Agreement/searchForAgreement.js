import axios from 'axios'
import { triggersSweetAlert } from '@/helpers/alert/triggersSweetAlert.js'
import { getApiBaseUrl } from '@/helpers/http/getApiBaseUrl.js'
import { axiosInstance } from '@/http/axiosInstance.js'
async function searchForAgreement(){
  try {
    const response =  await axiosInstance.get('convenio');;
    return  response.data;
  } catch (error) {
  }
}

export {
  searchForAgreement
}