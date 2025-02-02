import { DictionaryRoot } from "@/app/(pages)/[lang]/dictionaries/dictionaries";
import { getBookings } from "@/app/actions/bookings";
import GeneralError from "@/app/components/common/GeneralError";
import BookingsList from "@/app/containers/bookings/BookingsList";
import NoBookings from "@/app/containers/bookings/NoBookings";
import BookingsViewInternalNav from "@/app/containers/bookings/nav/BookingsViewInternalNav";
import { isErrorResponse } from "@/app/helpers/authHelpers";

interface BookingsSearchParams {
  page: number;
  withoutVin?: string;
  packageNotReceived?: string;
  garages?: string[];
}
interface BookingsViewProps {
  dictionary: DictionaryRoot;
  preset?: string;
  searchParams?: BookingsSearchParams;
}

const BookingsView = async ({ dictionary, preset, searchParams }: BookingsViewProps) => {
  const params: Record<string, string | number | string[]> = { ...searchParams };

  if (preset) {
    params.preset = preset;
  }

  const response = await getBookings(params);

  if (isErrorResponse(response)) {
    return <GeneralError error={response} />;
  }

  const { data: bookings, last_page, current_page } = response;

  // TODO: temporary solution until the in moderation filtering happens on the backend. TO BE REVERTED
  let FILTERED_BOOKINGS = bookings.filter((booking) => booking.status !== "in moderation");

  return (
    <div className="BookingsView">
      <BookingsViewInternalNav
        page={Number(searchParams?.page || 1)}
        last_page={last_page}
        current_page={current_page}
      />
      {FILTERED_BOOKINGS.length ? (
        <BookingsList dictionary={dictionary} bookings={FILTERED_BOOKINGS} />
      ) : (
        <NoBookings />
      )}
    </div>
  );
};

export default BookingsView;
