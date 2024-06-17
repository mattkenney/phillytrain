import { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';

import { ErrorAlert } from './components/ErrorAlert';
import { Layout } from './components/Layout';

export function RouteError() {
  const error = useRouteError() as Error | undefined;
  const { message, name, stack } = error ?? {};

  console.error(error);

  const url = new URL('/collect.gif', location.href);
  url.searchParams.append('event', 'error');
  url.searchParams.append('message', message ?? '');
  url.searchParams.append('name', name ?? '');
  url.searchParams.append('stack', stack ? String(stack).split('\n')[0] : '');
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
