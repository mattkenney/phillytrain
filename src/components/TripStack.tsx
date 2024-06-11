import Stack from '@mui/material/Stack';

import { TripCard, TripData } from './TripCard';

interface TripStackProps {
  data?: TripData[];
  from?: string;
  to?: string;
}

export function TripStack({ data, from, to }: TripStackProps) {
  return (
    <Stack spacing={2}>
      {data?.map((trip, n) => (
        <TripCard key={n} data={trip} from={from} to={to} />
      ))}
    </Stack>
  );
}
