import { triggersSweetAlert } from '@/helpers/alert/triggersSweetAlert.js'
import { axiosInstance } from '@/http/axiosInstance.js'
async function searchInstitutions(){
  try {
    const response = await axiosInstance.get('instituicao');
    return (response.data);
  } catch (error) {
}
}


export {
  searchInstitutions
}