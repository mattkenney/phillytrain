import { useEffect, useState } from 'react';
import fetchJsonp from 'fetch-jsonp';

import { AlertMessages } from '../components/AlertMessages';
import railroad from '../data/railroad.json';
import { AlertData } from '../models/AlertData';
import { TripData } from '../models/TripData';

const apiBase = import.meta.env.VITE_API_BASE as string | undefined;
const alertsUrl = `${apiBase ?? '/api'}/Alerts/get_alert_data.php`;

interface AlertsProps {
  data?: TripData[];
}

export function Alerts({ data }: AlertsProps) {
  const [messages, setMessages] = useState([] as AlertData[]);

  /*
   * Get the set of all the train lines used by all the trip options passed in
   * the `data` prop. Convert that set to a sorted string to make the
   * `useEffect` dependency change check straightforward.
   */
  const lineSet = new Set<string>();
  data?.forEach(trip => {
    lineSet.add(trip.orig_line);
    if (trip.term_line) {
      lineSet.add(trip.term_line);
    }
  });
  const lines = JSON.stringify(Array.from(lineSet).sort());

  useEffect(() => {
    // Map the train line names into a list of route IDs
    const routeIds = (JSON.parse(lines) as string[]).map(
      line =>
        Object.entries(railroad.routes).find(pair => pair[1] === line)?.[0],
    );

    // Get the current alerts and filter to the relevant ones
    fetchJsonp(alertsUrl)
      .then(res => res.json() as Promise<AlertData[]>)
      .then(alerts =>
        alerts.filter(
          alert => alert.current_message && routeIds.includes(alert.route_id),
        ),
      )
      .then(setMessages)
      .catch((err: unknown) => {
        console.error(err);
      });
  }, [lines]);

  return <AlertMessages messages={messages} />;
}
