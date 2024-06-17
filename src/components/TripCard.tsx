import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';

import { TripData } from '../models/TripData';
import { TripSegment } from './TripSegment';
import { TripTitle } from './TripTime';

interface TripCardProps {
  data: TripData;
  from?: string;
  navigate?: (href: string) => void;
  to?: string;
}

export function TripCard({ data, from, navigate, to }: TripCardProps) {
  return (
    <Card>
      <CardHeader
        sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
        title={<TripTitle data={data} />}
      />
      <CardContent>
        <Stack>
          <TripSegment data={data} from={from} navigate={navigate} to={to} />
          {(data.isdirect === 'false' || !data.isdirect) && (
            <TripSegment
              data={data}
              from={from}
              navigate={navigate}
              term
              to={to}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
