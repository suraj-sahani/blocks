import AddEVStationForm from "@/components/forms/add-ev-station-form";
import AddEvStationFormV2 from "@/components/forms/add-ev-station-form-v2";
import PageInfo from "@/components/host/page-info";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllStates } from "@/lib/dal/location";

export default async function AddEVStationPage() {
  const states = await getAllStates();
  return (
    <>
      <PageInfo
        title="Add EV Station"
        subtitle="List a new EV charging station"
      />
      <section className="p-8">
        <AddEvStationFormV2 states={states} />
      </section>
    </>
  );
}
