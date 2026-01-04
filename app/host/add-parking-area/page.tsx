import AddParkingAreaForm from "@/components/forms/add-parking-area-form";

import PageInfo from "@/components/host/page-info";
import { getAllAmenities, getAllStates } from "@/lib/dal/location";

export default async function AddParkingAreaPage() {
  const states = await getAllStates();
  const amenities = await getAllAmenities();
  return (
    <>
      <PageInfo
        title="Add Parking Spot"
        subtitle="List a new parking location"
      />
      <section className="p-8">
        <AddParkingAreaForm states={states} amenities={amenities} />
      </section>
    </>
  );
}
