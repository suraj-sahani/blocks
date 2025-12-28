import PageInfo from "@/components/host/page-info";
import ListingFilter from "./_components/listing-filter";
import Listing from "./_components/listing";

export default async function ListingPage() {
  return (
    <>
      <PageInfo
        title="My Listings"
        subtitle="Manage your parking spots and EV stations"
      />
      <section className="p-8">
        <ListingFilter />
        <Listing />
      </section>
    </>
  );
}
