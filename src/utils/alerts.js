import Swal from "sweetalert2";

// Función para mostrar el error como una toast notification
export const toastFormError = (timer) => {
  Swal.fire({
    background: `rgba(28, 25, 25, 0.95)`,
    color: `#fff`,
    customClass: { timerProgressBar: "toast-progress-dark" },
    icon: "error",
    iconColor: "#b30a0a",
    position: "top-end",
    showConfirmButton: false,
    text: "Intente nuevamente",
    timer,
    timerProgressBar: true,
    title: "Error en el formulario",
    toast: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};
