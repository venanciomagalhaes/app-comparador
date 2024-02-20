import Swal from 'sweetalert2'

function triggersSweetAlert(title, text, icon = 'error', confirmButtonText = 'Fechar'){
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText
  })
}

export {triggersSweetAlert}