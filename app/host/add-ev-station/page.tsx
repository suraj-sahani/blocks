import AddEVStationForm from "@/components/forms/add-ev-station-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllStates } from "@/lib/dal/location";

export default async function AddEVStationPage() {
  const states = await getAllStates();
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <Card>
        <CardHeader>Add EV Station</CardHeader>
        <CardContent>
          <AddEVStationForm states={states} />
        </CardContent>
      </Card>
    </section>
  );
}
