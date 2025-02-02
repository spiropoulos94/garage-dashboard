export interface BookingFiltersResponse {
  filters: BookingFilterItem[];
}

export interface BookingFilterItem {
  type: string;
  options: BookingFilterOption[];
}

export interface BookingFilterOption {
  value: string;
  label: string;
  searchData: string | null;
}
