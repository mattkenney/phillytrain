export interface TripData {
  Connection?: string;
  isdirect: string;
  orig_arrival_time: string;
  orig_delay: string;
  orig_departure_time: string;
  orig_line: string;
  orig_train: string;
  term_arrival_time?: string;
  term_delay?: string;
  term_depart_time?: string;
  term_line?: string;
  term_train?: string;
}

interface TripProps {
  data?: TripData[];
  from?: string;
  to?: string;
}

export function Trip({ data, from, to }: TripProps) {
  return (
    <div>
      {from} - {to}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
