import { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';

import { ErrorAlert } from './components/ErrorAlert';
import { Layout } from './components/Layout';

export function RouteError() {
  const error = useRouteError();
  const url = new URL('/event.gif', location.href);
  url.searchParams.append('event', 'error');
  url.searchParams.append('error', JSON.stringify(error));
  // LATER: collect more info from the error
  const collect = url.href;

  useEffect(() => {
    fetch(collect).catch((err: unknown) => {
      console.error(err);
    });
  }, [collect]);

  return (
    <Layout>
      <ErrorAlert />
    </Layout>
  );
}
