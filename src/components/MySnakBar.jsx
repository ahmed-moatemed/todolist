import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function MySnakBar({open, message, color}) {

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
      >
        <Alert variant="filled" severity={color}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}