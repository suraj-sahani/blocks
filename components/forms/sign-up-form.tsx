"use client";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpDV, signUpSchema } from "@/lib/form.schema";
import { z } from "zod";
import { Label } from "../ui/label";
import Image from "next/image";
import ImageUpload from "../image-upload";
import { Checkbox } from "../ui/checkbox";
import toast from "react-hot-toast";
import Spinner from "../spinner";
import { useRouter } from "next/navigation";
import { UploadResponse } from "@imagekit/next";
import { handleUpload } from "@/lib/imagekit";

const SignupForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<File[]>([]);
  const {
    formState: { errors },
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpDV,
    mode: "onSubmit",
  });
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setSubmitting(true);
    try {
      let usersProfileImage;

      // Upload the users profile image to imagekit if the user has uploaded
      // an image and get the url
      if (profileImage.length) {
        usersProfileImage = await handleUpload(profileImage);
      }

      const user = await fetch("/api/sign-up", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          imageUrl: usersProfileImage?.url,
        }),
      });

      const details = await user.json();

      if (!details.success) {
        throw new Error(details?.message);
      }
      toast.success("User Created Successfully.");
      router.push("/");
    } catch (error: any) {
      toast.error(error?.message);
    }
    setSubmitting(false);
  };

  return (
    <Card className="p-2 w-full max-w-4xl mx-2 rounded-3xl shadow-xs">
      <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <h1 className="font-bold text-4xl underline">Sign Up</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <Label className="mb-1.5" htmlFor="first_name">
                  First Name
                </Label>
                <Input
                  placeholder="John"
                  className="rounded-xl h-10"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-1.5" htmlFor="first_name">
                  Last Name
                </Label>
                <Input
                  placeholder="Doe"
                  className="rounded-xl h-10"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

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
                  onClick={() => setShowPassword((prev) => !prev)}
                  type="button"
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

            <ImageUpload
              uploadedImages={profileImage}
              setUploadedImages={setProfileImage}
            />

            <div className="flex flex-row items-start space-x-2 rounded-xl border-2 py-4 px-2 border-slate-100">
              <Checkbox
                onCheckedChange={(checked: boolean) =>
                  setValue("terms_conditions", checked)
                }
              />

              <div className="space-y-1 leading-none">
                <p className="font-semibold text-sm">
                  Accept Terms & Conditions.
                </p>
                <p className="text-xs font-medium">
                  By agreeing, you accept to receive email and SMS
                  notifications.
                </p>
              </div>
            </div>

            <Button
              type="submit"
              className="h-10 rounded-xl"
              disabled={submitting}
            >
              {submitting && <Spinner />}
              Submit
            </Button>
          </form>
        </div>

        <div className="relative hidden md:flex flex-col justify-between p-2">
          <p className="z-10 text-4xl text-white font-bold">
            <span>Bl</span>
            <span className="text-blue-600">o</span>
            <span>cks</span>
          </p>
          <p className="z-10 text-sm text-white font-bold text-right">
            Revolutionizing urban parking with smart solutions. Find, book, and
            manage parking spots instantly across the city with our seamless
            digital platform.
          </p>
          <Image
            src={"/sign-up.jpg"}
            alt="sign-up"
            fill
            className="object-cover rounded-2xl"
            priority
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
