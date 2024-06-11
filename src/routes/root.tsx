import { useNavigate } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { FindTrip } from '../components/FindTrip';

export function Component() {
  const navigate = useNavigate();

  return (
    <Layout>
      <FindTrip navigate={navigate} />
    </Layout>
  );
}
