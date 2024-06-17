import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import railroad from '../data/railroad.json';
import { TrainStop } from '../models/TrainStop';
import { TripTime } from './TripTime';

// Get the cannonical station name, i.e. "Market%20East" -> "Jefferson Station"
function stationName(param?: string) {
  const stops = railroad.stops as unknown as Record<
    string,
    { aka?: string; station: string } | undefined
  >;
  const key = decodeURIComponent(param ?? '');
  return stops[key]?.aka ?? key;
}

interface TrainProps {
  data: TrainStop[];
  from?: string;
  line?: string;
  to?: string;
  train?: string;
}

export function Train({ data, from, line, to, train }: TrainProps) {
  const fromStation = stationName(from);
  const toStation = stationName(to);
  const stations = data.map(
    stop =>
      railroad.aliases[stop.station as keyof typeof railroad.aliases] ||
      stop.station,
  );
  const start = Math.max(0, stations.indexOf(fromStation));
  const stop = stations.indexOf(toStation);
  const stops = data.slice(start, stop > start ? stop + 1 : undefined);

  return (
    <Card>
      <CardHeader
        sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
        title={`${line ?? '?'} ${train ?? '?'}`}
      />
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Station</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stops.map(stop => (
                <TableRow
                  key={stop.station}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {stop.station}
                  </TableCell>
                  <TableCell>
                    <TripTime
                      actual={stop.act_tm === 'na' ? stop.est_tm : stop.act_tm}
                      scheduled={stop.sched_tm}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
