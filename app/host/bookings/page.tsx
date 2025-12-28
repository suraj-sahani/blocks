import PageInfo from "@/components/host/page-info";
import BookingFilters from "./_components/booking-filters";
import BookingList from "./_components/booking-list";

const HostBookings = () => {
  return (
    <>
      <PageInfo title="Bookings" subtitle="Manage all your reservations" />
      <section className="p-8">
        <BookingFilters />
        <BookingList />
      </section>
    </>
  );
};

export default HostBookings;
