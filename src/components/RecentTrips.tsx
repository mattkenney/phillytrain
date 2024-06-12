import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { RecentTrip } from '../models/RecentTrip';

interface RecentTripsProps {
  data?: RecentTrip[];
  navigate: (href: string) => void;
  remove: (trip: RecentTrip) => void;
}

export function RecentTrips({ data, navigate, remove }: RecentTripsProps) {
  if (!data?.length) return null;

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5">Recent trips</Typography>
          <List>
            {data
              .slice()
              .reverse()
              .map(trip => {
                const label = `${trip.stationFrom} - ${trip.stationTo}`;
                const onClick = () => {
                  navigate(
                    ['trip', trip.stationFrom, trip.stationTo]
                      .map(encodeURIComponent)
                      .join('/'),
                  );
                };

                return (
                  <ListItem
                    key={label}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          remove(trip);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemButton onClick={onClick}>
                      <ListItemText primary={label} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
}
