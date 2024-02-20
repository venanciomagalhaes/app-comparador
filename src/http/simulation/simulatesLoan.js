import { axiosInstance } from '@/http/axiosInstance.js'

async function simulatesLoan(data){
  try {
    const response = await axiosInstance.post('simular', data)
    return response.data
  }catch (e){
  }
}

export {
  simulatesLoan
}