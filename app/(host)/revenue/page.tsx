import PageInfo from "@/components/host/page-info";
import PaymentMethods from "./_components/payment-method";
import Withdraw from "./_components/withdraw";
import TransactionHistory from "./_components/transaction-history";

export default function RevenuePage() {
  return (
    <>
      <PageInfo
        title="Revenue"
        subtitle="Track your earnings and manage payouts"
      />
      <section className="p-8 space-y-6">
        <Withdraw />
        <TransactionHistory />
        <PaymentMethods />
      </section>
    </>
  );
}
