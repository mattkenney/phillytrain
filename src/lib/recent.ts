import { RecentTrip } from '../models/RecentTrip';

const recentKey = 'ls.recent';
const recentLimit = 5;

export function addRecent(str: string) {
  const m = /(^|\/)trip\/([^/]+)\/([^/]+)$/.exec(str);
  if (m) {
    const current = {
      stationFrom: decodeURIComponent(m[2]),
      stationTo: decodeURIComponent(m[3]),
    };
    // remove duplicate if already present - we want it at the end
    const recent = removeRecent(current, false);
    // add current at the end
    recent.push(current);
    // drop from start to stay under limit
    while (recent.length > recentLimit) {
      recent.shift();
    }
    // stringify and store
    localStorage.setItem(recentKey, JSON.stringify(recent));
  }
}

export function getRecent() {
  const result: RecentTrip[] = [];

  const json = localStorage.getItem(recentKey);
  if (json) {
    try {
      result.push(...(JSON.parse(json) as RecentTrip[]));
    } catch (err: unknown) {
      console.error(err);
    }
  }

  return result;
}

export function removeRecent(trip: RecentTrip, store = true) {
  const recent = getRecent();
  const index = recent.findIndex(
    entry =>
      entry.stationFrom === trip.stationFrom &&
      entry.stationTo === trip.stationTo,
  );
  if (index >= 0) {
    recent.splice(index, 1);
    if (store) {
      localStorage.setItem(recentKey, JSON.stringify(recent));
    }
  }
  return recent;
}
