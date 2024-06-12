import { useLoaderData, useNavigation, useSubmit } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { Loading } from '../components/Loading';
import { FindTrip } from '../components/FindTrip';
import { RecentTrips } from '../components/RecentTrips';
import { RecentTrip } from '../models/RecentTrip';
import { useGoForward } from '../routerHooks';
import { addRecent, getRecent, removeRecent } from '../lib/recent';

export function Component() {
  const goForward = useGoForward();
  const data = useLoaderData() as RecentTrip[];
  const { state } = useNavigation();
  const submit = useSubmit();

  const navigate = (str: string) => {
    addRecent(str);
    goForward(str);
  };

  const remove = (trip: RecentTrip) => {
    submit({ ...trip }, { method: 'post', encType: 'application/json' });
  };

  if (state === 'loading') {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      <FindTrip navigate={navigate} />
      <RecentTrips data={data} navigate={navigate} remove={remove} />
    </Layout>
  );
}

// https://reactrouter.com/en/main/route/lazy
// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }: { request: Request }) {
  const trip = (await request.json()) as RecentTrip;
  return removeRecent(trip);
}

// https://reactrouter.com/en/main/route/lazy
// eslint-disable-next-line react-refresh/only-export-components
export function loader() {
  return getRecent();
}
