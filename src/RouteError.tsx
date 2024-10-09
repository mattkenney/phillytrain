import { useRouteError } from 'react-router-dom';

import { ErrorAlert } from './components/ErrorAlert';
import { Layout } from './components/Layout';
import { useLogError } from './logger';

export function RouteError() {
  const error = useRouteError();
  useLogError(error);

  return (
    <Layout>
      <ErrorAlert />
    </Layout>
  );
}
