import Typography from '@mui/material/Typography';

import { formatTime, parseTime } from '../lib/time';
import { TripData } from '../models/TripData';

interface TripTimeProps {
  actual?: Date | string;
  scheduled?: Date | string;
}

export function TripTime({ actual, scheduled }: TripTimeProps) {
  if (typeof actual === 'string') {
    actual = parseTime(actual);
  }
  if (typeof scheduled === 'string') {
    scheduled = parseTime(scheduled);
  }
  return (
    <>
      {actual && scheduled && actual.getTime() !== scheduled.getTime() && (
        <>
          <Typography
            component="span"
            sx={{ fontStyle: 'italic', textDecorationLine: 'line-through' }}
          >
            {formatTime(scheduled)}
          </Typography>{' '}
        </>
      )}
      {formatTime(actual ?? scheduled)}
    </>
  );
}

export function TripTitle({ data }: { data: TripData }) {
  const departure = parseTime(data.orig_departure_time);
  const arrival = parseTime(
    data.isdirect === 'false' || !data.isdirect
      ? data.term_arrival_time
      : data.orig_arrival_time,
  );

  return (
    <Typography>
      {formatTime(departure)} - {formatTime(arrival)}
    </Typography>
  );
}
