import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ flag, setFlag, msg, errorType }) {


  // const [state, setState] = React.useState({
  //   open: false,
  //   vertical: 'top',
  //   horizontal: 'center',
  // });
  // const { vertical, horizontal, } = state;




  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setFlag(false);
  };



  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={flag} autoHideDuration={4500} onClose={handleClose}>
        <Alert severity={errorType} sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
