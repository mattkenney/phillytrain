import Alert from '@mui/material/Alert';

import { TripData } from '../models/TripData';
import { TripCard } from './TripCard';

interface TripsProps {
  data?: TripData[];
  from?: string;
  navigate?: (href: string) => void;
  to?: string;
}
export function Trips({ data, from, navigate, to }: TripsProps) {
  if (!data?.length) {
    const fromStation = decodeURIComponent(from ?? '?');
    const toStation = decodeURIComponent(to ?? '?');
    return (
      <Alert severity="warning">
        No trip from {fromStation} to {toStation} is possible at this time.
      </Alert>
    );
  }

  return (
    <>
      {data.map((trip, n) => (
        <TripCard key={n} data={trip} from={from} navigate={navigate} to={to} />
      ))}
    </>
  );
}
