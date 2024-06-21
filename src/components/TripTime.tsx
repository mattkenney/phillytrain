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

  if (
    actual &&
    scheduled &&
    Math.abs(actual.getTime() - scheduled.getTime()) > 60000
  ) {
    return (
      <>
        <Typography
          component="span"
          sx={{ textDecorationLine: 'line-through' }}
        >
          {formatTime(scheduled)}
        </Typography>{' '}
        <Typography component="span" sx={{ fontStyle: 'italic' }}>
          {formatTime(actual)}
        </Typography>
      </>
    );
  }

  return (
    <Typography component="span">{formatTime(actual ?? scheduled)}</Typography>
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
