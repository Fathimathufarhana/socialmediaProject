import {Zoom, toast} from "react-toastify"

export const successToast =(message)=>{
    toast.success(message, {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition:Zoom,
        theme: "light",
        });
}

export const errorToast =(message)=>{
    toast.error(message, {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition:Zoom,
        theme: "light",
        });
}
