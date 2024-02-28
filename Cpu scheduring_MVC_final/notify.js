const notyf = new Notyf({
    duration: 1000,
    position: {
      x: 'center',
      y: 'bottom',
    },
    types: [
      {
        type: 'warning',
        background: '#FF8000',
        duration: 2000,
        dismissible: 1000
      },
      {
        type: 'error',
        background: '#D70040',
        duration: 2000,
        dismissible: 1000
      }
    ]
  });