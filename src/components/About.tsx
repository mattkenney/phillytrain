import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';

export function About({ onClose }: { onClose?: () => void }) {
  return (
    <Alert onClose={onClose} severity="info">
      <Link href="https://phillytrain.com">phillytrain.com</Link>: Philadelphia
      regional rail trip planner. Data provided by{' '}
      <Link href="http://www3.septa.org">SEPTA</Link>. Developed by{' '}
      <Link href="mailto:matt@phillytrain.com">matt@phillytrain.com</Link>.
    </Alert>
  );
}
