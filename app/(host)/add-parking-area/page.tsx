import AddParkingAreaForm from "@/components/forms/add-parking-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AddParkingAreaPage() {
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <Card className="min-w-sm">
        <CardHeader>
          Add Parking Area
        </CardHeader>
        <CardContent>
          <AddParkingAreaForm />
        </CardContent>
      </Card>
    </section>)
}
