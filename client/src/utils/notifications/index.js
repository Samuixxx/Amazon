import { toast } from 'react-toastify'

const notifyError = (error) => {
    toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: false
    })
}

export default notifyError