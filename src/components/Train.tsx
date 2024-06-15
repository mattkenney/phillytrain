import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
//import { closest } from 'fastest-levenshtein';

import { TrainStop } from '../models/TrainStop';
import { TripTime } from './TripTime';

interface TrainProps {
  data: TrainStop[];
  from?: string;
  line?: string;
  to?: string;
  train?: string;
}

export function Train({ data, from, line, to, train }: TrainProps) {
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
              {data.map(stop => (
                <TableRow
                  key={stop.station}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {stop.station}
                    {stop.station === from && '*'}
                    {stop.station === to && '**'}
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
