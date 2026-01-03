import AddEVStationForm from "@/components/forms/add-ev-station-form";

import PageInfo from "@/components/host/page-info";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllAmenities, getAllStates } from "@/lib/dal/location";

export default async function AddEVStationPage() {
  const states = await getAllStates();
  const amenities = await getAllAmenities();

  return (
    <>
      <PageInfo
        title="Add EV Station"
        subtitle="List a new EV charging station"
      />
      <section className="p-8">
        <AddEVStationForm states={states} amenities={amenities} />
      </section>
    </>
  );
}
