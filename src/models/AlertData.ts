export interface AlertData {
  route_id: string;
  route_name: string;
  current_message: string | null;
  advisory_id: string | null;
  advisory_message: string | null;
  detour_message: string | null;
  detour_id: string | null;
  detour_start_location: string | null;
  detour_start_date_time: string | null;
  detour_end_date_time: string | null;
  detour_reason: string | null;
  last_updated: string | null;
  isSnow: string;
}
