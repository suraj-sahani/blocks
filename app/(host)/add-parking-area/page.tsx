import AddParkingAreaForm from "@/components/forms/add-parking-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllStates } from "@/lib/dal/location";

export default async function AddParkingAreaPage() {
  const states = await getAllStates();
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <Card>
        <CardHeader>Add Parking Area</CardHeader>
        <CardContent>
          <AddParkingAreaForm states={states} />
        </CardContent>
      </Card>
    </section>
  );
}
