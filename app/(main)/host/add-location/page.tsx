import BackButton from "@/components/back-button";
import AddlocationForm from "@/components/forms/add-location-form";

export default async function AddLocationPage() {
  return (
    <section className="container space-y-4 h-full">
      <BackButton title="Add Location" />
      <AddlocationForm />
    </section>
  );
}
