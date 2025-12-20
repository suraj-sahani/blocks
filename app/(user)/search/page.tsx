import { mockLocations } from "@/lib/constants";
import { type SearchParams } from "nuqs/server";
import BookingSearchBar from "./_components/booking-search-bar";
import { loadBookingSearchParams } from "./_components/booking-search-params";
import LocationList from "./_components/location-list";
import LocationMap from "./_components/location-map";

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { showMap, spotType, address } = await loadBookingSearchParams(
    searchParams
  );

  const filteredLocations = mockLocations.filter((loc) => {
    if (spotType === "all") return true;
    return loc.type === spotType;
  });

  return (
    <>
      <div className="pt-20 min-h-screen">
        {/* Search Bar */}
        <BookingSearchBar showMap={showMap} spotType={spotType} />
        {/* Results */}
        <div className="flex h-[calc(100vh-220px)]">
          {/* List View */}
          <LocationList locations={filteredLocations} showMap={showMap} />
          {/* Map View */}
          <LocationMap locations={filteredLocations} showMap={showMap} />
        </div>
      </div>
    </>
  );
}
