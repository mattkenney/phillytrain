import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
// import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { TripData } from '../models/TripData';
import { TripSegment, TripTitle } from './TripSegment';

interface TripCardProps {
  data: TripData;
  from?: string;
  to?: string;
}

export function TripCard({ data, from, to }: TripCardProps) {
  return (
    <Card>
      <CardHeader
        sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
        title={<TripTitle data={data} />}
      />
      <CardContent>
        <Stack>
          <TripSegment data={data} from={from} to={to} />
          {(data.isdirect === 'false' || !data.isdirect) && (
            <TripSegment data={data} from={from} term to={to} />
          )}
        </Stack>
      </CardContent>
      {/*
      <CardActions>
        <Button size="small">Stops</Button>
      </CardActions>
      */}
    </Card>
  );
}
