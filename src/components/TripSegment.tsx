import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { applyDelay, formatTime, parseDelay, parseTime } from '../util';
import { TripData } from './TripCard';

interface TripSegmentProps {
  data: TripData;
  from?: string;
  term?: boolean;
  to?: string;
}

export function TripSegment({ data, from, term, to }: TripSegmentProps) {
  const arrival = parseTime(
    term ? data.term_arrival_time : data.orig_arrival_time,
  );
  const arrive = term ? to : data.Connection ?? to;
  const delay = parseDelay(term ? data.term_delay : data.orig_delay);
  const depart = term ? data.Connection : from;
  const departure = parseTime(
    term ? data.term_depart_time : data.orig_departure_time,
  );
  const line = term ? data.term_line : data.orig_line;
  const train = term ? data.term_train : data.orig_train;

  return (
    <Stack>
      <Typography component="div" variant="h6">
        {line} {train}
      </Typography>
      <TripTime delay={delay} time={departure} stop={depart} verb="depart" />
      <TripTime delay={delay} time={arrival} stop={arrive} verb="arrive" />
    </Stack>
  );
}

interface TripTimeProps {
  delay?: number;
  stop?: string;
  time?: Date;
  verb?: string;
}

function TripTime({ delay, stop, time, verb }: TripTimeProps) {
  if (delay && time) {
    const when = applyDelay(time, delay);
    return (
      <Typography>
        <Typography
          component="span"
          sx={{ fontStyle: 'italic', textDecorationLine: 'line-through' }}
        >
          {formatTime(time)}
        </Typography>{' '}
        {formatTime(when)} {verb} {stop}
      </Typography>
    );
  }

  return (
    <Typography>
      {formatTime(time)} {verb} {stop}
    </Typography>
  );
}

export function TripTitle({ data }: { data: TripData }) {
  const departure = parseTime(data.orig_departure_time);
  const arrival = parseTime((data.isdirect === 'false' || !data.isdirect) ? data.term_arrival_time : data.orig_arrival_time);

  return <Typography>{formatTime(departure)} - {formatTime(arrival)}</Typography>;
}
