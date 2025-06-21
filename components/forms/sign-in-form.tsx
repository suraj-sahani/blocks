"use client";
import React, { useState } from "react";
import { Card } from "../ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/form.schema";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import Spinner from "../spinner";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import RoleSelector from "../role-selector";
import { Role } from "@/lib/enum";

const SignInForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [disable, setDisable] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setDisable(true);
    try {
      const { email, password, role } = data;
      const res = await fetch("api/sign-in", {
        body: JSON.stringify({ email, password, role }),
        method: "POST",
      });
      const details = await res.json();
      if (!details.success) {
        throw new Error(details?.message);
      }
      toast.success("Signed In Successfully.");
      if (role === Role.USER) router.push("/user/dashboard");
      else router.push("/host/dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later."
      );
      console.error(error);
    }
    setDisable(false);
  };

  return (
    <Card className="p-2 min-w-sm">
      <h1 className="text-4xl font-bold underline">Sign in</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <Label className="mb-1.5" htmlFor="email">
            Email
          </Label>

          <Input
            placeholder="example@gmail.com"
            className="rounded-xl h-10"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs font-medium text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label className="mb-1.5" htmlFor="password">
            Password
          </Label>
          <div className="relative w-full max-w-lg flex items-center">
            <Input
              placeholder="de23@j_."
              className="rounded-xl h-10"
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 h-full px-3 py-2 text-muted-foreground hover:bg-transparent rounded-full cursor-pointer"
              onClick={(e) => {
                e?.preventDefault();
                setShowPassword((prev) => !prev);
              }}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs font-medium text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <RoleSelector onChange={(value) => setValue("role", value)} />
          {errors.role && (
            <p className="mt-1 text-xs font-medium text-red-500">
              {errors.role.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="h-10 rounded-xl mt-2"
          disabled={disable}
        >
          {disable && <Spinner />}
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default SignInForm;
