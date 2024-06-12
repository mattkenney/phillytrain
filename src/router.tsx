import { createBrowserRouter } from 'react-router-dom';

import { RouteError } from './RouteError';
import * as root from './routes/root';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <RouteError />,
    ...root,
  },
  {
    path: '/trip/:from/:to',
    errorElement: <RouteError />,
    lazy: () => import('./routes/trip'),
  },
]);
