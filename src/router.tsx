import { createBrowserRouter } from 'react-router-dom';

import * as root from './routes/root';

export const router = createBrowserRouter([
  {
    path: '/',
    ...root,
  },
  {
    path: '/trip/:from/:to',
    lazy: () => import('./routes/trip'),
  },
]);
