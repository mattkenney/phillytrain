import { useLoaderData, useParams } from 'react-router-dom';
import fetchJsonp from 'fetch-jsonp';

import { Layout } from '../components/Layout';
import { TripCard } from '../components/TripCard';
import railroad from '../data/railroad.json';
import { TripData } from '../models/TripData';
import { useGoBack } from '../routerHooks';

const nextToArrive = 'https://www3.septa.org/hackathon/NextToArrive/';

export function Component() {
  const back = useGoBack('/');
  const data = useLoaderData() as TripData[] | undefined;
  const { from, to } = useParams();

  return (
    <Layout back={back}>
      {data?.map((trip, n) => (
        <TripCard key={n} data={trip} from={from} to={to} />
      ))}
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
  const { from, to } = params;
  const stationFrom = decodeURIComponent(from ?? '');
  const stationTo = decodeURIComponent(to ?? '');

  if (
    !Object.prototype.hasOwnProperty.call(railroad.stops, stationFrom) ||
    !Object.prototype.hasOwnProperty.call(railroad.stops, stationTo)
  ) {
    throw new Error('Not Found');
  }

  const url = new URL(nextToArrive);
  url.searchParams.set('req1', stationFrom);
  url.searchParams.set('req2', stationTo);

  const res = await fetchJsonp(url.href);

  return res.json();
}
