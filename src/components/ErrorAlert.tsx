import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export function ErrorAlert() {
  return (
    <>
      <Alert severity="error">Drat! Something went wrong.</Alert>
      <Stack alignItems="center">
        <Button
          color="error"
          onClick={() => {
            location.href = '/';
          }}
          variant="contained"
        >
          Reload
        </Button>
      </Stack>
    </>
  );
}
