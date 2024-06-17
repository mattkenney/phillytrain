import IconButton from '@mui/material/IconButton';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { applyDelay, parseDelay, parseTime } from '../lib/time';
import { TripData } from '../models/TripData';
import { TripTime } from './TripTime';

interface TripSegmentProps {
  data: TripData;
  from?: string;
  navigate?: (href: string) => void;
  term?: boolean;
  to?: string;
}

export function TripSegment({
  data,
  from,
  navigate,
  term,
  to,
}: TripSegmentProps) {
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
  const infoHref = ['', 'trip', depart, arrive, line, train]
    .map(x => encodeURIComponent(x ?? '_'))
    .join('/');

  return (
    <Stack>
      <Stack direction="row">
        <Typography component="div" variant="h6">
          {line} {train}
        </Typography>
        <IconButton
          aria-label="info"
          onClick={() => {
            if (navigate) {
              navigate(infoHref);
            }
          }}
          size="small"
        >
          <InfoOutlined />
        </IconButton>
      </Stack>
      <Typography>
        <TripTime actual={applyDelay(departure, delay)} scheduled={departure} />
        {` depart ${depart ?? '?'}`}
      </Typography>
      <Typography>
        <TripTime actual={applyDelay(arrival, delay)} scheduled={arrival} />
        {` arrive ${arrive ?? '?'}`}
      </Typography>
    </Stack>
  );
}
