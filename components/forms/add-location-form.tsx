"use client";
import ImageUpload from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import { SearchBox } from "@mapbox/search-js-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  EVChargingShcema,
  LocationDV,
  LocationSchema,
  ParkingAreaSchema,
} from "@/lib/form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { z } from "zod/v4";
import Spinner from "../spinner";
import { Button } from "../ui/button";

type EVSchemaErrors = FieldErrors<z.infer<typeof EVChargingShcema>>;
type ParkingSchemaErrors = FieldErrors<z.infer<typeof ParkingAreaSchema>>;

const AddlocationForm = () => {
  const [locationImages, setLocationImages] = React.useState<File[]>([]);
  const [disable, setDisable] = React.useState(false);
  const {
    handleSubmit,
    register,
    control,
    // getValues,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof LocationSchema>>({
    reValidateMode: "onChange",
    resolver: zodResolver(LocationSchema),
    defaultValues: LocationDV,
  });
  const type = watch("locationType");
  const ref = useRef<HTMLInputElement>(null);

  // const addressError = Object.keys(errors).map((key) =>
  //   [
  //     "address_line_1",
  //     "address_line_2",
  //     "city",
  //     "state",
  //     "latitude",
  //     "longitude",
  //   ].includes(key)
  //     ? errors[key as keyof typeof errors]?.message
  //     : ""
  // );

  // console.log(getValues());

  const onSubmit = (data: z.infer<typeof LocationSchema>) => {
    setDisable(true);
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center lg:mt-24">
      <form
        className="space-y-2 flex flex-col w-sm max-w-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-1">
          <Select {...register("locationType")} defaultValue={"parking"}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Location Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ev">EV Charging Station</SelectItem>
              <SelectItem value="parking">Parking Area</SelectItem>
            </SelectContent>
          </Select>
          {errors.locationType && (
            <p className="text-red-500 text-xs font-medium">
              {errors.locationType.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Input placeholder="Location Name" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-xs font-medium">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Textarea placeholder="Description" {...register("description")} />
          {errors.description && (
            <p className="text-red-500 text-xs font-medium">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* @ts-expect-error Server Component */}
        <SearchBox
          accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          browserAutofillEnabled
          options={{
            country: "us",
          }}
          ref={ref}
          onRetrieve={({ features, attribution, type, url }) =>
            console.dir({ features, attribution, type, url }, { depth: null })
          }
        >
          <Input autoComplete="address-line-1" placeholder="Search Address" />
        </SearchBox>

        <div className="space-y-1">
          <Input placeholder="Address" {...register("address_line_1")} />
          {errors.address_line_1 && (
            <p className="text-red-500 text-xs font-medium">
              {errors.address_line_1.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Input
            placeholder="Total Slots"
            {...register("total_slots", { valueAsNumber: true })}
          />
          {errors.total_slots && (
            <p className="text-red-500 text-xs font-medium">
              {errors.total_slots.message}
            </p>
          )}
        </div>

        {type === "parking" && (
          <Controller
            name="parking_area_images"
            control={control}
            render={({ field }) => (
              <div className="space-y-1">
                <ImageUpload
                  multiple={true}
                  uploadedImages={locationImages}
                  setUploadedImages={setLocationImages}
                  onChange={(e) => field.onChange(e)}
                />
                {(errors as ParkingSchemaErrors).parking_area_images && (
                  <p className="text-red-500 text-xs font-medium">
                    {
                      (errors as ParkingSchemaErrors).parking_area_images
                        ?.message
                    }
                  </p>
                )}
              </div>
            )}
          />
        )}

        {type === "ev" && (
          <Controller
            name="ev_charging_images"
            control={control}
            render={({ field }) => (
              <div className="space-y-1">
                <ImageUpload
                  multiple={true}
                  uploadedImages={locationImages}
                  setUploadedImages={setLocationImages}
                  onChange={(e) => field.onChange(e)}
                />
                {(errors as EVSchemaErrors).ev_charging_images && (
                  <p className="text-red-500 text-xs font-medium">
                    {(errors as EVSchemaErrors).ev_charging_images?.message}
                  </p>
                )}
              </div>
            )}
          />
        )}

        <Button
          type="submit"
          className="h-10 rounded-xl mt-2 justify-self-end"
          disabled={disable}
        >
          {disable && <Spinner />}
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddlocationForm;
