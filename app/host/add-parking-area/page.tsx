import AddParkingAreaForm from "@/components/forms/add-parking-area-form";
import AddParkingAreaFormV2 from "@/components/forms/add-parking-area-form-v2";
import PageInfo from "@/components/host/page-info";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllStates } from "@/lib/dal/location";

export default async function AddParkingAreaPage() {
  // const states = await getAllStates();
  return (
    <>
      <PageInfo
        title="Add Parking Spot"
        subtitle="List a new parking location"
      />
      <section className="p-8">
        {/* <Card>
          <CardHeader>Add Parking Area</CardHeader>
          <CardContent>
            <AddParkingAreaForm states={states} />
          </CardContent>
        </Card> */}
        <AddParkingAreaFormV2 />
      </section>
    </>
  );
}
