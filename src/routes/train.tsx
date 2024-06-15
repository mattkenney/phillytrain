import { useLoaderData, useParams } from 'react-router-dom';
import fetchJsonp from 'fetch-jsonp';

import railroad from '../data/railroad.json';
import { Layout } from '../components/Layout';
import { Train } from '../components/Train';
import { TrainStop } from '../models/TrainStop';
import { useGoBack } from '../routerHooks';

const apiBase = import.meta.env.VITE_API_BASE as string | undefined;
const schedules = `${apiBase ?? '/api'}/RRSchedules/`;

export function Component() {
  const data = useLoaderData() as TrainStop[];
  const { from, line, to, train } = useParams();
  const back = useGoBack(['', 'trip', from, to].join('/'));

  return (
    <Layout back={back}>
      <Train data={data} from={from} line={line} to={to} train={train} />
    </Layout>
  );
}

// https://reactrouter.com/en/main/route/lazy
// eslint-disable-next-line react-refresh/only-export-components
export async function loader({
  params,
}: {
  params: Record<string, string | undefined>;
}) {
  const { from, line, to, train } = params;
  const stationFrom = decodeURIComponent(from ?? '');
  const stationTo = decodeURIComponent(to ?? '');

  if (
    !Object.prototype.hasOwnProperty.call(railroad.stops, stationFrom) ||
    !Object.prototype.hasOwnProperty.call(railroad.stops, stationTo) ||
    !Object.entries(railroad.routes).find(pair => pair[1] === line) ||
    !/^[0-9]{4}$/.test(train ?? '')
  ) {
    throw new Error('Not Found');
  }

  const url = new URL(schedules);
  url.searchParams.set('req1', train ?? '');

  const res = await fetchJsonp(url.href);

  return res.json();
}
