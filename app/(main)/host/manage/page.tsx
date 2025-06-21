import BackButton from "@/components/back-button";
import ManagementActions from "./_components/management-actions";
import LocationList from "./_components/location-list";

export default async function HostManagePage() {
  return (
    <section className="container my-4 px-2 space-y-2 h-full">
      <BackButton title="Parking areas and EV chargers Management" />

      <ManagementActions />

      <LocationList />
    </section>
  );
}
