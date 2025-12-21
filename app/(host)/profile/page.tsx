import PageInfo from "@/components/host/page-info";
import ProfileInfo from "./_components/profile-info";
import ProfileExtras from "./_components/profile-extras";

export default function HostProfilePage() {
  return (
    <>
      <PageInfo title="Profile" subtitle="Manage your account settings" />
      <section className="p-8 space-y-6">
        <ProfileInfo />
        <ProfileExtras />
      </section>
    </>
  );
}
