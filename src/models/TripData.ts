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
