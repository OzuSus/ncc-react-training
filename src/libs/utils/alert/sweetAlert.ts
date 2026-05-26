import Swal from 'sweetalert2';

const alertOption = {
  confirmButtonColor: '#4680ff',
  confirmButtonText: 'OK',
  didOpen: () => {
    const container = document.querySelector('.swal2-container');
    if (container) container.style.zIndex = '9999';
  },
};

export const ErrorSweetAlert = (text: string) =>
  Swal.fire({ icon: 'error', text, ...alertOption });
