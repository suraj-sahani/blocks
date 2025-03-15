import SignupForm from "@/components/forms/sign-up-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Form from "next/form";

export default function RegisterPage() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <SignupForm />
    </div>
  );
}
