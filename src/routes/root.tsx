import { Layout } from '../components/Layout';
import { FindTrip } from '../components/FindTrip';
import { useGoForward } from '../routerHooks';

export function Component() {
  const navigate = useGoForward();

  return (
    <Layout>
      <FindTrip navigate={navigate} />
    </Layout>
  );
}
