import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

export function Loading() {
  return (
    <Stack alignItems="center">
      <CircularProgress />
    </Stack>
  );
}
