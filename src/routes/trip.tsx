import { useLoaderData, useParams } from 'react-router-dom';
import fetchJsonp from 'fetch-jsonp';

import { Layout } from '../components/Layout';
import { Trip, TripData } from '../components/Trip';

export function Component() {
  const data = useLoaderData() as TripData[];
  const { from, to } = useParams();

  return (
    <Layout>
      <Trip data={data} from={from} to={to} />
    </Layout>
  );
}

// https://reactrouter.com/en/main/route/lazy
// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }: { params: Record<string, string> }) {
  const { from, to } = params;
  const url = new URL('https://www3.septa.org/hackathon/NextToArrive/');
  url.searchParams.set('req1', decodeURIComponent(from));
  url.searchParams.set('req2', decodeURIComponent(to));

  const res = await fetchJsonp(url.href);

  return res.json();
}
