"use client";
import { signUpDb } from "@/lib/action/user.action";
import { SIGN_UP_SCHEMA } from "@/lib/schema";
import { SignUpSchema } from "@/lib/types";
import { useForm, useStore } from "@tanstack/react-form";
import {
  ArrowRight,
  Building2,
  Car,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Activity, useState } from "react";
import { FieldInfo } from ".";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Spinner } from "../ui/spinner";

import clientLogger from "@/lib/pino/client";
import toast from "react-hot-toast";

const SignUpForm = () => {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") === "host" ? "host" : "user";
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    validators: {
      onChange: SIGN_UP_SCHEMA,
    },
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      agreeToTerms: false,
      signUpType: initialType,
    } as SignUpSchema,
    onSubmit: async ({ value }) => {
      const res = await signUpDb(value);
      if (!res.success) {
        toast.error(res.error);
      } else {
        toast.success(res.message);
      }
      clientLogger.info(res);
    },
  });

  const userType = useStore(form.store, (state) => state.values.signUpType);
  return (
    <>
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-teal-400 flex items-center justify-center shadow-lg">
                <Car className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                <Zap className="w-2.5 h-2.5 text-accent-foreground" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Park<span className="text-primary">Volt</span>
            </span>
          </Link>

          <h1 className="text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">
            Join thousands of users finding the best parking spots.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* User Type Toggle */}
            <form.Field
              name="signUpType"
              children={(field) => {
                return (
                  <div className="flex gap-3 mb-8 col-span-2">
                    <button
                      onClick={() => form.setFieldValue("signUpType", "user")}
                      className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                        userType === "user"
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                      type="button"
                    >
                      <User className="w-5 h-5" />
                      <span className="font-medium">User</span>
                    </button>
                    <button
                      onClick={() => form.setFieldValue("signUpType", "host")}
                      className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                        userType === "host"
                          ? "border-accent bg-accent/5 text-accent"
                          : "border-border text-muted-foreground hover:border-accent/50"
                      }`}
                      type="button"
                    >
                      <Building2 className="w-5 h-5" />
                      <span className="font-medium">Host</span>
                    </button>
                  </div>
                );
              }}
            />

            <form.Field
              name="fullName"
              children={(field) => (
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="firstName">Full Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John Doe"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="email"
              children={(field) => (
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-12"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="password"
              children={(field) => (
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-12 pr-12"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="agreeToTerms"
              children={(field) => (
                <div className="col-span-2">
                  <div className="flex items-start gap-3 col-span-2">
                    <Checkbox
                      id="terms"
                      checked={field.state.value}
                      onCheckedChange={(checked) =>
                        field.handleChange(!!checked)
                      }
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground leading-normal cursor-pointer"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Subscribe
              selector={({ canSubmit, isSubmitting }) => [
                canSubmit,
                isSubmitting,
              ]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  variant={userType === "host" ? "accent" : "hero"}
                  size="lg"
                  className="w-full col-span-2"
                  disabled={!canSubmit || isSubmitting}
                >
                  <Activity mode={isSubmitting ? "visible" : "hidden"}>
                    <Spinner />
                  </Activity>
                  <Activity mode={!isSubmitting ? "visible" : "hidden"}>
                    Create Account
                  </Activity>

                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            />
          </form>

          <p className="text-center text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
      {/* Right Panel - Visual */}
      <SignUpIllustration userType={userType} />
    </>
  );
};

const SignUpIllustration = ({ userType }: { userType: "user" | "host" }) => {
  return (
    <div className="hidden lg:flex flex-1 items-center justify-center bg-linear-to-br from-primary to-teal-600 p-12 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-black/10 rounded-full blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 text-center max-w-lg"
      >
        <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
          {userType === "host" ? (
            <Building2 className="w-16 h-16 text-white" />
          ) : (
            <Car className="w-16 h-16 text-white" />
          )}
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          {userType === "host"
            ? "Start Earning Today"
            : "Find Your Perfect Spot"}
        </h2>
        <p className="text-white/80 text-lg">
          {userType === "host"
            ? "Turn your unused parking space or EV charger into a passive income stream."
            : "Join over a million users who trust ParkVolt for their parking and charging needs."}
        </p>
      </motion.div>
    </div>
  );
};

export default SignUpForm;
