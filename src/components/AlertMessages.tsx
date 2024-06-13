import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import railroad from '../data/railroad.json';
import { AlertData } from '../models/AlertData';

const routes = railroad.routes as Record<string, string>;

interface AlertMessagesProps {
  messages: AlertData[];
}

export function AlertMessages({ messages }: AlertMessagesProps) {
  return (
    <Stack spacing={2}>
      {messages.map((message, n) => (
        <Alert key={n} severity="error">
          <Typography variant="h6">{`${routes[message.route_id] ?? '?'} Line`}</Typography>
          <div
            dangerouslySetInnerHTML={{ __html: message.current_message ?? '?' }}
          />
        </Alert>
      ))}
    </Stack>
  );
}
