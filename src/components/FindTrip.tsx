import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import railroad from '../data/railroad.json';
import { Combobox } from './Combobox';

const options = Object.keys(railroad.stops);

export function FindTrip({ navigate }: { navigate: (href: string) => void }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const disabled = !(from && to);

  const onClick = () => {
    if (!disabled) {
      navigate(['trip', from, to].map(encodeURIComponent).join('/'));
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5">Plan a trip</Typography>
          <Combobox
            id="plan-trip-from"
            label="From"
            onChange={(_evt, value) => {
              setFrom(value ?? '');
            }}
            options={options}
            value={from || null}
          />
          <Combobox
            id="plan-trip-to"
            label="To"
            onChange={(_evt, value) => {
              setTo(value ?? '');
            }}
            options={options}
            value={to || null}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button disabled={disabled} onClick={onClick} variant="contained">
          Find trip
        </Button>
      </CardActions>
    </Card>
  );
}
