import Map from "@/components/map";
import Sidebar from "@/components/sidebar";

export default async function UserDashboardPage() {
  return (
    <section className="relative bg-slate-300 m-2 h-full rounded-xl overflow-hidden">
      <Sidebar />
      <Map />
    </section>
  );
}
